import * as PIXI from 'pixi.js';
import { HSmile } from "../HSmileMain";
import Vector from "../Math/Vector";
import ImageJsonParser from './parser/ImageJsonParser';
import ResourceImageJsonParser from './parser/JsonParser';
import ResourceParser from './parser/ResourceParser';
import Task, { LoopTask } from './Task';

const DEFAULT_DELAY_RESOURCE_NUM = 1000; // 1 sec.

class PipeLine<CallBackType extends Function = () => void> {

    callbacks: CallBackType[];

    constructor() {
        this.callbacks = [];
    }

    add(callBack: CallBackType) {
        this.callbacks.push(callBack);
    }

    /**
     * turn in all the functions. Call all of them in the pipeline
     */
    call(...params: any): void {
        for(let i = 0; i < this.callbacks.length; ++i)
            this.callbacks[i](params);
    }
}

enum SCALE_MODES {
    LINEAR,
    NEAREST
}

type ResourceSetting = {
    SCALE_MODE?: SCALE_MODES,
    baseUrl?: string
};

// current percentage. like 1%, 2%, 40% (habbo is loading etc)
type ProgressCallBackFunction   = (e: number) => void;
type CompleteCallBackFunction   = (e: any) => void;
type ErrorCallBackFunction      = (e: any) => void;

type ImagesLoaderFunction = (e: any) => void;

interface IResource<MimeRes> {
    name: string;
    path: string;
    ready: boolean;
    resource?: MimeRes;
}

/**
 * primary purpose of it is to make sure all the resources 
 * into the server have been loaded.
 */
class ResourceTask extends LoopTask {
    constructor(delay: number = DEFAULT_DELAY_RESOURCE_NUM) {
        super(delay);
    }
}

export class Resource<MimeRes> {
    name: string;
    path: string;
    resource?: MimeRes;
    ready: boolean = false;

    constructor(name: string, path: string) {
        this.name = name;
        this.path = path;
    }
}

export class Offset {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Frame {

    name: string;
    x: number;
    y: number;
    w: number;
    h: number;

    offset: Offset;

    constructor(name: string, x: number, y: number, w: number, h: number, offset: Offset) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.offset = offset;
    }
}


export class ImageResource<MimeRes> implements IResource<MimeRes> {
    name: string;
    path: string;
    resource?: MimeRes;
    ready: boolean = false;

    frames?: Frame[];
    
    constructor(name: string, path: string) {
        this.name = name;
        this.path = path;
    }
}

export default class ResourceManager<HolderResourceType, ResourceType = ImageResource<HolderResourceType>> {
    
    settings: ResourceSetting;

    onProgress: PipeLine<ProgressCallBackFunction>;
    onComplete: PipeLine<CompleteCallBackFunction>;
    onError: PipeLine<ErrorCallBackFunction>;

    // raw images only.
    resourcesArray: IResource<HolderResourceType>[];
    // not implemented yet. For audio resources
    // like credit sounds, alerts, chrome notification for staff
    // ticket alert, and so forth...

    resourceLoaded: number = 0;

    resourceParser?: ResourceParser<HolderResourceType>; // default

    task: ResourceTask;


    

    constructor() {
        this.settings = {};

        this.onProgress = new PipeLine<ProgressCallBackFunction>();
        this.onComplete = new PipeLine<CompleteCallBackFunction>();
        this.onError = new PipeLine<ErrorCallBackFunction>();
        // this.resourceParser = new ImageJsonParser(this);
        this.resourcesArray = [];

        // this.onProgress.add( this.onProgressInternalEvent.bind(this) );


        this.task = new ResourceTask();
        this.task.runnable = this.resourceTask.bind(this);

        this.task.start();
    }


    resourceTask(): void {
        
        console.log(`resource task: ${this.resourceLoaded}`);

        for ( let i = 0; i < this.resourcesArray.length; ++i ) {
            const resource = this.resourcesArray[i];
   
            
            if ( resource.resource ) {
                this.resourceLoaded++;
            }
        }

        if ( this.resourceLoaded === this.resourcesArray.length )
            this.task.destroy();

    }
    
    preload(): void {

        this.settings.SCALE_MODE = SCALE_MODES.NEAREST;
        this.settings.baseUrl = 'assets';

        this.add('room_tiles', 'room-basic/tiles/sprites.json');
        this.add('hs_human_body', 'avatar/hs_human_body.json');
    

        for ( let i = 0; i < 100; ++i ) {
            this.add('hs_human_body_' + i, 'avatar/hs_human_body.json?id=' + i);   
        }

        this.load();
    }

    add( key: string, path: string ): void {
        this.resourcesArray.push(new Resource(key, path));
    }

    get( key: string ): IResource<HolderResourceType> | null {
        for ( let i = 0; i < this.resourcesArray.length; ++i ) {
            const res = this.resourcesArray[i];
            if ( res.name === key )
                return res;
        }

        return null;
    }

    remove(key: string): void {
        const index = -1;

        const rp = this.resourcesArray.filter(e => e.name === key)[0];
        if ( !rp )
            return;
        this.resourcesArray.splice(this.resourcesArray.indexOf(rp), 1);
    }

    /**
     * 
     * @param str target to compare
     * @param pattern elements compared
     * @param index_pos index_pos
     */
    private has_c(str: string | undefined, pattern: string, index_pos: number): boolean {
        return (str && (index_pos >= 0 && index_pos < str.length) ? (str[index_pos] === pattern) : false);
    }

    /**
     * @return base url plus a slash at the end. Example: 'base_url/'
     */
    baseUrl(): string {
        return this.settings.baseUrl + ((this.has_c(this.settings.baseUrl, '/', !this.settings.baseUrl ? 0 : this.settings.baseUrl.length - 1)) ? '' : '/');
    }

    
    // async method to load images
    load(): void {

        if ( !this.resourceParser )
            throw new TypeError('Resource Parser has not been defined.');

        if ( this.resourceLoaded === this.resourcesArray.length )
            return; //  resources already loaded.

        const resToLoad = this.resourcesArray.length;
        for ( let i = 0; i < resToLoad; ++i ) {
            const res = this.resourcesArray[i];

            if ( res.resource )
                continue; // reasource already in memory.

            fetch(this.baseUrl() + res.path).then(e => {
                if ( !this.resourceParser )
                    return;
                // once the resource really has been parsed, increase the counter.
                this.resourceParser.parse(e, res).then(res => {
                    this.onProgress.call(Math.floor((this.resourceLoaded / this.resourcesArray.length)*100));
                }).catch(err => {
                    this.onError.call(err);
                });
            }).catch(err => {
                this.onError.call(err);
            });
        }
    }
}
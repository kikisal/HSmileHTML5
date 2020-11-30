import * as PIXI from 'pixi.js';
import { HSmile } from "../HSmileMain";
import Vector from "../Math/Vector";
import ImageJsonParser from './parser/ImageJsonParser';
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
    task: ResourceParser<MimeRes>;
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
    task: ResourceParser<MimeRes>;

    constructor(name: string, path: string, task: ResourceParser<MimeRes>) {
        this.name = name;
        this.path = path;
        this.task = task;
    }
}

export class Offset {
    x: number;
    y: number;
    flip: Vector;

    constructor(x: number = 0, y: number = 0, flip: Vector = new Vector()) {
        this.x = x;
        this.y = y;
        this.flip = flip;
    }
}

export class Frame {

    name: string;
    x: number;
    y: number;
    w: number;
    h: number;

    offset: Offset;
    
    texture?: PIXI.Texture;

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
    task: ResourceParser<MimeRes>;

    frames?: Frame[];


    constructor(name: string, path: string, task: ResourceParser<MimeRes>) {
        this.name = name;
        this.path = path;
        this.task = task;
    }

    getFrame(frameName: string): Frame | null {
        for ( let i = 0; i < this.frames!.length; ++i ) {
            if( this.frames![i].name === frameName ) {
                return this.frames![i];
            }
        }

        return null;
    }

    build(baseTexture: PIXI.BaseTexture): void {
        for ( let i = 0; i < this.frames!.length; ++i ) {
            const frame = this.frames![i];
            frame.texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(frame.x, frame.y, frame.w, frame.h));
        }
    }

    getTexture( frameName: string ): PIXI.Texture {
        return this.getFrame(frameName)?.texture!;
    }
}

export default class ResourceManagerImage<HolderResourceType, ResourceType = ImageResource<HTMLImageElement>> {
    
    settings: ResourceSetting;

    onProgress: PipeLine<ProgressCallBackFunction>;
    onComplete: PipeLine<CompleteCallBackFunction>;
    onError: PipeLine<ErrorCallBackFunction>;

    // raw images only.
    resourcesArray: ImageResource<HolderResourceType>[];
    // not implemented yet. For audio resources
    // like credit sounds, alerts, chrome notification for staff
    // ticket alert, and so forth...

    resourceLoaded: number = 0;

    resourceParser?: ImageJsonParser<HolderResourceType>;

    completed: boolean = false;


    constructor(resParser: ImageJsonParser<HolderResourceType>) {
        this.settings = {};

        this.onProgress = new PipeLine<ProgressCallBackFunction>();
        this.onComplete = new PipeLine<CompleteCallBackFunction>();
        this.onError = new PipeLine<ErrorCallBackFunction>();

        this.resourcesArray = [];

        this.resourceParser = resParser;
        this.resourceParser.rm_instance = this;

        this.onProgress.add( this.onProgressInternalEvent.bind(this) );
    }

    onProgressInternalEvent(): void {

        if ( this.completed )
            return;

        if ( this.getProgress() === 100 ) {
            this.completed = true;
            this.onComplete.call();
        }
    }

    getProgress(): number {
        return Math.floor(100 * (this.getResourceLoaded() / this.resourcesArray.length));
    }

    getResourceLoaded(): number {
        let resLoaded = 0;
        for ( let i = 0; i < this.resourcesArray.length; ++i ) {
            const res = this.resourcesArray[i];
            if ( res.resource )
                resLoaded++;
        }

        return resLoaded;
    }
    
    preload(): void {

        this.settings.SCALE_MODE = SCALE_MODES.NEAREST;
        this.settings.baseUrl = 'assets';


        this.add('room_tiles', 'room-basic/tiles/sprites.json');
        this.add('hs_human_body', 'avatar/hs_human_body.json');
    

        this.load();
    }


    add( key: string, path: string ): void {


        if ( !this.resourceParser )
            return;

        this.resourcesArray.push(new ImageResource(key, path, this.resourceParser.clone()));
    }

    get( key: string ): ImageResource<HolderResourceType> | null {
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

        this.completed = false;

        const resToLoad = this.resourcesArray.length;
        for ( let i = 0; i < resToLoad; ++i ) {
            const res = this.resourcesArray[i];

            if ( res.resource )
                continue; // reasource already in memory.

            res.task.parse(res);
        }
    }
}
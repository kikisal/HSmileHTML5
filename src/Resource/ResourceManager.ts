import * as PIXI from 'pixi.js';
import { HSmile } from "../HSmileMain";
import Vector from "../Math/Vector";
import ImageJsonParser from './parser/ImageJsonParser';
import ResourceImageJsonParser from './parser/JsonParser';
import ResourceParser from './parser/ResourceParser';

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
    resource?: MimeRes;
}

export class Resource<MimeRes> {
    name: string;
    path: string;
    resource?: MimeRes;

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

    frames?: Frame;
    
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
    imagesRes: IResource<HolderResourceType>[];
    // not implemented yet. For audio resources
    // like credit sounds, alerts, chrome notification for staff
    // ticket alert, and so forth...

    resourceLoaded: number = 0;

    resourceParser?: ResourceParser<HolderResourceType>; // default


    

    constructor() {
        this.settings = {};

        this.onProgress = new PipeLine<ProgressCallBackFunction>();
        this.onComplete = new PipeLine<CompleteCallBackFunction>();
        this.onError = new PipeLine<ErrorCallBackFunction>();
        // this.resourceParser = new ImageJsonParser(this);
        this.imagesRes = [];

    }

 

    preload(): void {

        this.settings.SCALE_MODE = SCALE_MODES.NEAREST;
        this.settings.baseUrl = 'assets';

        this.add('room_tiles', 'room-basic/tiles/sprites.json');
        this.add('hs_human_body', 'avatar/hs_human_body.json');

        this.load();
    }

    add( key: string, path: string ): void {
        this.imagesRes.push(new Resource(key, path));
    }

    remove(key: string): void {
        const index = -1;

        const rp = this.imagesRes.filter(e => e.name === key)[0];
        if ( !rp )
            return;
        this.imagesRes.splice(this.imagesRes.indexOf(rp), 1);
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

        if ( this.resourceLoaded === this.imagesRes.length )
            return; //  resource already loaded.

        const resToLoad = this.imagesRes.length;
        for ( let i = 0; i < resToLoad; ++i ) {
            const res = this.imagesRes[i];

            fetch(this.baseUrl() + res.path).then(e => {
                if ( !this.resourceParser )
                    return;
                // once the resource really has been parsed, increase the counter.
                this.resourceParser.parse(e, res).then(res => {
                    this.onProgress.call(res);
                }).catch(err => {
                    this.onError.call(err);
                });
            }).catch(err => {
                this.onError.call(err);
            });
        }
    }
}
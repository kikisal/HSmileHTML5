import ResourceManager, { ImageResource, Offset, Resource } from "../ResourceManager";
import { LoopTask } from "../Task";
import {Frame} from './../ResourceManager';
import ResourceParser from "./ResourceParser";

export default class ImageJsonParser<HolderResType> extends ResourceParser<HolderResType> {

    json_res: any   = null;
    image_res: any  = null;


    constructor() {
        super();

        this.loopTask = new LoopTask(10);
        this.loopTask.runnable = this.run.bind(this);
    }

    start(): void {
        if ( this.loopTask )
            this.loopTask.start();
    }

    run(): void {

        if ( !this.rm_instance )
            return;

        if ( this.json_res && this.image_res ) {
            this.rm_instance.onProgress.call(this.rm_instance.getProgress());
            if ( this.loopTask )
                this.loopTask.destroy();
        } 
    }
    
    clone(): ImageJsonParser<HolderResType> {
        if ( !this.rm_instance )
            return this;    

        const temp = new ImageJsonParser();
        temp.rm_instance = this.rm_instance;
 
        return temp;
    }

    private parseImage(res: ImageResource<HTMLImageElement>): void {


        if ( !this.rm_instance )
            return;

        const imageName = this.json_res.meta.image;
        const frames = this.json_res.frames;
        const resPath = this.rm_instance.baseUrl() + res.path.substr(0, res.path.lastIndexOf('/') + 1) + imageName;
        
        let image = new Image();
        image.src = resPath;

        let framesObj: Frame[] = [];

        
        for ( let frame in frames ) {
            const frm = frames[frame].frame;
            framesObj.push(new Frame(frame, 
                frm.x, 
                frm.y,
                frm.w, 
                frm.h,
                // tonino addons 
                new Offset(frames[frame].offset.x, frames[frame].offset.y)
            ));
        }
        
        
        let resPacket = <ImageResource<HTMLImageElement> | null>this.rm_instance.get(res.name);

        

        if ( !resPacket )
            return;


        resPacket.frames = framesObj;
        // resPacket.texture = new PIXI.Texture();

        // load just one image.
        image.addEventListener('load', img => {
            if ( !img )
                return null;
                

            if ( !resPacket )
                return null;


            this.image_res = <HTMLImageElement>img.target;
            resPacket.resource = <HTMLImageElement>img.target;

        });

        image.addEventListener('error', err => {
            if ( !this.rm_instance )
                return;

            this.rm_instance.onError.call(err);
        });
    }

    parse(res: Resource<HolderResType>): void {

        if ( !this.rm_instance )
            return;

        
        this.start();


        fetch(this.rm_instance.baseUrl() + res.path).then(e => {
            e.json().then(e => {
                this.json_res = e;
                this.parseImage(<ImageResource<HTMLImageElement>><unknown>(res));
            }).catch(err => {
                if ( !this.rm_instance )
                    return;

                this.rm_instance.onError.call(err);
            });
        }).catch(err => {
            if ( !this.rm_instance )
                return;

            this.rm_instance.onError.call(err);
        });
        
    }
}
import ResourceManager, { Offset, Resource } from "../ResourceManager";
import JsonParser from "./JsonParser";
import {Frame} from './../ResourceManager';

export default class ImageJsonParser<HolderResType> extends JsonParser<HolderResType> {


    rm_instance: ResourceManager<HolderResType>;

    constructor(rm_instance: ResourceManager<HolderResType>) {
        super();

        this.rm_instance = rm_instance;

    }

    parse(body: Body, res: Resource<HolderResType>): Promise<any> {
        return super.parse(body, res).then(e => {
            const imageName = e.meta.image;
            const frames = e.frames;
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


            // load just one image.
            image.addEventListener('load', img => {
                
            });
        });
    }
}
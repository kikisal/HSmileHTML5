import ResourceManagerImage, { Resource } from "../ResourceManagerImage";
import { LoopTask } from "../Task";

export interface IResourceParser<HolderResourceType> {
    parse(res: Resource<HolderResourceType>): void;
    start(): void;
}

export default class ResourceParser<HolderResourceType> implements IResourceParser<HolderResourceType> {
    
    
    rm_instance?: ResourceManagerImage<HolderResourceType>;    
    loopTask?: LoopTask;

    

    clone(): ResourceParser<HolderResourceType> {
        if ( !this.rm_instance )
            return this;    

        const temp = new ResourceParser();
        temp.rm_instance = this.rm_instance;
        temp.loopTask = this.loopTask;
        return temp;
    }

    parse(res: Resource<HolderResourceType>): void {
        throw new Error('Not implemented.');
    }

    start(): void {
        throw new Error('Not implemented.');   
    }
}

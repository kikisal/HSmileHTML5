import ResourceManager, { Resource } from "../ResourceManager";
import { LoopTask } from "../Task";

export interface IResourceParser<HolderResourceType> {
    parse(res: Resource<HolderResourceType>): void;
    start(): void;
}

export default class ResourceParser<HolderResourceType> implements IResourceParser<HolderResourceType> {
    
    
    rm_instance?: ResourceManager<HolderResourceType>;    
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

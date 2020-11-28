import { Resource } from "../ResourceManager";

export default interface ResourceParser<HolderResourceType> {
    parse(body: Body, res: Resource<HolderResourceType>): Promise<any>;
}

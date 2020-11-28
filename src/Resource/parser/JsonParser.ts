import { Resource } from "../ResourceManager";
import ResourceParser from "./ResourceParser";


export default class JsonParser<HolderResourceType> implements ResourceParser<HolderResourceType> {
    constructor() {

    }

    parse(body: Body, res: Resource<HolderResourceType>): Promise<any> {
        // parsify resource.
        return body.json();
    }
}
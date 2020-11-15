import Vector from "../Math/Vector";

export default class ResourceManager {
    
    constructor() {

    }

    loadOffsets(arrayRef: {[key: string]: Vector}, url: string): void {
        arrayRef['demo'] = new Vector();
    }

}
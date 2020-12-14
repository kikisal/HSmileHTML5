import IComponent from "./IComponent";

export default class ComponentHandler {

    components: IComponent[] = [];

    constructor() {
        
    }

    add(component: IComponent): void {
        this.components.push(component);
    }

    gameLoop(): void {
        
    }
}
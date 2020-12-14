import IUpdateReceiver from "./IUpdateReceiver";
import IComponent from "./IComponent";
import IContext from "./IContext";

export default class Component implements IComponent {
    context: IContext;

    constructor(context: IContext) {
        this.context = context;
    }

    addUpdateReceiver(ur: IUpdateReceiver): void {
        this.context.addUpdateReceiver(ur);
    }

    removeUpdateReceiver(ur: IUpdateReceiver): void {
        this.context.removeUpdateReceiver(ur);
    }
}
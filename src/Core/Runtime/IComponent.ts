import IContext from "./IContext";
import IUpdateReceiver from "./IUpdateReceiver";

export default interface IComponent {
    context: IContext;

    addUpdateReceiver(ur: IUpdateReceiver): void;
    removeUpdateReceiver(ur: IUpdateReceiver): void;
}
import * as PIXI from 'pixi.js';
import IContext from "./Core/Runtime/IContext";
import IUpdateReceiver from "./Core/Runtime/IUpdateReceiver";

export default class GameContext implements IContext {
    container: PIXI.Container;

    private updateReceivers: IUpdateReceiver[] = [];

    constructor(container: PIXI.Container) {
        this.container = container;
        // initializa game context type loop and all of that stuff...
        // choose which algorithm to use that best fit your needs...
    }

    addUpdateReceiver(ur: IUpdateReceiver): void {
        this.updateReceivers.push(ur);
    }

    removeUpdateReceiver(ur: IUpdateReceiver): void {
        this.updateReceivers.splice(this.updateReceivers.indexOf(ur), 1);
    }

    gameLoop(): void {
        for ( let i = 0; i < this.updateReceivers.length; ++i ) {
            this.updateReceivers[i].update(0);
        }
    }
}
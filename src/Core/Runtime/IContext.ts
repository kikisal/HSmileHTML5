import * as PIXI from 'pixi.js';
import IUpdateReceiver from "./IUpdateReceiver";

export default interface IContext {
    container: PIXI.Container;

    addUpdateReceiver(ur: IUpdateReceiver): void;
    removeUpdateReceiver(ur: IUpdateReceiver): void;
}
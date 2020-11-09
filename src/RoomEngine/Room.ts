import { Container } from "pixi.js";
import { Map } from "./Map";
import RoomModel from "./RoomModel";

export class Room {
    root_stage: Container;
    map: Map;
    model: RoomModel;

    constructor(root_stage: Container, model: RoomModel) {
        this.root_stage = root_stage;
        this.model = model;
        this.map = new Map(this);
    }
}
import { Container } from "pixi.js";
import { Map } from "./Map";
import RoomModel from "./RoomModel";
import * as PIXI from 'pixi.js';
import { HSmile } from "../HSmileMain";
import AvatarPart from "../Avatar/AvatarPart";

export class Room {
    root_stage: Container;
    map: Map;
    model: RoomModel;

    avatarPart?: AvatarPart;

    constructor(root_stage: Container, model: RoomModel) {
        this.root_stage = root_stage;
        this.model = model;
        this.map = new Map(this);

        // generate map
        //this.map.generate();
        const app = HSmile.get().app!;

        this.avatarPart = new AvatarPart(this.root_stage);
    
        this.avatarPart.rotation = 7;


        // this.avatarPart.draw();


    }

    update(): void {
        this.avatarPart!.update();
    }
    
    draw(): void {
        this.avatarPart!.draw();
    }
}
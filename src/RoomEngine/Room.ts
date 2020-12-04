import { Container } from "pixi.js";
import { Map } from "./Map";
import RoomModel from "./RoomModel";
import * as PIXI from 'pixi.js';
import { HSmile } from "../HSmileMain";
import AvatarPart from "../Avatar/AvatarPart";
import AvatarHead from "../Avatar/Parts/AvatarHead";
import AvatarBody from "../Avatar/Parts/AvatarBody";
import AvatarLeftHand from "../Avatar/Parts/AvatarLeftHand";
import AvatarRightHand from "../Avatar/Parts/AvatarRightHand";
import AvatarComposer from "../Avatar/AvatarComposer";


export class Room {
    root_stage: Container;
    map: Map;
    model: RoomModel;

    avatarComposer?: AvatarComposer;

    constructor(root_stage: Container, model: RoomModel) {
        this.root_stage = root_stage;
        this.model = model;
        this.map = new Map(this);

        // generate map
        this.map.generate();

        const app = HSmile.get().app!;

        this.avatarComposer = new AvatarComposer(this.map.mapStage);

        this.avatarComposer.position.x = 0;
        this.avatarComposer.position.y = 0;
        

    }

    update(): void {
        this.avatarComposer!.update();
        this.map.update();
    }
    
    draw(): void {
        this.avatarComposer!.draw();
        this.map.draw();
    }
}
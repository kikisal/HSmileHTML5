import * as PIXI from 'pixi.js';
import Transform from '../Math/Transform';
import Vector from '../Math/Vector';
import IndexOrders from '../HSmile/Room/RoomEngine/IndexOrders';
import { Map } from '../HSmile/Room/RoomEngine/Map';
import IAvatarPart from './IAvatarPart';
import AvatarBody from './Parts/AvatarBody';
import AvatarHead from './Parts/AvatarHead';
import AvatarLeftHand from './Parts/AvatarLeftHand';
import AvatarRightHand from './Parts/AvatarRightHand';

// this class combine each avatar part.

export default class AvatarComposer {
    

    position: Vector = new Vector();

    parent: PIXI.Container; // parent stage to attach to
    avatar_stage: PIXI.Container;
    
    avatarParts: IAvatarPart[];

    rotation: number = 0;
    tint?: number = 0xDBDBDB;
    alpha: number = 1;
    zIndex: number = IndexOrders.AVATAR_INDEX;


    constructor( stage: PIXI.Container ) {
        this.parent = stage;
        this.avatarParts = [];

        this.avatar_stage = new PIXI.Container;
        this.avatar_stage.sortableChildren = true;
        this.avatar_stage.zIndex = this.zIndex;

        this.parent.addChild(this.avatar_stage);
        this.setAvatarParts();

    }

    private setAvatarParts(): void {
        this.avatarParts = [
            new AvatarHead(this.avatar_stage, this.tint),
            new AvatarBody(this.avatar_stage, this.tint),
            new AvatarLeftHand(this.avatar_stage, this.tint),
            new AvatarRightHand(this.avatar_stage, this.tint)
        ]
    }

    draw(): void {
        this.avatarParts.forEach(e => {
            e.rotation = (<any>window).rotation || this.rotation;
            e.tint = this.tint;
            e.alpha = this.alpha;
  
            e.draw();
        });


        const iso = Map.discrete(Transform.toIso(this.position));
        this.avatar_stage.position.x = iso.x + 31;
        this.avatar_stage.position.y = iso.y + iso.z - 46;

        this.avatar_stage.zIndex = this.zIndex;
    }

    update(): void {
        this.avatarParts.forEach(e => e.update());
    }
}
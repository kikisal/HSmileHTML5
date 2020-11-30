import * as PIXI from 'pixi.js';
import IAvatarPart from './IAvatarPart';
import AvatarBody from './Parts/AvatarBody';
import AvatarHead from './Parts/AvatarHead';
import AvatarLeftHand from './Parts/AvatarLeftHand';
import AvatarRightHand from './Parts/AvatarRightHand';

// this class combine each avatar part.

export default class AvatarComposer {
    
    parent: PIXI.Container; // parent stage to attach to
    avatar_stage: PIXI.Container;
    
    avatarParts: IAvatarPart[];

    rotation: number = 0;
    tint?: number = 0xFFFFFF;



    constructor( stage: PIXI.Container ) {
        this.parent = stage;
        this.avatarParts = [];

        this.avatar_stage = new PIXI.Container;
        this.avatar_stage.sortableChildren = true;

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
            e.rotation = (<any>window).rotation || 7;
            e.tint = this.tint;
            e.draw();
        });
    }

    update(): void {
        this.avatarParts.forEach(e => e.update());
    }
}
import * as PIXI from 'pixi.js';
import IAvatarPart from './IAvatarPart';
import AvatarBody from './Parts/AvatarBody';
import AvatarHead from './Parts/AvatarHead';

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
        this.parent.addChild(this.avatar_stage);

        this.setAvatarParts();
    }

    private setAvatarParts(): void {
        this.avatarParts = [
            new AvatarBody(this.avatar_stage, this.tint),
            new AvatarHead(this.avatar_stage, this.tint),
        ]
    }

    draw(): void {
        this.avatarParts.forEach(e => {
            e.rotation = this.rotation;
            e.tint = this.tint;
            e.draw()
        });
    }

    update(): void {
        this.avatarParts.forEach(e => e.update());
    }
}
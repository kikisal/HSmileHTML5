import * as PIXI from 'pixi.js';
import { HSmile } from '../../HSmileMain';
import Vector from '../../Math/Vector';
import AvatarComposer from '../AvatarComposer';
import AvatarPart from "../AvatarPart";
import { HS_HUMAN_BODY } from '../GlobalTexts';


export default class AvatarHead extends AvatarPart {


    constructor(stage: PIXI.Container, tint?: number) {
        super(stage, tint);
        this.position.y = -35;
        this.stylePart = 2;
        this.avatarPart = 'hd';
        this.animationSpeed = .06;
   
    }



    // sprite configuration
    prepareSprites(): void {
        this.setSprites('std', 1);
        this.setSprites('spk', 2);
    }
   
}
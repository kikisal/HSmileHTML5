import * as PIXI from 'pixi.js';
import { HSmile } from '../../HSmileMain';
import Vector from '../../Math/Vector';
import AvatarPart from "../AvatarPart";
import { HS_HUMAN_BODY } from '../GlobalTexts';


export default class AvatarLeftHand extends AvatarPart {
    constructor(stage: PIXI.Container, tint?: number) {
        super(stage, tint);
        this.avatarPart = 'lh';
        this.animationState = 'wlk';
        this.animationSpeed = .18;
        
    }

    // sprite configuration
    prepareSprites() {
        this.setSprites('std', 1);
        this.setSprites('wlk', 4);
      //  this.setSprites('spk', 2);
    }
   
}
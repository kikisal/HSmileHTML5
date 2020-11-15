import * as PIXI from 'pixi.js';
import { HSmile } from '../../HSmileMain';
import Vector from '../../Math/Vector';
import AvatarPart from "../AvatarPart";
import { HS_HUMAN_BODY } from '../GlobalTexts';


export default class AvatarLeftHand extends AvatarPart {
    constructor(stage: PIXI.Container, tint?: number) {
        super(stage, new Vector(), tint);
        this.avatarPart = 'lh';
        this.animationSpeed = .06;
        
    }

    // sprite configuration
    prepareSprites() {
        this.setSprites('std', 1);
      //  this.setSprites('spk', 2);
    }
   
}
import * as PIXI from 'pixi.js';
import { HSmile } from '../../HSmileMain';
import Vector from '../../Math/Vector';
import AvatarPart from "../AvatarPart";
import { HS_HUMAN_BODY } from '../GlobalTexts';


export default class AvatarBody extends AvatarPart {
    constructor(stage: PIXI.Container, tint?: number) {
        super(stage, new Vector(0, 0), tint);
    }

    prepareSprites() {
 
        this.setSprites('std', 1);
        this.setSprites('wlk', 4);    
    }

   
}
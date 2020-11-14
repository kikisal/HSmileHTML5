import * as PIXI from 'pixi.js';
import { HSmile } from '../../HSmileMain';
import AvatarPart from "../AvatarPart";
import { HS_HUMAN_BODY } from '../GlobalTexts';


export default class AvatarBody extends AvatarPart {
    constructor(stage: PIXI.Container, tint?: number) {
        super(stage, tint);
    }

    prepareSprites() {
        const app = HSmile.get().app!;

        this.setSprites('std', 1);
        this.setSprites('wlk', 3);    
    }

   
}
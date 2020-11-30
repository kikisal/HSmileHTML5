import * as PIXI from 'pixi.js';
import { HSmile } from '../../HSmileMain';
import Vector from '../../Math/Vector';
import AvatarPart from "../AvatarPart";
import { HS_HUMAN_BODY } from '../GlobalTexts';


export default class AvatarRightHand extends AvatarPart {
    constructor(stage: PIXI.Container, tint?: number) {
        super(stage, tint);
        this.avatarPart = 'rh';
        this.animationState = 'std';
        this.animationSpeed = .18;
        this.position.x = 10;
        this.position.y = -6;
    }

    update(): void {
        super.update();

        this.zIndex = 1;

        switch( this.rotation ) {
            case 0:
                this.position.x = 10;
                this.position.y = -6;
                break;

            case 1:
                this.position.x = -1;
                this.position.y = -4;
                break;
            case 2:
                this.position.x = -11;
                this.position.y = -6;
                break;
            case 3:
                this.position.x = -12;
                this.position.y = -9;
                break;
            case 4:
                this.position.x = 10.1;
                this.position.y = -6.6;
                break;
            case 5:
                this.zIndex = -1;
                this.position.x = 2;
                this.position.y = -5;
                break;
            case 6:
                this.position.x = -10;
                this.position.y = -6;
                break;

            case 7:
               // this.zIndex = -1;
                this.position.x = 12;
                this.position.y = -7;
                break;
        }
    }

    // sprite configuration
    prepareSprites() {
        this.setSprites('std', 1);
        this.setSprites('wlk', 4);
    }
   
}
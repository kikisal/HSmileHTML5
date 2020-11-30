import * as PIXI from 'pixi.js';
import { HSmile } from '../../HSmileMain';
import Vector from '../../Math/Vector';
import AvatarPart from "../AvatarPart";
import { HS_HUMAN_BODY } from '../GlobalTexts';


export default class AvatarLeftHand extends AvatarPart {
    constructor(stage: PIXI.Container, tint?: number) {
        super(stage, tint);
        this.avatarPart = 'lh';
        this.animationState = 'std';
        this.animationSpeed = .18;
        this.position.x = -13;
        this.position.y = -11;
    }
    
    update(): void {
        super.update();

        this.zIndex = 1;
        
        switch( this.rotation ) {
            case 0:
                this.zIndex = -1;
                this.position.x = -13;
                this.position.y = -10;
                break;

            case 1:
                this.zIndex = -1;
                this.position.x = -1;
                this.position.y = -4;
                break;
            case 2:
                this.position.x = 11;
                this.position.y = -11;
                break;
            case 3:
                this.position.x = 13;
                this.position.y = -9;
                break;
            case 4:
                this.position.x = -11;
                this.position.y = -11;
                break;
            case 5:
                
                this.position.x = 2;
                this.position.y = -5;
                break;
            case 6:
                this.zIndex = -1;
                this.position.x = 12;
                this.position.y = -12;
                break;

            case 7:
               // this.zIndex = -1;
                this.position.x = -12;
                this.position.y = -7;
                break;
        }
    }

    // sprite configuration
    prepareSprites() {
        this.setSprites('std', 1);
        this.setSprites('wlk', 4);
      //  this.setSprites('spk', 2);
    }
   
}
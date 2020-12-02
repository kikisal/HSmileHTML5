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
        this.zIndex = 2;
   
    }


    update(): void {
        super.update();

        switch( this.rotation ) {
            case 0:
                this.position.x = 2;
                
                break;

            case 3:
                this.position.x = 0;
                
                break;
            case 4:
                this.position.y = -34;
                this.position.x = 1;
                break;

            case 7:
                this.position.x = -.5;
                break;
            default:
                this.position.y = -35;
                break;
        }
    }

    // sprite configuration
    prepareSprites(): void {
        this.setSprites('std', 1);
        this.setSprites('spk', 2);
    }
   
}
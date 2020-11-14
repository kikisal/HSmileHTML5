import * as PIXI from 'pixi.js';
import { HSmile } from '../HSmileMain';
import Vector from '../Math/Vector';
import { AnimationStates, AvatarParts, AvatarRotations } from "./AvatarTypes";
import { HS_HUMAN_BODY, H } from './GlobalTexts';
import IAvatarPart from "./IAvatarPart";




export default class AvatarPart implements IAvatarPart {
    
    stage: PIXI.Container;

    animationState: AnimationStates = 'std';
    avatarPart: AvatarParts = 'bd';
    stylePart: number = 1;
    styleRotation: AvatarRotations = 0; // rotations 0, 1, 2, 3, 7
    rotation: number = 0; //
    animationFrame: number = 0; // animation frame
    flip: boolean = false;

    spritePart: PIXI.Sprite;

    offset?: Vector;

    animatedSprites?: PIXI.AnimatedSprite;

    constructor(stage: PIXI.Container) {
        this.stage = stage;
        this.offset = new Vector();
        this.spritePart = new PIXI.Sprite();
        this.createSprite();


    }

    update(): void {
        if ( this.rotation > 7 )
            this.rotation = 7;
        
        if ( this.rotation < 0 )
            this.rotation = 0;

        // 3

        if ( this.rotation > 3 && this.rotation < 7 )
            this.flip = true;
        else
            this.flip = false;

        this.updateStyleRotation();
    }

    updateStyleRotation() {
        switch( this.rotation ) {

            case 0:
            case 1:
            case 2:
            case 3:
            case 7:
                this.styleRotation = this.rotation;
                break;

            case 4:
                this.styleRotation = 2;
                break;
            case 5:
                this.styleRotation = 1;
                break;
                
            case 6:
                this.styleRotation = 0;
                break;
        }
    }
    
    createSprite(): void {
        const app = HSmile.get().app!;

        this.spritePart = new PIXI.Sprite(app.loader.resources[HS_HUMAN_BODY].textures![this.getSpriteString()]);
        this.spritePart.scale.x = this.flip ? -1 : 1;

        if ( false /* certain type of rotation... */ ) {
            // flip image.
        }

        this.spritePart.anchor.set(0.5);
        this.spritePart.position.set(this.offset?.x, this.offset?.y);

  
        this.stage.addChild(this.spritePart);
    }
    

    draw(): void {
        const app = HSmile.get().app!;
        this.spritePart!.texture = app.loader.resources[HS_HUMAN_BODY].textures![this.getSpriteString()];       
        this.spritePart.scale.x = this.flip ? -1 : 1; 
    }


    getSpriteString(): string {
        return `${HS_HUMAN_BODY}_${H}_${this.animationState}_${this.avatarPart}_${this.stylePart}_${this.styleRotation}_${this.animationFrame}.png`;
    }

}
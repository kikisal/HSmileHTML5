import * as PIXI from 'pixi.js';
import { HSmile } from '../HSmileMain';

import Vector from '../Math/Vector';
import { ImageResource } from '../Resource/ResourceManagerImage';
import { Map } from '../HSmile/Room/Map';
import { AnimationStates, AvatarParts, AvatarRotations } from "./AvatarTypes";
import { HS_HUMAN_BODY, H } from './GlobalTexts';
import IAvatarPart from "./IAvatarPart";

const [MAX_ROTATIONS, NO_FLIP_ROTATION] = [7, 3];

type HSmileSprite = {
    [key: string]: number;
};

export default class AvatarPart implements IAvatarPart {
    
    stage: PIXI.Container;
    
    alpha: number = 1;

    zIndex: number = 0;

    animationState: AnimationStates = 'std';
    avatarPart: AvatarParts = 'bd';
    stylePart: number = 1;
    styleRotation: AvatarRotations = 0; // rotations 0, 1, 2, 3, 7
    rotation: number = 0; //

    currentAnimationFrame: number = 0; // num frames

    animationSpeed: number = .14;

    
    flip: boolean = false;

    tint?: number;

    

    sprite?: PIXI.Sprite;

    spriteFrames: HSmileSprite = {};


    position: Vector = new Vector();

    constructor(stage: PIXI.Container, tint?: number) {
        this.stage = stage;

        this.tint = tint;
  

        this.createSprite();
    }

    prepareSprites(): void {
        throw new Error('Method not implemented.');
    }
    
    setSprites(state: AnimationStates, numFrames: number): void {
        const app = HSmile.get().app!;
        const old_state  = this.animationState;

        this.animationState = state;
        this.spriteFrames[state] = numFrames;
        this.animationState = old_state;
    }

    createSprite(): void {
        const app = HSmile.get()!;

        this.prepareSprites();
 

        this.sprite = new PIXI.Sprite(app.getResourceImageManager().get(HS_HUMAN_BODY)!.getTexture(this.getSpriteString())!);

        const offset = app.getResourceImageManager().get(HS_HUMAN_BODY)!.getFrame(this.getSpriteString())!.offset;

    
        this.sprite.scale.x = this.flip ? -1 : 1;
        this.sprite.position.x = this.position.x + offset.x;
        this.sprite.position.y = this.position.y + offset.y;

        this.sprite.anchor.set(0.5);
        // offset array positions
        //this.sprite.position.set(this.offsetArray[this.getSpriteString()].x, this.offsetArray[this.getSpriteString()].y);
        
        this.sprite.tint = this.tint || 0xFFFFFF;
        this.sprite.alpha = this.alpha;

        // app.loader.resources[HS_HUMAN_BODY].textures![this.getSpriteString()];
        
  
        this.stage.addChild(this.sprite);
       // this.sprite.play();
    }
    


    draw(): void {
        const app = HSmile.get()!;
       // this.spritePart!.textures = app.loader.resources[HS_HUMAN_BODY].textures![this.getSpriteString()];       
        if ( !this.sprite || !this.spriteFrames )
            return;

        const offset = app.getResourceImageManager().get(HS_HUMAN_BODY)!.getFrame(this.getSpriteString())!.offset;
     

        this.sprite.texture = app.getResourceImageManager().get(HS_HUMAN_BODY)!.getTexture(this.getSpriteString())!;   
        this.sprite.scale.x = this.flip ? -1 : 1;

      
        this.sprite.position.x = this.position.x + (!this.flip ? offset.x : offset.flip.x);
        this.sprite.position.y = this.position.y + (!this.flip ? offset.y : offset.flip.y);
        this.sprite.zIndex = this.zIndex;
        this.sprite.tint = this.tint || 0xFFFFFF;
        this.sprite.alpha = this.alpha;
    }

    update(): void {

        if ( !this.spriteFrames[this.animationState] )
            this.animationState = 'std';

        if ( this.rotation > MAX_ROTATIONS )
            this.rotation = MAX_ROTATIONS;
        
        if ( this.rotation < 0 )
            this.rotation = 0;

        // 3

        if ( this.rotation > NO_FLIP_ROTATION && this.rotation < MAX_ROTATIONS )
            this.flip = true;
        else
            this.flip = false;

        this.updateStyleRotation();
        this.updateFrames();
    }

    updateFrames(): void {
        const frames = this.spriteFrames[this.animationState];
        
        if ( frames > 1 ) { // there is animations to perform.
            
            if ( this.currentAnimationFrame > frames) 
                this.currentAnimationFrame = 0;
            else
                this.currentAnimationFrame += this.animationSpeed;

        }
    }

    updateStyleRotation(): void {
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


    getSpriteString(): string {
        let animationFrame = Math.floor(this.currentAnimationFrame);
        if ( animationFrame > this.spriteFrames[this.animationState] - 1 )
            animationFrame = this.spriteFrames[this.animationState] - 1;

        return `${HS_HUMAN_BODY}_${H}_${this.animationState}_${this.avatarPart}_${this.stylePart}_${this.styleRotation}_${animationFrame}.png`;
    }

}
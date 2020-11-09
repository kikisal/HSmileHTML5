import * as PIXI from 'pixi.js';
import { HSmile } from '../HSmileMain';
import Vector from '../Math/Vector';
import { Room } from './Room';

export class Map {


    static CELL_WIDTH: number = 32;
    static CELL_HEIGHT: number = 16;

    room: Room;

    // game layers
    private floorStage: PIXI.Container;
    private wallStage : PIXI.Container;
    private furniStage: PIXI.Container;
    
  
        
    constructor(room: Room) {
        this.room = room;

        const app = HSmile.get().app!;
        this.floorStage = new PIXI.Container();
        this.wallStage  = new PIXI.Container();
        this.furniStage = new PIXI.Container();
        this.floorStage.x = app.view.width  / 2;
        this.floorStage.y = app.view.height / 2;
        this.addStages();
        // generate map
        this.generate();
    }

    addStages() {        
        const { root_stage } = this.room;

        root_stage.addChild(this.floorStage);
        root_stage.addChild(this.wallStage);
        root_stage.addChild(this.furniStage);
    }

    /**
     * @description Used to make rectangular map.
     * 
     * 
     * @param tilesX how many tiles along x
     * @param tilesY how many tiles along y
     * @param offsetX map origin x
     * @param offsetY map origin y
     */
    generate(): void {
        
        

        const app = HSmile.get().app!;
        
        // clear floor stage. Removes old tiles.
        this.clearFloor();
        this.clearWalls();


        this.generateFloor();
        this.generateWalls();



        /*

        for ( let i = 0; i < tilesY; ++i ) {
            for ( let j = 0; j < tilesX; ++j ) {

                let coords = this.toIso(new PIXI.Point(i, j));
            
                coords.set(
                    (coords.x * this.cellWidth) + offsetX, 
                    ((coords.y * this.cellHeight) + offsetY) 
                );
               
          

                this.renderIsometricTile(
                    this.floorStage, 
                    coords
                );
            }
        }
        */

    }

    generateWalls(): void {

    }
    
    generateFloor(): void {

        const { model } = this.room;
        for ( let i = 0; i < model.size.y; ++i ) {
            for( let j = 0; j < model.size.x; ++j ) {
                const tileIndex = model.heightMap[j][i];
                if ( tileIndex === 0 ) // skip holes.
                    continue;
                
                
                this.renderTile(this.floorStage, this.discrete(
                    this.toIso(new Vector(j, i, tileIndex - 1))
                ));

            }
        }

    }

    discrete(position: Vector): Vector {
        return new Vector(
            position.x * Map.CELL_WIDTH,
            position.y * Map.CELL_HEIGHT,
            position.z * Map.CELL_HEIGHT * 2
        );
    }

    clearWalls(): void {
        for( let i = this.wallStage.children.length - 1; i >= 0; --i )
            this.wallStage.removeChild(this.wallStage.children[i]);
    }

    /**
     * @description remove all old tiles from "floorStage"
     */
    clearFloor(): void {
        for( let i = this.floorStage.children.length - 1; i >= 0; --i )
            this.floorStage.removeChild(this.floorStage.children[i]);
    }

    /**
     * 
     * @param point point to be transformed 
     */
    toIso(point: Vector): Vector {
        return new Vector( 
            (point.x - point.y),
            (point.x + point.y),
            -point.z
        );
    }


    /**

     * 
     * @param stage 
     * @param point 
     * @param size 
     * @param height 
     * @param topColor 
     * @param leftColor 
     * @param rightColor 
     */
    renderTile(stage: PIXI.Container, position: Vector) {

        // size: number, 
       //  height: number = 9, topColor: number = 0x989865, leftColor: number = 0x767643, rightColor: number = 0x545421
            const app = HSmile.get().app!;

            let sheet = app.loader.resources['room_tiles'].spritesheet;
            
            const tileSprite = new PIXI.Sprite(sheet?.textures["normal.png"]);
            tileSprite.anchor.set(0, 1);
            
            tileSprite.x = position.x;
            tileSprite.y = position.y + position.z;

            tileSprite.tint = 0x989865;
            

            stage.addChild(tileSprite);
      }

}

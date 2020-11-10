import * as PIXI from 'pixi.js';
import { HSmile } from '../HSmileMain';
import Vector from '../Math/Vector';
import RoomGraphics from '../RoomGraphics/RoomGraphics';
import { Room } from './Room';

export class Map {


    static CELL_WIDTH: number = 32;
    static CELL_HEIGHT: number = 16;
    
    static WALL_Z_FACTOR: number = 32;
    static WALL_HEIGHT_OFFSET: number = 122;

    room: Room;

    // game layers
    floorStage: PIXI.Container;
    wallStage : PIXI.Container;
    furniStage: PIXI.Container;


    
  
        
    constructor(room: Room) {
        this.room = room;

        const app = HSmile.get().app!;
        this.floorStage = new PIXI.Container();
        this.wallStage  = new PIXI.Container();
        this.furniStage = new PIXI.Container();

        this.floorStage.x = app.view.width  / 2;
        this.floorStage.y = app.view.height / 2;
        
        this.wallStage.x = this.floorStage.x;
        this.wallStage.y = this.floorStage.y;

        this.wallStage.zIndex = 2;
        
        this.floorStage.zIndex = 1;
        
        this.addStages();
        // generate map
        this.generate();

    }

    addStages() {        
        const { root_stage } = this.room;

        root_stage.addChild(this.wallStage);
        root_stage.addChild(this.floorStage);
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

    generateLeftWalls() {
        const { model } = this.room;
        let sizeX = model.size.y;
        let height = 0;
        
        for ( let i = 0; i < model.size.y; ++i ) {
        // j alias of x
            for ( let j = 0; j < model.size.x; ++j ) {
                // i alias of y

                const tileIndex = model.heightMap[i][j];
                if ( (model.door.x !== j || model.door.y !== i) && tileIndex > 0 && j <= sizeX ) {
                    if ( sizeX > j )
                        sizeX = j;

                    // check door.
                    if ( false ) {

                    } else if ( false ) {

                    } else {
                        if ( tileIndex > 1 ) {
                            height = model.height - 1;
                        } 
    
                        this.renderLeftWall(this.wallStage, this.discrete(
                            this.toIso(new Vector(
                                j,
                                i,
                                height
                        ))), model.height - tileIndex);
                        height = 0;
     
                    }
                }

            }
        }
    }

    generateRightWalls() {
        const { model } = this.room;

      
        let wallZ = 0;
        // right walls
        for ( let y = 0; y < model.size.y; ++y ) {
            for ( let x = 0;  x < model.size.x; ++x ) {
                const tileZ = model.heightMap[y][x];

                if ( model.isDoor(x, y) ) // draw door style elements. Actually ignored.
                    continue;

                if ( tileZ > 1 )
                    wallZ = model.height - 1;

                if ( model.validTile(x, y) && !model.validTile(x, y - 1) ) {
                    this.renderRightWall(this.wallStage, this.discrete(
                        this.toIso(new Vector(
                            x,
                            y - 1,
                            wallZ
                    ))), model.height - tileZ, 8, !model.validTile(x + 1, y) || model.isDoor(x + 1, y));
                }

                wallZ = 0;

                //if ( (model.door.x === j) && model.door.y === i )

        //        console.log();
             /*
                if ( (model.door.x !== j || model.door.y !== i) && tileIndex > 0 ) {


                    if ( tileIndex > 1 ) {
                        height = model.height - 1;
                    } 

                    console.log('yes can render a wall.');
               
                    this.renderRightWall(this.wallStage, this.discrete(
                        this.toIso(new Vector(
                            i,
                            j + 1,
                            height
                    ))), model.height - tileIndex);

                    height = 0;
                } else {
                    
                    console.log('no I can\'t.');
                }
                */
            }
        }
    }

    generateWalls(): void {
        this.generateRightWalls();
       // this.generateLeftWalls();
    }

    generateFloor(): void {

        const { model } = this.room;
        
        console.log(model.heightMap);

        for ( let y = 0; y < model.size.y; ++y ) {
            for( let x = 0; x < model.size.x; ++x ) {
                const tileIndex = model.heightMap[y][x];
      
                if ( tileIndex === 0 ) // skip holes.
                    continue;
                
                
                this.renderTile(this.floorStage, this.discrete(
                    this.toIso(new Vector(x, y, tileIndex - 1))
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
     * @param position
     */
    renderRightWall(stage: PIXI.Container, position: Vector, wallHeight: number, thickess: number, mustDrawRight: boolean) {
        const wallSprite = RoomGraphics.makeRightWallGraphics((Map.WALL_HEIGHT_OFFSET + (Map.WALL_Z_FACTOR * wallHeight)), thickess, mustDrawRight);

        
        wallSprite.x = position.x + wallSprite.x;
        wallSprite.y = (position.y + position.z) + wallSprite.y;
        
       /*
       wallSprite.x = position.x;
       wallSprite.y = position.y + position.z - 2;
       */
       /*
       wallSprite.x = position.x + 32;
       wallSprite.y = position.y + position.z - 12;*/
        // bottom anchor
        stage.addChild(wallSprite);

    }

    /**
     * 
     * @param stage 
     * @param position 
     * @param wallHeight 
     */
    renderLeftWall(stage: PIXI.Container, position: Vector, wallHeight: number) {
        const wallSprite = new PIXI.Sprite(RoomGraphics.makeLeftWall((Map.WALL_HEIGHT_OFFSET + (Map.WALL_Z_FACTOR * wallHeight))));
        wallSprite.anchor.set(0, 1);
        wallSprite.x = position.x - 8;
        wallSprite.y = position.y + position.z - 12.2;

        // bottom anchor
        stage.addChild(wallSprite);

    }

    

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

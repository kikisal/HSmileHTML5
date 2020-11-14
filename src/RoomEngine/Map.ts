import * as PIXI from 'pixi.js';
import { HSmile } from '../HSmileMain';
import Vector from '../Math/Vector';
import RoomGraphics from '../RoomGraphics/RoomGraphics';
import { Room } from './Room';
import INDEX_ORDERS from './IndexOrders';

export class Map {


    static CELL_WIDTH: number = 32;
    static CELL_HEIGHT: number = 16;
    
    static WALL_Z_FACTOR: number = 32;
    static WALL_HEIGHT_OFFSET: number = 122;

    room: Room;

    // game layers
    // new
    mapStage: PIXI.Container;
    wallSprites: object[];

    stairsZIndeces: number = INDEX_ORDERS.STAIR_INDEX_OFFSET;
    
  
        
    constructor(room: Room) {
        this.room = room;
        this.wallSprites = [];

        const app = HSmile.get().app!;

        this.room.root_stage.position.x = window.innerWidth / 2;
        this.room.root_stage.position.y = window.innerHeight / 2;

        this.mapStage = new PIXI.Container();
        this.mapStage.sortableChildren = true;

        
        this.addStages();
        // generate map
        //this.generate();

    }

    addStages() {        
        const { root_stage } = this.room;
        root_stage.addChild(this.mapStage);
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
      //  this.clearFloor();
      //  this.clearWalls();

        this.clearAll();


        
        this.generateFloor();
       // this.generateWalls();
      //  this.generateDoor();
 
     //  this.generateStairRight();

    }

    generateStairRight(): void {
        const stairs = new PIXI.Sprite(RoomGraphics.makeRightStair());
        this.mapStage.addChild(stairs);
    }

    generateLeftWalls() {
        const { model } = this.room;

      
        let wallZ = 0;
        // left walls
        for ( let y = 0; y < model.size.y; ++y ) {
            for ( let x = 0;  x < model.size.x; ++x ) {
                const tileZ = model.heightMap[y][x];

                if ( model.isDoor(x, y) ) // draw door style elements. Actually ignored.
                    continue;

                if ( tileZ > 1 )
                    wallZ = model.height - 1;

                if ( model.validTile(x, y) && !model.starValidTile(x - 1, y)) {
                    this.renderLeftWall(this.mapStage, new Vector(
                        x,
                        y,
                        wallZ
                    ), model.height - tileZ, 8, !model.validTile(x, y + 1) || model.isDoor(x, y + 1));
                }

                wallZ = 0;
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

                if ( model.validTile(x, y) && !model.starValidTile(x, y - 1) ) {

                    this.renderRightWall(this.mapStage, new Vector(
                        x, 
                        y - 1, 
                        wallZ
                    ), model.height - tileZ, 8, !model.validTile(x + 1, y) || model.isDoor(x + 1, y))
                }

                wallZ = 0;
            }
        }
    }

    generateWalls(): void {
        this.generateRightWalls();
        this.generateLeftWalls();
    }



    generateDoor(): void {
        
    }

    generateFloor(): void {

        const { model } = this.room;

        let toSkip = 0;


        for ( let y = 0; y < model.size.y; ++y ) {
            for( let x = 0; x < model.size.x; ++x ) {
                const tileIndex = model.heightMap[y][x];
             

      
                if ( tileIndex === 0 ) // skip holes.
                    continue;

                    
               

                if ( model.validTile(x, y - 1) && Math.abs(tileIndex - model.heightMap[y - 1][x]) === 1 ) {
                  
                    this.renderRightStair(this.mapStage, new Vector(
                        x,
                        y,
                        tileIndex - 1
                    ), tileIndex, toSkip);
                } else {
                    this.renderTile(this.mapStage, new Vector(
                        x, 
                        y,
                        tileIndex - 1
                    ));
                }
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
/*
    clearWalls(): void {
        for( let i = this.wallStage.children.length - 1; i >= 0; --i )
            this.wallStage.removeChild(this.wallStage.children[i]);
    }
*/
    /**
     * @description remove all old tiles from "floorStage"
     */
    /*
    clearFloor(): void {
        for( let i = this.floorStage.children.length - 1; i >= 0; --i )
            this.floorStage.removeChild(this.floorStage.children[i]);
    }*/

    clearAll(): void {
        for( let i = this.mapStage.children.length - 1; i >= 0; --i )
            this.mapStage.removeChild(this.mapStage.children[i]);    
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
        const wallSprite = 
            new PIXI.Sprite(RoomGraphics.makeRightWall((Map.WALL_HEIGHT_OFFSET + (Map.WALL_Z_FACTOR * wallHeight)), thickess, mustDrawRight));

        const stagePosition = this.discrete(
            this.toIso(new Vector(
                position.x,
                position.y,
                position.z
        )));

        wallSprite.anchor.set(0, 1);
        wallSprite.x = stagePosition.x;
        wallSprite.y = stagePosition.y + stagePosition.z + 5;
        wallSprite.zIndex = INDEX_ORDERS.WALL_ORDER;
        
       
        this.wallSprites.push({
            x: position.x,
            y: position.y,
            sprite: wallSprite
        });



        // bottom anchor
        stage.addChild(wallSprite);

    }

    /**
     * 
     * @param stage 
     * @param position 
     * @param wallHeight 
     */
    renderLeftWall(stage: PIXI.Container, position: Vector, wallHeight: number, thickess: number, mustDrawRight: boolean) {
        const wallSprite = 
        new PIXI.Sprite(RoomGraphics.makeLeftWall((Map.WALL_HEIGHT_OFFSET + (Map.WALL_Z_FACTOR * wallHeight)), thickess, mustDrawRight));

        
        const stagePosition = this.discrete(
            this.toIso(new Vector(
                position.x,
                position.y,
                position.z
        )));

        wallSprite.anchor.set(0, 1);
        wallSprite.x = stagePosition.x - 8;
        wallSprite.y = stagePosition.y + stagePosition.z - 11;
        wallSprite.zIndex = INDEX_ORDERS.WALL_ORDER;

        this.wallSprites.push({
            x: position.x,
            y: position.y,
            sprite: wallSprite
        });

        // bottom anchor
        stage.addChild(wallSprite);


    }

    renderRightStair(stage: PIXI.Container, position: Vector, tileHeight: number, toSkip: number = 0) {
        // size: number, 
       //  height: number = 9, topColor: number = 0x989865, leftColor: number = 0x767643, rightColor: number = 0x545421
       const app = HSmile.get().app!;

       const tileSprite = new PIXI.Sprite(RoomGraphics.makeRightStair(toSkip));
       tileSprite.anchor.set(0, 1);
       
       const stagePosition = this.discrete(
           this.toIso(new Vector(position.x, position.y, position.z))
       );

       tileSprite.x = stagePosition.x - 8;
       tileSprite.y = stagePosition.y + stagePosition.z - 3;
       tileSprite.zIndex = this.stairsZIndeces + tileHeight;
       // tileSprite.tint = 0x989865;


       stage.addChild(tileSprite);
    }

    renderLeftStair(stage: PIXI.Container, position: Vector) {
        
        // size: number, 
       //  height: number = 9, topColor: number = 0x989865, leftColor: number = 0x767643, rightColor: number = 0x545421
       const app = HSmile.get().app!;

       const tileSprite = new PIXI.Sprite(RoomGraphics.makeLeftStair());
       tileSprite.anchor.set(0, 1);
       
       const stagePosition = this.discrete(
           this.toIso(new Vector(position.x, position.y, position.z))
       );

       tileSprite.x = stagePosition.x;
       tileSprite.y = stagePosition.y + stagePosition.z;

       // tileSprite.tint = 0x989865;
       tileSprite.zIndex = INDEX_ORDERS.FLOOR_ORDER;


       stage.addChild(tileSprite);
    }

    renderTile(stage: PIXI.Container, position: Vector) {

        // size: number, 
       //  height: number = 9, topColor: number = 0x989865, leftColor: number = 0x767643, rightColor: number = 0x545421
            const app = HSmile.get().app!;

            let sheet = app.loader.resources['room_tiles'].spritesheet;
            
            const tileSprite = new PIXI.Sprite(sheet?.textures["normal.png"]);
            tileSprite.anchor.set(0, 1);
            
            const stagePosition = this.discrete(
                this.toIso(new Vector(position.x, position.y, position.z))
            );

            tileSprite.x = stagePosition.x;
            tileSprite.y = stagePosition.y + stagePosition.z;

            tileSprite.tint = 0x989865;
            tileSprite.zIndex = INDEX_ORDERS.FLOOR_ORDER;


            stage.addChild(tileSprite);
      }

}

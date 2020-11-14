import { Point } from "pixi.js";

export default class RoomModel {
    size: Point;
    door: Point;
    heightMap: number[][];
    wallMap: number[][];
    height: number;

    constructor(size: Point, door: Point, heightMap: number[][]) {
        this.size = size;
        this.door = door;
        this.heightMap = heightMap;
        this.wallMap = [];
        this.height = 1;
        this.transposeHeightMap();
    
        this.calculateHeight();
    }

    transposeHeightMap() {
        this.heightMap = this.heightMap[0].map((_, colIndex) => this.heightMap.map(row => row[colIndex]));
        const sizeX = this.size.x;
        this.size.x = this.size.y;
        this.size.y = sizeX;
    }

    calculateHeight() {
        for ( let j = 0; j < this.size.x; ++j ) {
            for( let i = 0; i < this.size.y; ++i ) {
                const tileIndex = this.heightMap[i][j];
                if ( tileIndex > this.height ) 
                    this.height = tileIndex;
            }
        }
    }

    starValidTile(x: number, y: number): boolean {
        for ( let _y = y; _y >= 0; --_y ) {
            for ( let _x = x; _x >= 0; --_x ) {
                if ( this.validTile(_x, _y) )
                    return true;
            }
        }

        return false;
    }

    static default2x2(): RoomModel {
        return new RoomModel(new Point(1, 3), new Point(0, 1), [
            [1, 1],
            [1, 1]
        ]);
    }

    static default6x6(): RoomModel {
        return new RoomModel(new Point(9, 6), new Point(4, 0), [
            [0, 0, 0, 0, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 1, 1, 1],
            [3, 3, 3, 3, 1, 1, 1, 1, 1],
            [3, 3, 3, 3, 1, 1, 1, 1, 1],
            [3, 3, 3, 2, 1, 1, 1, 1, 1],
            [3, 3, 3, 2, 1, 1, 1, 1, 1],

        ]);
    }

    static default6x6_circ(): RoomModel {
        return new RoomModel(new Point(6, 6), new Point(4, 0), [
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 1, 1],
            [1, 1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],

        ]);      
    }

    static default13x8(): RoomModel {
        return new RoomModel(new Point(13, 8), new Point(0, 4), [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

        ]);      
    }

    isDoor(x: number, y: number): boolean {
        return x === this.door.x && y === this.door.y;
    }

    // mapped x and y. unit measure is not in px.
    validTile(x: number, y: number): boolean {
        return (
            x >= 0 && x < this.size.x &&
            y >= 0 && y < this.size.y &&
            this.heightMap[y][x] !== 0
        );
    }

    inBounds(x: number, y: number): boolean {
        return x > 0 && x < this.size.x && y > 0 && y < this.size.y; 
    }
}
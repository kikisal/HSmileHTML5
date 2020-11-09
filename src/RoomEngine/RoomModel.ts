import { Point } from "pixi.js";

export default class RoomModel {
    size: Point;
    door: Point;
    heightMap: number[][];
    height: number;

    constructor(size: Point, door: Point, heightMap: number[][]) {
        this.size = size;
        this.door = door;
        this.heightMap = heightMap;
        this.height = 1;

        this.calculateHeight();
    }

    calculateHeight() {
        for ( let j = 0; j < this.size.x; ++j ) {
            for( let i = 0; i < this.size.y; ++i ) {
                const tileIndex = this.heightMap[j][i];
                if ( tileIndex > this.height ) 
                    this.height = tileIndex;
            }
        }
    }

    static default2x2(): RoomModel {
        return new RoomModel(new Point(1, 3), new Point(0, 1), [
            [1, 1],
            [1, 1]
        ]);
    }

    static default6x6(): RoomModel {
        return new RoomModel(new Point(8, 10), new Point(6, 6), [
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
            [2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
            [2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
            [2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
            [2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
            [2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
 
             
        ]);
    }

    // mapped x and y. unit measure is not in px.
    validTile(x: number, y: number): boolean {
        return (
            x >= 0 && x < this.size.x &&
            y >= 0 && y < this.size.y &&
            this.heightMap[x][y] !== 0
        );
    }
}
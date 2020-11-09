import { Point } from "pixi.js";

export default class RoomModel {
    size: Point;
    door: Point;
    heightMap: number[][];

    constructor(size: Point, door: Point, heightMap: number[][]) {
        this.size = size;
        this.door = door;
        this.heightMap = heightMap;
    }

    static default2x2(): RoomModel {
        return new RoomModel(new Point(2, 2), new Point(0, 1), [
            [1, 1],
            [1, 1]
        ]);
    }

    static default6x6(): RoomModel {
        return new RoomModel(new Point(6, 6), new Point(0, 1), [
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1]
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
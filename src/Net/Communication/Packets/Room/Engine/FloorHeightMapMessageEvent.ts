import RoomPlaneParser from "../../../../../HSmile/Room/object/RoomPlaneParser";
import IServerMessage from "../../../../Messages/IServerMessage";
import Incoming from "../../../Events/Incoming";
import IPacketEvent from "../../IPacketEvent";

export default class FloorHeightMapMessageEvent implements IPacketEvent {
    name: string = 'FloorHeightMapMessageEvent';
    packetId = Incoming.FloorHeightMapMessageComposer;

    fixedWallsHeight: number = -1;
    
    heightMap: number[][] = [];
    text: string = '';
    width = 0;
    height = 0;
    scale = 0;
    

    Parse(sp: IServerMessage): void {
        const scale = sp.popBoolean();
        this.fixedWallsHeight = sp.popInt();
        this.text = sp.popString();

        
        const rawHeightMap = this.text.split("\r");

        this.height = rawHeightMap.length;

        // get width.
        for ( let i = 0; i < this.height; ++i ) {
            const row = rawHeightMap[i];
            if ( row.length > this.width )
                this.width = row.length;
        }

        // fill heightmap with all blocked.
        for ( let i = 0; i < this.height; ++i )
            this.heightMap.push(Array.from(new Array(rawHeightMap[i].length), () => RoomPlaneParser.TILE_BLOCKED))

        for ( let i = 0; i < this.height; ++i ) {
            const row = this.heightMap[i];
            const rawRow = rawHeightMap[i];
            if ( rawRow.length > 0 ) {
                for ( let j = 0; j < rawRow.length; ++j ) {
                    const planeHeight = rawRow[j];

                    if ( planeHeight.toLocaleLowerCase() === 'x' )
                        row[j] = RoomPlaneParser.TILE_BLOCKED;
                    else
                        row[j] = parseInt(planeHeight, 36);
                }
            }
        }


        this.scale = scale ? 32 : 64;
    }

    
    getSqHeight(x: number, y: number): number
    {
        if ( x < 0 || x >= this.width || y < 0 || y >= this.height )
            return RoomPlaneParser.TILE_BLOCKED;

        return this.heightMap[y][x];
    }
}
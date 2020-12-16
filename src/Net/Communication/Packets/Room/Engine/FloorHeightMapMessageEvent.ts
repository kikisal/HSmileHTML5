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

        
        console.log(this.heightMap);
    }
}
import RoomPlaneParser from "../../../../../HSmile/Room/object/RoomPlaneParser";
import IServerMessage from "../../../../Messages/IServerMessage";
import Incoming from "../../../Events/Incoming";
import IPacketEvent from "../../IPacketEvent";

export default class HeightMapMessageEvent implements IPacketEvent {
    packetId: number = Incoming.HeightMapMessageComposer;
    name: string = 'HeightMapMessageEvent';

    private static readonly STACKING_BLOCKED: number = 0x4000;
    private static readonly HEIGHT_MASK: number = 0x3FFF;
    private static readonly HEIGHT_PARTS: number = 256;

    width = 0;
    height = 0;
    data: number[] = [];

    decodeTileHeight(height: number): number {
        return ( height < 0 ) ? -1 : ((height & HeightMapMessageEvent.HEIGHT_MASK) / HeightMapMessageEvent.HEIGHT_PARTS);
    }

    decodeIsStackingBlocked(height: number): boolean {
        return Boolean(height & HeightMapMessageEvent.STACKING_BLOCKED);
    }

    decodeIsRoomTile( height: number ): boolean {
        return height >= 0;
    }

    getStackingBlocked(x: number, y: number): boolean {
        if ( x < 0 || x >= this.width || y < 0 || y >= this.height )
            return false;

        return this.decodeIsStackingBlocked(this.data[(y * this.width) + x]);
    }

    getTileHeight( x: number, y: number ): number {
        if ( x < 0 || x >= this.width || y < 0 || y >= this.height )
            return -1;

        return this.decodeTileHeight(this.data[(y * this.width) + x]);
    }

    isRoomTile(x: number, y: number): boolean {
        if ( x < 0 || x >= this.width || y < 0 || y >= this.height )
            return false;

        return this.decodeIsRoomTile(this.data[(y * this.width) + x]);
    }



    Parse(serverPacket: IServerMessage): void {
        this.width = serverPacket.popInt();
        const area = serverPacket.popInt();
        this.height = area / this.width;

        for ( let i = 0; i < area; ++i )
            this.data.push(serverPacket.popShort());

    }
}
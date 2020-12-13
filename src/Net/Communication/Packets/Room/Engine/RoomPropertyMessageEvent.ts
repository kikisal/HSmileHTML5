import IServerMessage from "../../../../Messages/IServerMessage";
import Incoming from "../../../Events/Incoming";
import IPacketEvent from "../../IPacketEvent";

export default class RoomPropertyMessageEvent implements IPacketEvent {
    name: string = 'RoomPropertyMessageEvent';
    packetId = Incoming.RoomPropertyMessageComposer;

    floorType: string | null = null;
    wallType: string  | null = null;
    landScapeType: string | null = null;
    landeScapeAnim: string | null = null;

    Parse(serverPacket: IServerMessage): void {
        const key = serverPacket.popString();
        const value = serverPacket.popString();

        switch ( key ) {
            case 'floor':
                this.floorType = value;
                break;
            case 'wallpaper':
                this.wallType  = value;
                break;
            case 'landscape':
                this.landScapeType = value;
                break;
            case 'landscapeanim':
                this.landeScapeAnim = value;
                break;
        }

        
    }
}
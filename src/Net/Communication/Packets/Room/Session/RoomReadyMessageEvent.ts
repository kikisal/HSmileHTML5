import IServerMessage from "../../../../Messages/IServerMessage";
import Incoming from "../../../Events/Incoming";
import IPacketEvent from "../../IPacketEvent";

export default class RoomReadyMessageEvent implements IPacketEvent {
    name: string = 'RoomReadyMessageEvent';
    packetId = Incoming.RoomReadyMessageComposer;

    roomType:   string | null = null;
    roomId:     number | null = null;

    Parse(serverPacket: IServerMessage): void {
        const roomType = serverPacket.popString();
        const roomId = serverPacket.popInt();

        this.roomType = roomType;
        this.roomId = roomId;
    }
}
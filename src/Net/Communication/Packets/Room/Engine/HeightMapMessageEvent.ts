import IServerMessage from "../../../../Messages/IServerMessage";
import Incoming from "../../../Events/Incoming";
import IPacketEvent from "../../IPacketEvent";

export default class HeightMapMessageEvent implements IPacketEvent {
    packetId: number = Incoming.HeightMapMessageComposer;
    name: string = 'HeightMapMessageEvent';

    width = 0;
    height = 0;
    data: number[] = [];

    Parse(serverPacket: IServerMessage): void {
        this.width = serverPacket.popInt();
        const area = serverPacket.popInt();
        this.height = area / this.width;

        for ( let i = 0; i < area; ++i )
            this.data.push(serverPacket.popShort());
    }
}
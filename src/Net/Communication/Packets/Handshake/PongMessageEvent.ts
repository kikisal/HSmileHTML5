import IServerMessage from "../../../Messages/IServerMessage";
import IPacketEvent from "../IPacketEvent";

export default class PongMessage implements IPacketEvent {
    name = 'PongMessage';

    Parse( serverPacket: IServerMessage ): void {
       
    }
}
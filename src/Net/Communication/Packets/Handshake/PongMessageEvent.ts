import IServerMessage from "../../../Messages/IServerMessage";
import IPacketEvent from "../IPacketEvent";

export default class PongMessage implements IPacketEvent {
    Parse( serverPacket: IServerMessage ): void {
        
    }
}
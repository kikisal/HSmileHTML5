import IServerMessage from "../../../Messages/IServerMessage";
import IPacketEvent from "../IPacketEvent";

export default class AuthenticationOKMessageEvent implements IPacketEvent {
    Parse( serverPacket: IServerMessage ): void {
        
    }
}
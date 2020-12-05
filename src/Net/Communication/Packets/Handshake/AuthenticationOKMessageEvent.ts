import IServerMessage from "../../../Messages/IServerMessage";
import IPacketEvent from "../IPacketEvent";

export default class AuthenticationOKMessageEvent implements IPacketEvent {
    name = 'AuthenticationOKMessageEvent';

    Parse( serverPacket: IServerMessage ): void {
        

        // run ping-pong thread.
    }
}
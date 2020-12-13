import IServerMessage from "../../../Messages/IServerMessage";
import Incoming from "../../Events/Incoming";
import IPacketEvent from "../IPacketEvent";

export default class AuthenticationOKMessageEvent implements IPacketEvent {
    name = 'AuthenticationOKMessageEvent';
    packetId = Incoming.AuthenticationOKMessageComposer;

    Parse( serverPacket: IServerMessage ): void {
        

        // run ping-pong thread.
    }
}
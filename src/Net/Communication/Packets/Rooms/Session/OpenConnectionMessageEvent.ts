import IServerMessage from "../../../../Messages/IServerMessage";
import IPacketEvent from "../../IPacketEvent";

export default class OpenConnectionMessageEvent implements IPacketEvent {
    name: string = 'OpenConnectionMessageEvent';
    Parse(serverPacket: IServerMessage): void {
        
    }

}
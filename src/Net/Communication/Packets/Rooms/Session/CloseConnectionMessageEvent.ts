import IServerMessage from "../../../../Messages/IServerMessage";
import IPacketEvent from "../../IPacketEvent";

export default class CloseConnectionMessageEvent implements IPacketEvent {
    name: string = 'CloseConnectionMessageEvent';
    Parse(serverPacket: IServerMessage): void {
        // porta l'utente solo alla vista hotel
        
    }

}
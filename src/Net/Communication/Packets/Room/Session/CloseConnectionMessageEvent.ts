import IServerMessage from "../../../../Messages/IServerMessage";
import Incoming from "../../../Events/Incoming";
import IPacketEvent from "../../IPacketEvent";

export default class CloseConnectionMessageEvent implements IPacketEvent {
    name: string = 'CloseConnectionMessageEvent';
    packetId = Incoming.CloseConnectionMessageComposer;
    
    Parse(serverPacket: IServerMessage): void {
        // porta l'utente solo alla vista hotel
        
    }

}
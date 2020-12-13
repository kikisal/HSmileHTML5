import { HSmile } from "../../../../HSmileMain";
import ClientMessage from "../../../Messages/ClientMessage";
import IServerMessage from "../../../Messages/IServerMessage";
import Incoming from "../../Events/Incoming";
import Outcoming from "../../Events/Outcoming";
import IPacketEvent from "../IPacketEvent";

export default class NavigatorSettingsMessageEvent implements IPacketEvent {
    name = 'NavigatorSettingsMessageEvent';
    packetId = Incoming.NavigatorSettingsMessageComposer;
    
    Parse(serverPacket: IServerMessage): void {
       
       

           // steps:
           // 1) getting height map from database
           // 2) getting furnis


        const homeRoom1 = serverPacket.popInt();
        const homeRoom2 = serverPacket.popInt();
        
        console.log("HOME ROOM: ", homeRoom1);
        if ( homeRoom1 > 0 ) {
            // prova a generare la stanza

            const hsmile = HSmile.get();

            const msg = new ClientMessage(Outcoming.OpenFlatConnectionMessageEvent);
            msg.writeInt(homeRoom1);
            msg.writeString(''); // no password.
            
            hsmile.socketManager.Send(msg);
        } else {
            // porta l'utente solo alla vista hotel

        }
    }
}
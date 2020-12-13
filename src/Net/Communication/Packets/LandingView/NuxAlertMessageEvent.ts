import IServerMessage from "../../../Messages/IServerMessage";
import Incoming from "../../Events/Incoming";
import IPacketEvent from "../IPacketEvent";

export default class NuxAlertMessageEvent implements IPacketEvent {
    name: string = 'NuxAlertMessageEvent';
    packetId = Incoming.NuxAlertMessageComposer;
    
    Parse(serverPacket: IServerMessage): void {
        const pageToShow = serverPacket.popString();
        console.log('page to show: ' + pageToShow);
    }
}
import IServerMessage from "../../../Messages/IServerMessage";
import IPacketEvent from "../IPacketEvent";

export default class NuxAlertMessageEvent implements IPacketEvent {
    name: string = 'NuxAlertMessageEvent';
    
    Parse(serverPacket: IServerMessage): void {
        const pageToShow = serverPacket.popString();
        console.log('page to show: ' + pageToShow);
        
    }

}
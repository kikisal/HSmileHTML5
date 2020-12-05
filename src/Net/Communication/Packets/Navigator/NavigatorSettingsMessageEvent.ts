import IServerMessage from "../../../Messages/IServerMessage";
import IPacketEvent from "../IPacketEvent";

export default class NavigatorSettingsMessageEvent implements IPacketEvent {
    name = 'NavigatorSettingsMessageEvent';
    
    Parse(serverPacket: IServerMessage): void {
       

        const homeRoom1 = serverPacket.popInt();
        const homeRoom2 = serverPacket.popInt();
        
        console.log('home room id: ', homeRoom1);
    }

}
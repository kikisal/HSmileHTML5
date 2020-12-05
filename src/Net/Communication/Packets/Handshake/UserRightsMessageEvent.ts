import IServerMessage from "../../../Messages/IServerMessage";
import IPacketEvent from "../IPacketEvent";

export default class UserRightsMessageEvent implements IPacketEvent {
    name = 'UserRightsMessageEvent';
    
    Parse(serverPacket: IServerMessage): void {
        // is he (habbo_vip or habbo_club)
        // habbo_vip -> 2, habbo_club -> 1, nothing -> 0
        const subscription  = serverPacket.popInt();
        
        // user rank. (determine whether to show mod tools or not).
        const rank          = serverPacket.popInt();

        // ambassador boolean.
        const ambassador    = serverPacket.popBoolean();

        console.log('user subscription: ', subscription);
        console.log('user rank: ', rank);
        console.log('user ambassador: ', ambassador);
    }
}
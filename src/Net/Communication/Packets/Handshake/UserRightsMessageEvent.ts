import IServerMessage from "../../../Messages/IServerMessage";
import Incoming from "../../Events/Incoming";
import IPacketEvent from "../IPacketEvent";

export default class UserRightsMessageEvent implements IPacketEvent {
    name = 'UserRightsMessageEvent';
    packetId = Incoming.UserRightsMessageComposer;

    subscription?: number;
    rank?: number;
    ambassador?: boolean;
    
    Parse(serverPacket: IServerMessage): void {
        // is he (habbo_vip or habbo_club)
        // habbo_vip -> 2, habbo_club -> 1, nothing -> 0
        const subscription  = serverPacket.popInt();
        
        // user rank. (determine whether to show mod tools or not).
        const rank          = serverPacket.popInt();

        // ambassador boolean.
        const ambassador    = serverPacket.popBoolean();

        this.subscription = subscription;
        this.rank = rank;
        this.ambassador = ambassador;

        console.log('user subscription: ', subscription);
        console.log('user rank: ', rank);
        console.log('user ambassador: ', ambassador);
    }
}
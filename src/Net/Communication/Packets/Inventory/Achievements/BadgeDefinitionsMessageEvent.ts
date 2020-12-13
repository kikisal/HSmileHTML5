import IServerMessage from "../../../../Messages/IServerMessage";
import Incoming from "../../../Events/Incoming";
import IPacketEvent from "../../IPacketEvent";

export default class BadgeDefinitionsMessageEvent implements IPacketEvent {
    name = 'BadgeDefinitionsMessageEvent';
    packetId = Incoming.BadgeDefinitionsMessageComposer;
    
    Parse(serverPacket: IServerMessage): void {
        const achievements = serverPacket.popInt();

        for ( let i = 0; i < achievements; ++i ) {
            const groupName = serverPacket.popString();
            const levels = serverPacket.popInt();
            for( let j = 0; j < levels; ++j ) {
                const level = serverPacket.popInt();
                const requirement = serverPacket.popInt();
            }

            console.log("groupName: ", groupName);
        }
    }
    
}
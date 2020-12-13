import IServerMessage from "../../../../Messages/IServerMessage";
import Incoming from "../../../Events/Incoming";
import IPacketEvent from "../../IPacketEvent";

export default class AchievementScoreMessageEvent implements IPacketEvent {
    name: string = 'AchievementScoreMessageEvent';
    packetId = Incoming.AchievementScoreMessageComposer;
    
    Parse(serverPacket: IServerMessage): void {
        const achScore = serverPacket.popInt(); // achievement score
        console.log('achievement score: ', achScore);
    }
    
}
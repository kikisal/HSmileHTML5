import IServerMessage from "../../../../Messages/IServerMessage";
import IPacketEvent from "../../IPacketEvent";

export default class AchievementScoreMessageEvent implements IPacketEvent {
    name: string = 'AchievementScoreMessageEvent';
    
    Parse(serverPacket: IServerMessage): void {
        const achScore = serverPacket.popInt(); // achievement score
        console.log('achievement score: ', achScore);
    }
    
}
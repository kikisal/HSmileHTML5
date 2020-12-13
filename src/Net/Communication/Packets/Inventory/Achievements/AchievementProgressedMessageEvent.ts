import IServerMessage from "../../../../Messages/IServerMessage";
import ServerMessage from "../../../../Messages/ServerMessage";
import Incoming from "../../../Events/Incoming";
import IPacketEvent from "../../IPacketEvent";

export default class AchievementProgressedMessageEvent implements IPacketEvent {
    name: string = 'AchievementProgressedMessageEvent';
    packetId = Incoming.AchievementProgressedMessageComposer;
    
    Parse(serverPacket: IServerMessage): void {
        /*
            base.WriteInteger(Achievement.Id); // Unknown (ID?)
            base.WriteInteger(TargetLevel); // Target level
            base.WriteString(Achievement.GroupName + TargetLevel); // Target name/desc/badge
            base.WriteInteger(1); // Progress req/target 
            base.WriteInteger(TargetLevelData.Requirement); // Reward in Pixels
            
            base.WriteInteger(TargetLevelData.RewardPixels); // Reward Ach Score

            base.WriteInteger(0); // ?
            base.WriteInteger(UserData != null ? UserData.Progress : 0); // Current progress
            base.WriteBoolean(UserData != null ? (UserData.Level >= TotalLevels) : false); // Set 100% completed(??)
            
            base.WriteString(Achievement.Category); // Category
            base.WriteString(string.Empty);
            base.WriteInteger(TotalLevels); // Total amount of levels 
            base.WriteInteger(0);
        */

        const achievementId = serverPacket.popInt();
        const targetLevel = serverPacket.popInt();
        const targetName = serverPacket.popString();
        const progress = serverPacket.popInt();
        const pixelReward = serverPacket.popInt();
        const achievementRewardScore = serverPacket.popInt();
        const num0 = serverPacket.popInt();
        const currentProgress = serverPacket.popInt();
        const canSetTo100 = serverPacket.popBoolean();
        const category = serverPacket.popString();
        const string0 = serverPacket.popString();
        const totalLevelsAmount = serverPacket.popInt();
        const num1 = serverPacket.popInt();

    }
    
}
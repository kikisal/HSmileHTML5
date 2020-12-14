import PacketManager from "../../Net/Communication/PacketManager";
import AchievementProgressedMessageEvent from "../../Net/Communication/Packets/Inventory/Achievements/AchievementProgressedMessageEvent";
import AchievementScoreMessageEvent from "../../Net/Communication/Packets/Inventory/Achievements/AchievementScoreMessageEvent";
import BadgeDefinitionsMessageEvent from "../../Net/Communication/Packets/Inventory/Achievements/BadgeDefinitionsMessageEvent";
import AvatarEffectsMessageEvent from "../../Net/Communication/Packets/Inventory/AvatarEffects/AvatarEffectsMessageEvent";
import FigureSetIdsMessageEvent from "../../Net/Communication/Packets/Inventory/AvatarEffects/FigureSetIdsMessageEvent";
import IPacketEvent from "../../Net/Communication/Packets/IPacketEvent";

export class InventoryMessagesHandler {

    packet_manager: PacketManager;

    constructor(packet_manager: PacketManager) {
        this.packet_manager = packet_manager;

        this.initEvents();
    }


    initEvents(): void {
        this.packet_manager.addMessageEvent(new AvatarEffectsMessageEvent(), this.onAvatarEffectsMessageEvent.bind(this));
        this.packet_manager.addMessageEvent(new FigureSetIdsMessageEvent(), this.onFigureSetIdsMessageEvent.bind(this));
        this.packet_manager.addMessageEvent(new AchievementScoreMessageEvent(), this.onAchievemenetScoreMessageEvent.bind(this));
        this.packet_manager.addMessageEvent(new BadgeDefinitionsMessageEvent(), this.onBadgeDefinitionsMessageEvent.bind(this));
        this.packet_manager.addMessageEvent(new AchievementProgressedMessageEvent(), this.onAchievementProgressedMessageEvent.bind(this));
    }

    onAchievementProgressedMessageEvent(e: IPacketEvent): void {

    }

    onBadgeDefinitionsMessageEvent(e: IPacketEvent): void {

    }

    onAchievemenetScoreMessageEvent(e: IPacketEvent): void {

    }
    
    onFigureSetIdsMessageEvent(e: IPacketEvent):  void {

    }

    onAvatarEffectsMessageEvent(e: IPacketEvent): void {

    }

}
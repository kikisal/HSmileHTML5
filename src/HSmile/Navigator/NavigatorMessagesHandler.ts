import PacketManager from "../../Net/Communication/PacketManager";
import IPacketEvent from "../../Net/Communication/Packets/IPacketEvent";
import FavouritesMessageEvent from "../../Net/Communication/Packets/Navigator/FavouritesMessageEvent";
import NavigatorSettingsMessageEvent from "../../Net/Communication/Packets/Navigator/NavigatorSettingsMessageEvent";
import RoomRatingMessageEvent from "../../Net/Communication/Packets/Navigator/RoomRatingMessageEvent";

export class NavigatorMessagesHandler {

    packet_manager: PacketManager;

    constructor(packet_manager: PacketManager) {
        this.packet_manager = packet_manager;

        this.initEvents();
    }


    initEvents(): void {
        this.packet_manager.addMessageEvent(new FavouritesMessageEvent(), this.onFavouritesMessageEvent.bind(this));
        this.packet_manager.addMessageEvent(new NavigatorSettingsMessageEvent(), this.onNavigatorSettingsMessageEvent.bind(this));
        this.packet_manager.addMessageEvent(new RoomRatingMessageEvent(), this.onRoomRatingMessageEvent.bind(this));
    }

    onRoomRatingMessageEvent(e: IPacketEvent): void {

    }

    onNavigatorSettingsMessageEvent(e: IPacketEvent): void {

    }

    onFavouritesMessageEvent(e: IPacketEvent): void {

    }

}
import PacketManager from "../../Net/Communication/PacketManager";
import IPacketEvent from "../../Net/Communication/Packets/IPacketEvent";
import RoomPropertyMessageEvent from "../../Net/Communication/Packets/Room/Engine/RoomPropertyMessageEvent";
import CloseConnectionMessageEvent from "../../Net/Communication/Packets/Room/Session/CloseConnectionMessageEvent";
import OpenConnectionMessageEvent from "../../Net/Communication/Packets/Room/Session/OpenConnectionMessageEvent";
import RoomReadyMessageEvent from "../../Net/Communication/Packets/Room/Session/RoomReadyMessageEvent";

export default class RoomMessageHandler {

    packetManager: PacketManager;

    constructor(packetManager: PacketManager) {
        this.packetManager = packetManager;

        this.initEvents();
    }

    initEvents(): void {
        this.packetManager.addMessageEvent(new OpenConnectionMessageEvent(), this.onOpenConnectionMessage);
        this.packetManager.addMessageEvent(new CloseConnectionMessageEvent(), this.onCloseMessageEvent);
        this.packetManager.addMessageEvent(new RoomReadyMessageEvent(), this.onRoomReadyMessageEvent);
        this.packetManager.addMessageEvent(new RoomPropertyMessageEvent(), this.onRoomProperty);
    }
    
    onRoomProperty(e: IPacketEvent): void {

    }

    onRoomReadyMessageEvent(e: IPacketEvent): void {

    }

    onOpenConnectionMessage(e: IPacketEvent): void {
        
    }

    onCloseMessageEvent(e: IPacketEvent): void {

    }
}
import { HSmile } from "../../HSmileMain";
import Outcoming from "../../Net/Communication/Events/Outcoming";
import PacketManager from "../../Net/Communication/PacketManager";
import IPacketEvent from "../../Net/Communication/Packets/IPacketEvent";
import FloorHeightMapMessageEvent from "../../Net/Communication/Packets/Room/Engine/FloorHeightMapMessageEvent";
import FurnitureAliasesMessageEvent from "../../Net/Communication/Packets/Room/Engine/FurnitureAliasesMessageEvent";
import HeightMapMessageEvent from "../../Net/Communication/Packets/Room/Engine/HeightMapMessageEvent";
import RoomPropertyMessageEvent from "../../Net/Communication/Packets/Room/Engine/RoomPropertyMessageEvent";
import CloseConnectionMessageEvent from "../../Net/Communication/Packets/Room/Session/CloseConnectionMessageEvent";
import OpenConnectionMessageEvent from "../../Net/Communication/Packets/Room/Session/OpenConnectionMessageEvent";
import RoomReadyMessageEvent from "../../Net/Communication/Packets/Room/Session/RoomReadyMessageEvent";
import ClientMessage from "../../Net/Messages/ClientMessage";
import { IRoomCreator } from "./IRoomCreator";

export default class RoomMessageHandler {

    private packetManager: PacketManager;
    private initialConnection = true;
    private roomCreator: IRoomCreator;

    constructor(roomCreator: IRoomCreator, packetManager: PacketManager) {
        this.packetManager = packetManager;
        this.roomCreator = roomCreator;

        this.initEvents();
    }

    initEvents(): void {
        this.packetManager.addMessageEvent(new OpenConnectionMessageEvent(), this.onOpenConnectionMessage.bind(this));
        this.packetManager.addMessageEvent(new CloseConnectionMessageEvent(), this.onCloseMessageEvent.bind(this));
        this.packetManager.addMessageEvent(new RoomReadyMessageEvent(), this.onRoomReadyMessageEvent.bind(this));
        this.packetManager.addMessageEvent(new RoomPropertyMessageEvent(), this.onRoomProperty.bind(this));
        this.packetManager.addMessageEvent(new FurnitureAliasesMessageEvent(), this.onFurnitureAliases.bind(this));
        this.packetManager.addMessageEvent(new HeightMapMessageEvent(), this.onHeightMap.bind(this));
        this.packetManager.addMessageEvent(new FloorHeightMapMessageEvent(), this.onFloorHeightMapMessageEvent.bind(this));
    }

    onRoomProperty(e: IPacketEvent): void {

    }

    onFloorHeightMapMessageEvent(e: IPacketEvent): void {
        const parser = e as FloorHeightMapMessageEvent;
        


    }

    onHeightMap(e: IPacketEvent): void {
        const parser = e as HeightMapMessageEvent;

    }

    onRoomReadyMessageEvent(e: IPacketEvent): void {
        
        const packet = e as RoomReadyMessageEvent;

        const roomType = packet.roomType;
        const roomId = packet.roomId;

        const hsmile = HSmile.get();
        const conn = hsmile.socketManager;

        if ( this.initialConnection )
        {
            conn.Send(new ClientMessage(Outcoming.GetFurnitureAliasesMessageEvent));
            this.initialConnection = false;
        } else {

            // get room data.
            conn.Send(new ClientMessage(Outcoming.GetRoomEntryDataMessageEvent));    
        }
    }

    onFurnitureAliases(e: IPacketEvent): void {
        const hsmile = HSmile.get();
        const conn = hsmile.socketManager;
        conn.Send(new ClientMessage(Outcoming.GetRoomEntryDataMessageEvent));
    }

    onOpenConnectionMessage(e: IPacketEvent): void {
        
    }

    onCloseMessageEvent(e: IPacketEvent): void {

    }
}
import Incoming from "../../Net/Communication/Events/Incoming";
import PacketManager from "../../Net/Communication/PacketManager";
import AuthenticationOKMessageEvent from "../../Net/Communication/Packets/Handshake/AuthenticationOKMessageEvent";
import AvailabilityStatusMessageEvent from "../../Net/Communication/Packets/Handshake/AvailabilityStatusMessageEvent";
import PongMessage from "../../Net/Communication/Packets/Handshake/PongMessageEvent";
import UserRightsMessageEvent from "../../Net/Communication/Packets/Handshake/UserRightsMessageEvent";
import IPacketEvent from "../../Net/Communication/Packets/IPacketEvent";

export default class HSmileCommunicationHandler {
    packetManager: PacketManager;
    
    constructor(packetManager: PacketManager) {
        this.packetManager = packetManager;
        
        this.initPackets();
    }

    initPackets(): void {
        this.packetManager.addMessageEvent(new AuthenticationOKMessageEvent(), this.onAuthenticationOKMessageEvent);
        this.packetManager.addMessageEvent(new PongMessage(), this.onPongMessageEvent);
        this.packetManager.addMessageEvent(new UserRightsMessageEvent(), this.onUserRightsMessageEvent);
        this.packetManager.addMessageEvent(new AvailabilityStatusMessageEvent(), this.onAvailabilityStatusMessageEvent);
    }

    onAvailabilityStatusMessageEvent(e: IPacketEvent): void {

    }

    onUserRightsMessageEvent(e: IPacketEvent): void {

    }

    
    onPongMessageEvent(e: IPacketEvent): void {

    }

    onAuthenticationOKMessageEvent(e: IPacketEvent): void {

    }
}
import IServerMessage from "../Messages/IServerMessage";
import Incoming from "./Events/Incoming";
import AuthenticationOKMessageEvent from "./Packets/Handshake/AuthenticationOKMessageEvent";
import PongMessage from "./Packets/Handshake/PongMessageEvent";
import AvatarEffectsMessageEvent from "./Packets/Inventory/AvatarEffects/AvatarEffectsMessageEvent";
import IPacketEvent from "./Packets/IPacketEvent";
import FavouritesMessageEvent from "./Packets/Navigator/FavouritesMessageEvent";
import NavigatorSettingsMessageEvent from "./Packets/Navigator/NavigatorSettingsMessageEvent";
import FigureSetIdsMessageEvent from "./Packets/Inventory/AvatarEffects/FigureSetIdsMessageEvent";
import UserRightsMessageEvent from "./Packets/Handshake/UserRightsMessageEvent";
import AvailabilityStatusMessageEvent from "./Packets/Handshake/AvailabilityStatusMessageEvent";

type PacketMap = {
    id: number;
    packetEvent: IPacketEvent;
};

export default class PacketManager {

    packetList: PacketMap[] = [];

    constructor() {
        this.initPackets();
    }

    initPackets(): void {
        this.registerHandshakePackets();
        this.registerInventory();
        this.registerNavigator();
    }

    registerPacket(id: number, packetEvent: IPacketEvent): void {
        this.packetList.push({id: id, packetEvent: packetEvent});
    }

    registerNavigator(): void {
        this.registerPacket(Incoming.NavigatorSettingsMessageComposer, new NavigatorSettingsMessageEvent());
        this.registerPacket(Incoming.FavouritesMessageComposer, new FavouritesMessageEvent());
    }

    registerHandshakePackets(): void {
        this.registerPacket(Incoming.AuthenticationOKMessageComposer, new AuthenticationOKMessageEvent());
        this.registerPacket(Incoming.PongMessageComposer, new PongMessage());
        this.registerPacket(Incoming.UserRightsMessageComposer, new UserRightsMessageEvent());
        this.registerPacket(Incoming.AvailabilityStatusMessageComposer, new AvailabilityStatusMessageEvent());
    }

    registerInventory(): void {
        this.registerPacket(Incoming.AvatarEffectsMessageComposer, new AvatarEffectsMessageEvent());
        this.registerPacket(Incoming.FigureSetIdsMessageComposer, new FigureSetIdsMessageEvent());
    }

    getPacket(id: number): IPacketEvent | null {
        for ( let i = 0; i < this.packetList.length; ++i ) {
            if ( this.packetList[i].id === id )
                return this.packetList[i].packetEvent;
        }

        return null;
    }

    execute( id: number, serverMessage: IServerMessage ): void {
        const packet = this.getPacket(id);
        if ( !packet )
            throw new Error(`could not find packet id: ${id}`);
        
        if ( true ) { // debug === true
            console.log("Handling packet: ", packet.name || 'Unknown', id);
        }

        packet.Parse(serverMessage);        
    }
}
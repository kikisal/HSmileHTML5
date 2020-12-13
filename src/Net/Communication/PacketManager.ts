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
import AchievementScoreMessageEvent from "./Packets/Inventory/Achievements/AchievementScoreMessageEvent";
import HabboClubSubscriptionMessageEvent from "./Packets/Users/HabboClubSubscriptionMessageEvent";
import BuildersClubMembershipMessageEvent from "./Packets/BuildersClub/BuildersClubMembershipMessageEvent";
import CfhTopicsInitMessageEvent from "./Packets/Moderation/CfhTopicsInitMessageEvent";
import BadgeDefinitionsMessageEvent from "./Packets/Inventory/Achievements/BadgeDefinitionsMessageEvent";
import SoundSettingsMessageEvent from "./Packets/Sound/SoundSettingsMessageEvent";
import NuxAlertMessageEvent from "./Packets/LandingView/NuxAlertMessageEvent";
import AchievementProgressedMessageEvent from "./Packets/Inventory/Achievements/AchievementProgressedMessageEvent";
import CloseConnectionMessageEvent from "./Packets/Room/Session/CloseConnectionMessageEvent";
import OpenConnectionMessageEvent from "./Packets/Room/Session/OpenConnectionMessageEvent";
import RoomReadyMessageEvent from "./Packets/Room/Session/RoomReadyMessageEvent";
import RoomPropertyMessageEvent from "./Packets/Room/Engine/RoomPropertyMessageEvent";
import RoomRatingMessageEvent from "./Packets/Navigator/RoomRatingMessageEvent";

type PacketMap = {
    id: number;
    packetEvent: IPacketEvent;
    callback?: PacketCallback
};

type PacketCallback = (e: IPacketEvent) => void;

export default class PacketManager {

    packetList: PacketMap[] = [];

    constructor() {
        this.initPackets();
    }

    initPackets(): void {
        /*
       
        this.registerInventory();
        this.registerNavigator();

        this.registerUsers();
        this.registerBuildersClub();
        this.registerModeration();
        this.registerSound();
        this.registerLandingView();
        */
    }
/*
 

    registerLandingView(): void {
        this.registerPacket(Incoming.NuxAlertMessageComposer, new NuxAlertMessageEvent());
    }

    registerSound(): void {
        this.registerPacket(Incoming.SoundSettingsMessageComposer, new SoundSettingsMessageEvent());
    }

    registerModeration(): void {
        this.registerPacket(Incoming.CfhTopicsInitMessageComposer, new CfhTopicsInitMessageEvent());
    }
    
    registerNavigator(): void {
        this.registerPacket(Incoming.NavigatorSettingsMessageComposer, new NavigatorSettingsMessageEvent());
        this.registerPacket(Incoming.FavouritesMessageComposer, new FavouritesMessageEvent());
        this.registerPacket(Incoming.RoomRatingMessageComposer, new RoomRatingMessageEvent());
    }


    registerInventory(): void {
        this.registerPacket(Incoming.AvatarEffectsMessageComposer, new AvatarEffectsMessageEvent());
        this.registerPacket(Incoming.FigureSetIdsMessageComposer, new FigureSetIdsMessageEvent());
        this.registerPacket(Incoming.AchievementScoreMessageComposer, new AchievementScoreMessageEvent());
        this.registerPacket(Incoming.BadgeDefinitionsMessageComposer, new BadgeDefinitionsMessageEvent());
        this.registerPacket(Incoming.AchievementProgressedMessageComposer, new AchievementProgressedMessageEvent());
    }

    registerUsers(): void {
       // same packet id number as BuildersClubMembershipMessageComposer
       // this.registerPacket(Incoming.HabboClubSubscriptionComposer, new HabboClubSubscriptionMessageEvent());
    }

    registerBuildersClub(): void {
        this.registerPacket(Incoming.BuildersClubMembershipMessageComposer, new BuildersClubMembershipMessageEvent());    
    }
*/
    addMessageEvent(packetId: IPacketEvent, callback: PacketCallback): void {
        this.registerPacket(packetId, callback);
    }

    getPacket(id: number): PacketMap | null {
        for ( let i = 0; i < this.packetList.length; ++i ) {
            if ( this.packetList[i].id === id )
                return this.packetList[i];
        }

        return null;
    }

    execute( id: number, serverMessage: IServerMessage ): void {
        const packet = this.getPacket(id);
        if ( !packet )
            throw new Error(`could not find packet id: ${id}`);
        
        if ( true ) // debug === true
            console.log("Handling packet: ", packet.packetEvent.name || 'Unknown', id);

        packet.packetEvent.Parse(serverMessage);
        if ( packet.callback )
            packet.callback(packet.packetEvent);
    }

    
    registerPacket(packetEvent: IPacketEvent, callback?: PacketCallback): void {
        this.packetList.push({
            id: packetEvent.packetId, 
            packetEvent: packetEvent, 
            callback: callback
        });
    }
}
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
import CloseConnectionMessageEvent from "./Packets/Rooms/Session/CloseConnectionMessageEvent";
import OpenConnectionMessageEvent from "./Packets/Rooms/Session/OpenConnectionMessageEvent";

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

        this.registerUsers();
        this.registerBuildersClub();
        this.registerModeration();
        this.registerSound();
        this.registerLandingView();
        this.registerRoom();
    }

    registerRoom(): void {
        this.registerPacket(Incoming.OpenConnectionMessageComposer, new OpenConnectionMessageEvent());
        this.registerPacket(Incoming.CloseConnectionMessageComposer, new CloseConnectionMessageEvent());

    }

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

    
    registerPacket(id: number, packetEvent: IPacketEvent): void {
        this.packetList.push({id: id, packetEvent: packetEvent});
    }
}
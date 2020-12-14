import { HSmile } from "../../HSmileMain";
import BuildersClubMembershipMessageEvent from "../../Net/Communication/Packets/Catalog/BuildersClubMembershipMessageEvent";
import IPacketEvent from "../../Net/Communication/Packets/IPacketEvent";

export default class HSmileCatalog {
    constructor() {
        this.initEvents();
    }

    initEvents(): void {
        const app = HSmile.get();

        const pm = app.socketManager.packetManager;

        pm.addMessageEvent(new BuildersClubMembershipMessageEvent(), this.onBuildersClubMembershipMessageEvent.bind(this));
    }

    onBuildersClubMembershipMessageEvent(e: IPacketEvent): void {
        
    }
    
}
import { HSmile } from "../../HSmileMain";
import IPacketEvent from "../../Net/Communication/Packets/IPacketEvent";
import SoundSettingsMessageEvent from "../../Net/Communication/Packets/Sound/SoundSettingsMessageEvent";
import NuxAlertMessageEvent from "../../Net/Communication/Packets/Users/NuxAlertMessageEvent";

export default class SessionDataManager {
    constructor() {

        this.initEvents();
    }

    initEvents(): void {
        const app = HSmile.get();
        const pm = app.socketManager.packetManager;

        pm.addMessageEvent(new NuxAlertMessageEvent(), this.onNuxAlertMessageEvent.bind(this));
        pm.addMessageEvent(new SoundSettingsMessageEvent(), this.onSoundSettingsMessageEvent.bind(this));
    }

    onSoundSettingsMessageEvent(e: IPacketEvent): void {
        console.log('from session data.', this);
    }

    onNuxAlertMessageEvent(e: IPacketEvent): void {

    }
}
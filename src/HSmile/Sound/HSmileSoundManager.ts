import { HSmile } from "../../HSmileMain";
import IPacketEvent from "../../Net/Communication/Packets/IPacketEvent";
import SoundSettingsMessageEvent from "../../Net/Communication/Packets/Sound/SoundSettingsMessageEvent";

export default class HSmileSoundManager {
    constructor() {

        this.initEvents();
    }

    initEvents(): void {
        const app = HSmile.get();
        const pm = app.socketManager.packetManager;

        pm.addMessageEvent(new SoundSettingsMessageEvent(), this.onNewSoundSettingsMessageEvent.bind(this));
    }

    onNewSoundSettingsMessageEvent(e: IPacketEvent): void {

    }
}
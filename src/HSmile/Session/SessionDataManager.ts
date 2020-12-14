import Component from "../../Core/Runtime/Component";
import IContext from "../../Core/Runtime/IContext";
import IUpdateReceiver from "../../Core/Runtime/IUpdateReceiver";
import { HSmile } from "../../HSmileMain";
import IPacketEvent from "../../Net/Communication/Packets/IPacketEvent";
import SoundSettingsMessageEvent from "../../Net/Communication/Packets/Sound/SoundSettingsMessageEvent";
import NuxAlertMessageEvent from "../../Net/Communication/Packets/Users/NuxAlertMessageEvent";

export default class SessionDataManager extends Component {
    constructor(context: IContext) {
        super(context);
 

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
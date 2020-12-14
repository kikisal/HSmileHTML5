import { HSmile } from "../../HSmileMain";
import CfhTopicsInitMessageEvent from "../../Net/Communication/Packets/Moderation/CfhTopicsInitMessageEvent";

export default class ModerationMessageHandler {
    constructor() {
        this.initEvents();
    }

    initEvents(): void {
        const app = HSmile.get();
        const pm = app.socketManager.packetManager;

        pm.addMessageEvent(new CfhTopicsInitMessageEvent(), this.onCfhTopicsInitMessageEvent.bind(this));
    }

    onCfhTopicsInitMessageEvent(): void {

    }
}
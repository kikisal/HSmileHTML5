import ModerationMessageHandler from "./ModerationMessageHandler";

export default class Moderation {
    moderationMessageHandler: ModerationMessageHandler;
    
    constructor() {
        this.moderationMessageHandler = new ModerationMessageHandler();
    }
}
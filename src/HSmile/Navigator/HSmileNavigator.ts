import { HSmile } from "../../HSmileMain";
import { NavigatorMessagesHandler } from "./NavigatorMessagesHandler";

export default class HSmileNavigator {
    
    messagesHandler: NavigatorMessagesHandler;

    constructor() {
        const app = HSmile.get();
        this.messagesHandler = new NavigatorMessagesHandler(app.socketManager.packetManager);
        
    }
}
import { HSmile } from "../../HSmileMain";
import { InventoryMessagesHandler } from "./InventoryMessagesHandler";

export default class HSmileInventory {
    
    messagesHandler: InventoryMessagesHandler;

    constructor() {
        const app = HSmile.get();
        this.messagesHandler = new InventoryMessagesHandler(app.socketManager.packetManager);
        
    }
}
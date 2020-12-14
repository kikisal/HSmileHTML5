import Component from "../../Core/Runtime/Component";
import IContext from "../../Core/Runtime/IContext";
import { HSmile } from "../../HSmileMain";
import { InventoryMessagesHandler } from "./InventoryMessagesHandler";

export default class HSmileInventory extends Component {
    
    messagesHandler: InventoryMessagesHandler;

    constructor(context: IContext) {
        super(context);
        
        const app = HSmile.get();
        this.messagesHandler = new InventoryMessagesHandler(app.socketManager.packetManager);
        
    }
}
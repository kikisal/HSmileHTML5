import Component from "../../Core/Runtime/Component";
import IContext from "../../Core/Runtime/IContext";
import { HSmile } from "../../HSmileMain";
import { NavigatorMessagesHandler } from "./NavigatorMessagesHandler";

export default class HSmileNavigator extends Component {
    
    messagesHandler: NavigatorMessagesHandler;

    constructor(context: IContext) {
        super(context);
        
        const app = HSmile.get();
        this.messagesHandler = new NavigatorMessagesHandler(app.socketManager.packetManager);
        
    }
}
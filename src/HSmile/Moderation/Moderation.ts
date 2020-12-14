import Component from "../../Core/Runtime/Component";
import IContext from "../../Core/Runtime/IContext";
import ModerationMessageHandler from "./ModerationMessageHandler";

export default class Moderation extends Component {
    moderationMessageHandler: ModerationMessageHandler;
    
    constructor(context: IContext) {
        super(context);
        
        this.moderationMessageHandler = new ModerationMessageHandler();
    }
}
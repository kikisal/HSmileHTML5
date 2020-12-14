import Component from "../../Core/Runtime/Component";
import IContext from "../../Core/Runtime/IContext";
import { HSmile } from "../../HSmileMain";
import HSmileCommunicationHandler from "./HSmileCommunicationHandler";

export default class HSmileCommunication extends Component {

    hsmileCommunicationHandler: HSmileCommunicationHandler;

    constructor(context: IContext) {
        super(context);
        
        const hsmile = HSmile.get();

        this.hsmileCommunicationHandler = new HSmileCommunicationHandler(hsmile.socketManager.packetManager);
    }
}
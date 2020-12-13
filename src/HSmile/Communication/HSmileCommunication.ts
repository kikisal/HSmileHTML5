import { HSmile } from "../../HSmileMain";
import HSmileCommunicationHandler from "./HSmileCommunicationHandler";

export default class HSmileCommunication {

    hsmileCommunicationHandler?: HSmileCommunicationHandler;

    constructor() {
        const hsmile = HSmile.get();

        this.hsmileCommunicationHandler = new HSmileCommunicationHandler(hsmile.socketManager.packetManager);
    }
}
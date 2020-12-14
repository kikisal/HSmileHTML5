import HSmileCatalog from "./HSmile/Catalog/HSmileCatalog";
import HSmileCommunication from "./HSmile/Communication/HSmileCommunication";
import HSmileInventory from "./HSmile/Inventory/HSmileInvetory";
import Moderation from "./HSmile/Moderation/Moderation";
import HSmileNavigator from "./HSmile/Navigator/HSmileNavigator";
import { RoomEngine } from "./HSmile/Room/RoomEngine";
import SessionDataManager from "./HSmile/Session/SessionDataManager";
import HSmileSoundManager from "./HSmile/Sound/HSmileSoundManager";


export default class Game {

    sessionDataManager?: SessionDataManager;
    hsmileNavigator?: HSmileNavigator;
    roomEngine?: RoomEngine;
    hsmileCommunication?: HSmileCommunication;
    catalog?: HSmileCatalog;
    inventory?: HSmileInventory;
    moderation?: Moderation;
    sound?: HSmileSoundManager;

    constructor() {
        
    }

    init(): void {
        this.sessionDataManager = new SessionDataManager();
        this.hsmileNavigator = new HSmileNavigator();
        this.roomEngine = new RoomEngine();
        this.hsmileCommunication = new HSmileCommunication();
        this.inventory = new HSmileInventory();
        this.catalog = new HSmileCatalog();
        this.sound = new HSmileSoundManager();
        this.moderation = new Moderation();
    }

    gameLoop(): void {
        
        
    }
}
import HSmileCatalog from "./HSmile/Catalog/HSmileCatalog";
import HSmileCommunication from "./HSmile/Communication/HSmileCommunication";
import HSmileInventory from "./HSmile/Inventory/HSmileInvetory";
import Moderation from "./HSmile/Moderation/Moderation";
import HSmileNavigator from "./HSmile/Navigator/HSmileNavigator";
import { RoomEngine } from "./HSmile/Room/RoomEngine";
import SessionDataManager from "./HSmile/Session/SessionDataManager";
import HSmileSoundManager from "./HSmile/Sound/HSmileSoundManager";
import ComponentHandler from "./Core/Runtime/ComponentHandler";
import IContext from "./Core/Runtime/IContext";
import GameContext from "./GameContext";


export default class Game {


    componentHandler: ComponentHandler;
    
    coreContext?: GameContext;

    constructor() {
        this.componentHandler = new ComponentHandler();
    }

    setContext(context: GameContext): void {
        this.coreContext = context;
    }

    init(): void {

        if ( !this.coreContext )
            throw new Error('context was undefined.');

        this.componentHandler.add(new HSmileCommunication(this.coreContext));
        this.componentHandler.add(new SessionDataManager(this.coreContext));
        this.componentHandler.add(new HSmileNavigator(this.coreContext));
        this.componentHandler.add(new RoomEngine(this.coreContext));
        this.componentHandler.add(new HSmileInventory(this.coreContext));
        this.componentHandler.add(new HSmileCatalog(this.coreContext));
        this.componentHandler.add(new HSmileSoundManager(this.coreContext));
        this.componentHandler.add(new Moderation(this.coreContext));
    }

    gameLoop(): void {
        if (this.coreContext)
            this.coreContext?.gameLoop();
    }
}
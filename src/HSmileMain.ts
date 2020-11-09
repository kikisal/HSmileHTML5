import * as PIXI from 'pixi.js';
import { DOM } from './DOM/Utility';
import { Room } from './RoomEngine/Room';
import RoomModel from './RoomEngine/RoomModel';


export class HSmile {
    // any. Typically we excpect the input to come 
    // from a client call ran into a browser.

    public app: PIXI.Application | undefined;
    private static instance: HSmile | undefined;
    private keys: object = {};
    private room: Room | undefined;

    init(): void {

        const app = this.app;

        if ( !app )
            return;

        
        // preload assets

        app.loader.baseUrl = 'assets';
        
        app.loader
            .add('room_tiles', 'room-basic/tiles/sprites.json');



        app.loader.onProgress.add(this.onProgressResourceLoader.bind(this));
        app.loader.onComplete.add(this.onResourceLoaded.bind(this));
        app.loader.onError.add(this.resourceLoadingError.bind(this));

        app.loader.load();

        this.eventsInit();
    }

    resourceLoadingError(e: any): void {
        console.error('there were an error in loading resource: ', e.message);
    }

    onResourceLoaded(e: any): void {
        const app = this.app!;
        

     
        // player object
        /*
        const player = PIXI.Sprite.from(app.loader.resources.sprite09.texture);
        
        player.anchor.set(0.5);
        player.x = 16;
        player.y =  app.view.height / 2;
   
        app.stage.addChild(player);
          */
         

        this.room = new Room(app.stage, RoomModel.default6x6());

        app.ticker.add(this.gameLoop.bind(this));
    }   

    onProgressResourceLoader(e: any): void {
        console.log('progressing loading resources: ', e.progress);
    }

    gameLoop(): void {
        
    }

    eventsInit(): void {
        window.addEventListener('keydown', this.keyDown.bind(this));
        window.addEventListener('keyup', this.keyDown.bind(this));
    }

    keyDown(e: any): void {
        (<any>this.keys)[e.keyCode] = true;
    }

    keyUp(e: any): void {
        (<any>this.keys)[e.keyCode] = false;
    }



    static get(): HSmile {
        if (!HSmile.instance)
            HSmile.instance = new HSmile();

        return HSmile.instance;
    }

    setApp(app: PIXI.Application) {
        this.app = app;
    }

    static HSmileMain(init_tag: any ): never | HSmile | void {
        if ( !init_tag )
            throw `tag main cannot be nor null neither undefined.`;

        let viewOut = null;

        if ( !(viewOut = DOM.Utility.getElement(init_tag)) ) 
            throw `tag ${init_tag} not in dom tree.`;
        
        let app: PIXI.Application;
        try {
            app  = new PIXI.Application(
                {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    backgroundColor: 0x000000,
                    antialias: true,
                    autoDensity: true,
                    resolution: 1
                }
            );    
            
            
            viewOut.appendChild(app.view);

            const hsmile = HSmile.get();

            hsmile.setApp(app);
            hsmile.init();
            return hsmile;
        } catch ( ex ) {
            // handle error webgl.
            throw ex;
        }
        

    }
}

(<any>window).HSmile = (<any>window).HSmile || HSmile;
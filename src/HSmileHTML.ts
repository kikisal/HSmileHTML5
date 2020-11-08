import * as PIXI from 'pixi.js';
import { DOM } from './DOM/Utility';



export class HSmile {
    // any. Typically we excpect the input to come 
    // from a client call ran into a browser.

    private app: PIXI.Application | undefined;
    private static instance: HSmile | undefined;


    init(): void {

        const app = this.app;

        if ( !app )
            return;

        

        const player = PIXI.Sprite.from('assets/images/player.png');
        player.anchor.set(0.5);
        player.x = app.view.width / 2;
        player.y =  app.view.height / 2;

        app.stage.addChild(player);
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
                    width: 800,
                    height: 600,
                    backgroundColor: 0x000000
                }
            );    
            
            
            viewOut.appendChild(app.view);

            const hsmile = new HSmile();
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
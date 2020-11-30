import * as PIXI from 'pixi.js';
import { DOM } from './DOM/Utility';
import ImageJsonParser from './Resource/parser/ImageJsonParser';
import ResourceParser from './Resource/parser/ResourceParser';

import ResourceManagerImage, { ImageResource } from './Resource/ResourceManagerImage';
import { Room } from './RoomEngine/Room';
import RoomModel from './RoomEngine/RoomModel';


export class HSmile {
    // any. Typically we excpect the input to come 
    // from a client call ran into a browser.

    app: PIXI.Application | undefined;
    
    private static instance: HSmile | undefined;
    private keys: object = {};
    private room: Room | undefined;
    private resourceImageManager: ResourceManagerImage<HTMLImageElement>;

    constructor() {
        this.resourceImageManager = new ResourceManagerImage(new ImageJsonParser());
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        window.addEventListener('resize', this.resize.bind(this));
    }

    resize() {
        const app = this.app!;
        app.renderer.resize(window.innerWidth, window.innerHeight);
    }

    init(): void {
        const app = this.app;

        if ( !app )
            return;

            
        this.resourceImageManager.onProgress.add(this.onProgressResourceLoader.bind(this));
        this.resourceImageManager.onComplete.add(this.onResourceLoaded.bind(this));
        this.resourceImageManager.onError.add(this.resourceLoadingError.bind(this));


        this.resourceImageManager.preload();
       
        this.eventsInit();
    }

    resourceLoadingError(e: any): void {
        console.error('there was an error in loading resource: ', e);
    }

    onResourceLoaded(e: any): void {
        const app = this.app!;
        // HSMile risorse hs_human_body + suoni caricate
        // ora stabilisci connessione con emu... [DA FARE]

        // ...
        // ... emu connections, start receiveing events from it


        this.room = new Room(app.stage, RoomModel.default13x8());

        
        // game loop
        app.ticker.add(this.gameLoop.bind(this));

    }   

    onProgressResourceLoader(e: any): void {
        console.log(e);
    }

    gameLoop(): void {
        this.room?.update();
        this.room?.draw();
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

    getResourceImageManager(): ResourceManagerImage<HTMLImageElement> {
        return this.resourceImageManager;
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
                    backgroundColor: 0xECEAE0,
                    antialias: false,
                    autoDensity: true,
                    resolution: window.devicePixelRatio || 1,
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
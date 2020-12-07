import * as PIXI from 'pixi.js';
import { DOM } from './DOM/Utility';
import Game from './Game';
import Outcoming from './Net/Communication/Events/Outcoming';
import ConnectionHandler from './Net/Handler/ConnectionHandler';
import ClientMessage from './Net/Messages/ClientMessage';
import SocketManager from './Net/SocketManager';
import ImageJsonParser from './Resource/parser/ImageJsonParser';
import ResourceParser from './Resource/parser/ResourceParser';

import ResourceManagerImage, { ImageResource } from './Resource/ResourceManagerImage';
import { Room } from './HSmile/Room/Room';
import RoomModel from './HSmile/Room/RoomEngine/RoomModel';

type MousePosition = {
    x?: number;
    y?: number;
    down?: boolean;
}

export class HSmile {
    // any. Typically we excpect the input to come 
    // from a client call ran into a browser.

    app: PIXI.Application | undefined;

    keys: object = {};
    static mouse: MousePosition = {down: false};
    
    private static instance: HSmile | undefined;


    resourceImageManager: ResourceManagerImage<HTMLImageElement>;
    socketManager: SocketManager;
    game: Game;




    constructor() {
        this.resourceImageManager = new ResourceManagerImage(new ImageJsonParser());
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        window.addEventListener('resize', this.resize.bind(this));

        this.game = new Game();
        this.socketManager = new SocketManager("ws://localhost:30000/");
        this.socketManager.setCallBack(new ConnectionHandler());
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
        // ora stabilisci connessione con emu... 


        this.socketManager.init();

        

        // ...
        // ... emu connections, start receiveing events from it


        //this.room = new Room(app.stage, RoomModel.default13x8());

        
        // game loop
        app.ticker.add(this.gameLoop.bind(this));

    }   

    onProgressResourceLoader(e: any): void {
        console.log(e);
    }

    gameLoop(): void {
       this.game.gameLoop();
    }

    eventsInit(): void {
        window.addEventListener('keydown', this.keyDown.bind(this));
        window.addEventListener('keyup', this.keyDown.bind(this));

        window.addEventListener('mousemove', this.mouseMove.bind(this));
        window.addEventListener('mousedown', this.mouseDown.bind(this));
        window.addEventListener('mouseup', this.mouseUp.bind(this));
    }

    mouseMove(e: any): void {
        HSmile.mouse.x = e.clientX;
        HSmile.mouse.y = e.clientY;
    }

    mouseUp(e: any): void {
        HSmile.mouse.down = false;
    }

    mouseDown(e: any): void {
        HSmile.mouse.down = true;
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
                    backgroundColor: 0x000000,
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
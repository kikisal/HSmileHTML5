import * as PIXI from 'pixi.js';
import { HSmile } from '../HSmileMain';

export default class RoomGraphics {


    static makeRightWallGraphics(height: number,  thickness: number = 6, mustDrawRightFace: boolean = true): PIXI.Container {
        const app = HSmile.get().app!;

        let wallStage = new PIXI.Container();

        let leftWallFace = new PIXI.Graphics();


        leftWallFace.beginFill(0xB6B9C8);
        leftWallFace.drawRect(0, 0, height, 36);
        leftWallFace.endFill(); 
        leftWallFace.skew.x = 1.1;
        leftWallFace.skew.y = 1.57;

        let rightWallFace = new PIXI.Graphics();
        
        if ( mustDrawRightFace ) {
            rightWallFace.beginFill(0x90929E);
            rightWallFace.drawRect(0, 0, height, thickness);
            rightWallFace.endFill();
            rightWallFace.position.y = height + 16;
            rightWallFace.position.x = 24 + thickness;
            rightWallFace.skew.x = 0.5;
            rightWallFace.skew.y = 0;
            rightWallFace.rotation = -Math.PI / 2;
        }
       

        let topWallFace = new PIXI.Graphics();

        topWallFace.beginFill(0x70727A);
        topWallFace.drawRect(0, 0, thickness, 40);
        topWallFace.endFill();

        topWallFace.endFill();
      //  topWallFace.position.y = height + 16;
      //  topWallFace.position.x = 24 + thickness;
        topWallFace.skew.x = 0;
        topWallFace.skew.y = 1.1;
        topWallFace.rotation =  -0.5;
     
        wallStage.addChild(leftWallFace);
        wallStage.addChild(rightWallFace);
        wallStage.addChild(topWallFace);

        // set the origin
        wallStage.position.set(0, -height - 15);
        return wallStage;
    }

    /**
     * 
     * @deprecated
     */
    static makeRightWall(height: number): PIXI.Texture {
        const tempCanvas = document.createElement('canvas');
        const ctx = tempCanvas.getContext("2d");

        tempCanvas.width = 40;
        tempCanvas.height = 24 + height;

        

        if (ctx != null) {

            const points = [
                {
                    x: 8,
                    y: 0
                },
                {
                    x: 40,
                    y: 16
                },
                {
                    x: 32,
                    y: 20
                },
                {
                    x: 0,
                    y: 4
                }
            ];

           
            ctx.strokeStyle = '#70727a';
            ctx.fillStyle = '#70727a';
            ctx.beginPath();
            ctx.moveTo(points[0].x - 1, points[0].y);
            ctx.lineTo(points[1].x - 1, points[1].y);
            ctx.lineTo(points[2].x - 1, points[2].y);
            ctx.lineTo(points[3].x - 1, points[3].y);
            ctx.lineTo(points[0].x - 1, points[0].y);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();


            if (height > 0) {
               // ctx.strokeStyle = 'red';
                ctx.fillStyle = '#90929e';
                
                ctx.beginPath();
                ctx.moveTo(points[1].x - 1, points[1].y);
                ctx.lineTo(points[1].x - 1, points[1].y + height + 1);
                ctx.lineTo(points[2].x - 1, points[2].y + height + 1);
                ctx.lineTo(points[2].x - 1, points[2].y);
                ctx.closePath();
             //   ctx.stroke();
                ctx.fill();

            //    ctx.strokeStyle = '#b6b9c8';
                ctx.fillStyle = '#b6b9c8';
                ctx.beginPath();
                ctx.moveTo(points[3].x, points[3].y);
                ctx.lineTo(points[3].x, points[3].y + height);
                ctx.lineTo(points[2].x, points[2].y + height);
                ctx.lineTo(points[2].x, points[2].y);
                ctx.closePath();
               // ctx.stroke();
                ctx.fill();
            }

        }

        let baseTexture = new PIXI.BaseTexture(tempCanvas);
        baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        console.log(tempCanvas.toDataURL('image/png'));

        return new PIXI.Texture(baseTexture);
    }

    

   /**
    * 
     * 
     * @deprecated
     */
    static makeLeftWall(height: number): PIXI.Texture {
        const tempCanvas = document.createElement('canvas');
        const ctx = tempCanvas.getContext("2d");

        tempCanvas.width = 40;
        tempCanvas.height = 24 + height;

        if (ctx != null) {

            const points = [
                {
                    x: 32,
                    y: 0
                },
                {
                    x: 0,
                    y: 16
                },
                {
                    x: 8,
                    y: 20
                },
                {
                    x: 40,
                    y: 4
                }
            ];

            ctx.strokeStyle = '#70727a';
            ctx.fillStyle = '#70727a';
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            ctx.lineTo(points[1].x, points[1].y);
            ctx.lineTo(points[2].x, points[2].y);
            ctx.lineTo(points[3].x, points[3].y);
            ctx.lineTo(points[0].x, points[0].y);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();


            if (height > 0) {
            //    ctx.strokeStyle = '#bbbecd';
                ctx.fillStyle = '#bbbecd';
                ctx.beginPath();
                ctx.moveTo(points[1].x - .3, points[1].y);
                ctx.lineTo(points[1].x - .3, points[1].y + height);
                ctx.lineTo(points[2].x - .3, points[2].y + height);
                ctx.lineTo(points[2].x - .3, points[2].y);
                ctx.closePath();
               // ctx.stroke();
                ctx.fill();


                ctx.strokeStyle = '#90929e';
                ctx.fillStyle = '#90929e';
                ctx.beginPath();
                ctx.moveTo(points[3].x, points[3].y);
                ctx.lineTo(points[3].x, points[3].y + height);
                ctx.lineTo(points[2].x, points[2].y + height);
                ctx.lineTo(points[2].x, points[2].y);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
            }
        }

        return new PIXI.Texture(new PIXI.BaseTexture(tempCanvas));
    }
}
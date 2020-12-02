import * as PIXI from 'pixi.js';
import { HSmile } from '../HSmileMain';

export default class RoomGraphics {

        

    static setPixel(imgData: any, width: number, x: number, y: number) {
        const n = (y * width + x)*4;

        imgData[n]=255;
        imgData[n+1]=0;
        imgData[n+2]=0;
        imgData[n+3]=255;
    }

    // Refer to: http://rosettacode.org/wiki/Bitmap/Bresenham's_line_algorithm#JavaScript
    static bline(canvas: HTMLCanvasElement, imgData: any, x0: number, y0: number, x1: number, y1: number) {
        const dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
        const dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1; 
        var err = (dx>dy ? dx : -dy)/2;        
        while (true) {
            
            RoomGraphics.setPixel(imgData, canvas.width, x0, y0);

            if (x0 === x1 && y0 === y1) break;
            var e2 = err;
            if (e2 > -dx) { err -= dy; x0 += sx; }
            if (e2 < dy) { err += dx; y0 += sy; }
        }
    }

    static flipImage(img: HTMLCanvasElement | HTMLImageElement): HTMLCanvasElement | null {
        let element = document.createElement('canvas');
        let c = element.getContext("2d");
        if (c == null)
            return null;

        let width = img.width;
        let height = img.height;
        element.width = width;
        element.height = height;

        c.save();
        c.scale(-1, 1);
        c.drawImage(img, 0, 0, width * -1, height);
        c.restore();

        return element;
    }

    static makeStair(strokeColor: string, floorColor: string, leftColorStroke: string, leftColor: string, rightColorStroke: string, rightColor: string, rightSide: boolean, skip: number = 0): HTMLCanvasElement {
        const tempCanvas = document.createElement('canvas');
        const ctx = tempCanvas.getContext("2d");

        tempCanvas.width = 99;
        tempCanvas.height = 88;

  

        if (ctx != null) {

    
    

            const stairPoints = [
                {
                    x: 32,
                    y: 0
                },
                {
                    x: 0,
                    y: 16
                },
                {
                    x: 8 + 2,
                    y: 20 + 1
                },
                {
                    x: 40 + 2,
                    y: 4 + 1
                }
            ];

            const thickness = 7;

            for (let i = 3 - skip; i >= 0; i--) {
                let offsetX = (10 * i) + 26;
                let offsetY = (13 * i) + 19;
                let fixedThickness = thickness;
                if (rightSide) {
                    if (i === 1) {
                        fixedThickness += 2;
                    }
                    if (i === 3 || i === 2) {
                        offsetY += 1;
                    }
                }
                ctx.strokeStyle = strokeColor;
                ctx.fillStyle = floorColor;
                ctx.beginPath();
                ctx.moveTo(stairPoints[0].x + offsetX, stairPoints[0].y + offsetY);
                ctx.lineTo(stairPoints[1].x + offsetX, stairPoints[1].y + offsetY);
                ctx.lineTo(stairPoints[2].x + offsetX, stairPoints[2].y + offsetY);
                ctx.lineTo(stairPoints[3].x + offsetX, stairPoints[3].y + offsetY);
                ctx.lineTo(stairPoints[0].x + offsetX, stairPoints[0].y + offsetY);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();

                //thickness l
                ctx.strokeStyle = leftColorStroke;
                ctx.fillStyle = leftColor;
                ctx.beginPath();
                ctx.moveTo(stairPoints[1].x - 0.5 + offsetX, stairPoints[1].y + offsetY);
                ctx.lineTo(stairPoints[1].x - 0.5 + offsetX, stairPoints[1].y + fixedThickness + offsetY);
                ctx.lineTo(stairPoints[2].x - 0.5 + offsetX, stairPoints[2].y + fixedThickness + offsetY);
                ctx.lineTo(stairPoints[2].x - 0.5 + offsetX, stairPoints[2].y + offsetY);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();

                //thickness r
                ctx.strokeStyle = rightColorStroke;
                ctx.fillStyle = rightColor;
                ctx.beginPath();
                ctx.moveTo(stairPoints[3].x + 0.5 + offsetX, stairPoints[3].y + offsetY);
                ctx.lineTo(stairPoints[3].x + 0.5 + offsetX, stairPoints[3].y + fixedThickness + offsetY);
                ctx.lineTo(stairPoints[2].x + 0.5 + offsetX, stairPoints[2].y + fixedThickness + offsetY);
                ctx.lineTo(stairPoints[2].x + 0.5 + offsetX, stairPoints[2].y + offsetY);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
            }

        }

        return tempCanvas;
    }

    static makeLeftStair() {
        let baseTexture = new PIXI.BaseTexture(this.makeStair('rgba(142,142,94,127)', '#989865', '#676744', '#6F6F49', '#7A7A51', '#838357', false)!);
        baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
      
        return new PIXI.Texture(baseTexture);
    }

    static makeRightStair(toSkip: number = 0) {
        
        let baseTexture = new PIXI.BaseTexture(this.flipImage(this.makeStair('rgba(142,142,94,127)', '#989865', '#676744', '#6F6F49', '#7A7A51', '#838357', true, toSkip))!);
        baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
      
        return new PIXI.Texture(baseTexture);
    }

    /**
     * 
     *
     */
    static makeRightWall(height: number, thickness: number, mustDrawRightFace: boolean): PIXI.Texture {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.style.imageRendering = 'pixelated';
        const ctx = tempCanvas.getContext("2d");

        tempCanvas.width = 40;
        tempCanvas.height = 26 + height;

        

        if (ctx != null) {
            
            const imgData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            const data = imgData.data;

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

            ctx.save();
            ctx.translate(0, 1);
     
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
                if ( mustDrawRightFace ) {
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
                }
            

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
            ctx.restore();
        }

        let baseTexture = new PIXI.BaseTexture(tempCanvas);
        baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
      
        return new PIXI.Texture(baseTexture);
    }

    

   /**
    * 
     * 
     * @deprecated
     */
    static makeLeftWall(height: number, thickness: number, mustDrawRightFace: boolean): PIXI.Texture {
        const tempCanvas = document.createElement('canvas');
        const ctx = tempCanvas.getContext("2d");

        tempCanvas.width = 40;
        tempCanvas.height = 26 + height;

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

            ctx.save();
            ctx.translate(0, 1);
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
                if ( mustDrawRightFace ) {
                    ctx.fillStyle = '#bbbecd';
                    ctx.beginPath();
                    ctx.moveTo(points[1].x - .3, points[1].y);
                    ctx.lineTo(points[1].x - .3, points[1].y + height);
                    ctx.lineTo(points[2].x - .3, points[2].y + height);
                    ctx.lineTo(points[2].x - .3, points[2].y);
                    ctx.closePath();
                   // ctx.stroke();
                    ctx.fill();
                }
               


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
            ctx.restore();
        }

        console.log(tempCanvas.toDataURL('image/png'));

        return new PIXI.Texture(new PIXI.BaseTexture(tempCanvas));
    }
}
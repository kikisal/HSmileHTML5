import * as PIXI from 'pixi.js';

export default class RoomGraphics {

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

        return new PIXI.Texture(new PIXI.BaseTexture(tempCanvas));
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
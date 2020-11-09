import * as PIXI from 'pixi.js';

export default class RoomGraphics {
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
            ctx.moveTo(points[0].x - 0.5, points[0].y);
            ctx.lineTo(points[1].x - 0.5, points[1].y);
            ctx.lineTo(points[2].x - 0.5, points[2].y);
            ctx.lineTo(points[3].x - 0.5, points[3].y);
            ctx.lineTo(points[0].x - 0.5, points[0].y);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();


            if (height > 0) {
                ctx.strokeStyle = '#90929e';
                ctx.fillStyle = '#90929e';
                ctx.beginPath();
                ctx.moveTo(points[1].x - 0.5, points[1].y);
                ctx.lineTo(points[1].x - 0.5, points[1].y + height);
                ctx.lineTo(points[2].x - 0.5, points[2].y + height);
                ctx.lineTo(points[2].x - 0.5, points[2].y);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();

                ctx.strokeStyle = '#b6b9c8';
                ctx.fillStyle = '#b6b9c8';
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
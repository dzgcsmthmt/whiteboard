import Shape from './shape.js';
import { drawDashedCircle } from '../util/util.js';
let zIndex = 1;

class Circle extends Shape{
    constructor(canvas,board,x,y,radius,color){
        super(canvas,board);
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.originRadius = radius;
        this.color = color || 'yellow';
        this.zIndex = zIndex++;
    }

    draw(){
        this._realDraw(this.x, this.y, this.radius, this.color);
    }

    //todo 选中状态，这个应该独立一个对象，先简单点
    drawSelect(){
        drawDashedCircle(this.ctx,this.x,this.y,this.radius + 3,'yellow');
    }

    isPointIn(x,y){
        let delX = this.x - x;
        let delY = this.y - y;

        return delX ** 2 + delY ** 2 < this.radius ** 2;
    }

    transform(){
        
    }

    scale(scale){
        this.radius = this.originRadius * scale;
    }

    move(x,y){
        this.x += x;
        this.y += y;
    }

    _realDraw(x,y,r,color){
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export default Circle;
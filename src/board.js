import EventEmitter from './util/eventEmitter.js';
import Collection from './util/collection.js';
import easing from './util/easing.js';
import CommandManager from './command/commandManager.js';

class Board extends EventEmitter{
    constructor(canvasContainer){
        super();
        this.canvas = canvasContainer;
        this.ctx = this.canvas.getContext('2d');
        this.shapeCollection = new Collection();
        this.commandManager = new CommandManager({board: this});
        this.selectedShape = null;
        this.prevHoverShape = null;
        this.hoverAnimateId = null;

        this.bindEvents()
    }


    addShape(shape){
        this.shapeCollection.add(shape);
        this.emit('shape:add',shape);
        this.draw();
        return this;
    }

    removeShape(shape){
        this.shapeCollection.removeShape(shape);
        this.emit('shape:remove',shape);
        this.draw();
        return this;
    }

    getShape(ev){
        let res = null;
        this.shapeCollection.forEach(shape => {
            if(shape.isPointIn(ev.offsetX,ev.offsetY)){
                res = shape;
                return true;
            }
        },this,true);
        return res;
    }

    draw(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.shapeCollection.forEach(shape => {
            shape.draw();
        });

        if(this.selectedShape && this.shapeCollection.contains(this.selectedShape)){
            this.selectedShape.drawSelect();
        }
    }

    move(x,y){
        let shape = this.getSelection();
        if(!shape){
            alert('请先选中');
            return;
        }
        shape.move(x,y);
        this.emit('shape:move',{shape,x,y});
        this.draw();
    }

    scale(shape,scale){
        shape.scale(scale);
        this.draw();
    }

    getSelection(){
        if(this.selectedShape && this.shapeCollection.contains(this.selectedShape)){
            return this.selectedShape
        }
        return null;
    }

    undo(){
        this.commandManager.undo();
    }

    redo(){
        this.commandManager.redo();
    }

    bindEvents(){
        this.onmousemove = this.onmousemove.bind(this);
        this.onclick = this.onclick.bind(this);
        this.canvas.addEventListener('mousemove',this.onmousemove);
        this.canvas.addEventListener('click',this.onclick);

    }

    onmousemove(ev){
        let shape = this.getShape(ev);
        if(shape === this.prevHoverShape) return;

        if(this.prevHoverShape){
            this.handleMouseOutAnimation(this.prevHoverShape);
            this.canvas.style.cursor = 'default';
        } 
        if(shape){
            this.handleMouseOverAnimation(shape);
            this.canvas.style.cursor = 'pointer';
        }

        this.prevHoverShape = shape;
    }

    onclick(ev){
        this.selectedShape = this.getShape(ev);
        this.draw();
    }

    handleMouseOverAnimation(shape){
        var scale = 1;
        var start = 1;
        var end = 1.5;
        var min = 1;
        var max = 2;
        var gap = max - min;
        var s = 0;

        let animate = () => {
            //console.log(scale);
            if(scale >= end) return;
            s += 0.02;
            scale = Math.abs(easing.easeOutQuad(s / gap, s, start, end, max))
            this.scale(shape,scale);
            this.hoverAnimateId = requestAnimationFrame(animate);
        }
        animate();
    }

    handleMouseOutAnimation(shape){
        cancelAnimationFrame(this.hoverAnimateId);
        this.scale(shape,1);
    }
}

export default Board;
class Shape {
    constructor(canvas,board){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.board = board;
    }

    draw(){
        throw new Error("Abstract: should be overridden");
    }

    drawSelect(){
        throw new Error("Abstract: should be overridden");
    }

    isPointIn(){
        throw new Error("Abstract: should be overridden");
    }
    
    transform(){}
    move(){}
    scale(){}
}

export default Shape;
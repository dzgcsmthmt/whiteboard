import Command from './command.js';

class MoveCommand extends Command{
    constructor(board,shape,moveX,moveY){
        super(board,shape);
        this.moveX = moveX;
        this.moveY = moveY;
    }

    undo(){
        this.shape.move(-this.moveX,-this.moveY);
    }

    redo(){
        this.shape.move(this.moveX,this.moveY);
    }
}

export default MoveCommand;
import Command from './command.js';

class LifeCommand extends Command{
    constructor(board,shape){
        super(board,shape);
    }

    undo(){
        this.board.shapeCollection.remove(this.shape);
    }

    redo(){
        this.board.shapeCollection.add(this.shape);
    }
}

export default LifeCommand;
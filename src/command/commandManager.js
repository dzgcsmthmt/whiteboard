import MoveCommand from './moveCommand.js';
import liftCommand from './lifeCommand.js';

class CommanderManager{
    constructor(option){
        this.undoStack = [];
        this.redoStack = [];
        this.board = option.board;
        this.maximumSize = option.maximumSize || 50;
        //主要是为了redo undo的按钮状态
        this.onChange = option.onChange;
        this.bindListeners();
    }

    bindListeners(){
        let board = this.board;

        board.on('shape:add',(shape) => {
            this.execute(new liftCommand(board,shape));
        });

        board.on('shape:move',({shape,x,y}) => {
            this.execute(new MoveCommand(board,shape,x,y));
        });
    }

    execute(cmd){
        if(this.undoStack.length >= this.maximumSize){
            this.undoStack.shift();
        }
        this.undoStack.push(cmd);
        this.redoStack.length = 0;
    }

    undo(){
        if(!this.undoStack.length) return;

        let cmd = this.undoStack.pop();
        cmd.undo();
        this.redoStack.push(cmd);
        this._fireUpdate();
    }

    redo(){
        if(!this.redoStack.length) return;

        let cmd = this.redoStack.pop();
        cmd.redo();
        this.undoStack.push(cmd);
        this._fireUpdate();
    }

    _fireUpdate() {
        this.board.draw();
        this.onChange && this.onChange(this, this.undoStack.length, this.redoStack.length)
    }

    clear(){
        this.undoStack.length = 0;
        this.redoStack.length = 0;
        this._fireUpdate();
    }
}

export default CommanderManager;
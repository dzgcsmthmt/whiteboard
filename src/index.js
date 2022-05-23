import Board from './board.js';
import CirCle from './shape/circle.js';

const colors = ['red','blue','green','yellow','purple','pink'];

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let addBtn = document.getElementById('add');
let moveBtn = document.getElementById('move');
let undoBtn = document.getElementById('undo');
let redoBtn = document.getElementById('redo');

let board = new Board(canvas);

addBtn.addEventListener('click',function(){
    let c = new CirCle(canvas,board,getRandom(20,780),getRandom(20,580),getRandom(10,30),colors[getRandom(0,colors.length)]);
    board.addShape(c);
});

moveBtn.addEventListener('click',function(){
    board.move(10,10);
})

undoBtn.addEventListener('click',function(){
    board.undo();
})

redoBtn.addEventListener('click',function(){
    board.redo();
})

function getRandom(min,max){
    let gap = max - min;
    return min + (Math.random() * gap >> 0);
}

import Node from '../Node/Node';

const START_NODE_ROW = 5;
const START_NODE_COL = 13;
const END_NODE_ROW = 20;
const END_NODE_COL = 16;

class Board{
    constructor(rows, cols){
        
        this.rows = rows;
        this.cols = cols;
        this.visualization = [];
        this.grid = [];
        this.startNode = null;
        this.endNode = null;

        let index = 0;
        //generates the board
        for(let row = 0; row < rows; row++){
            this.grid.push([]);
            for(let col = 0; col < cols; col++){
  
              let node = new Node(row, col, index++);
              
              if(START_NODE_ROW === row && START_NODE_COL === col){
                node.tentDistance = 0
                node.isStart = true;
                this.startNode = node;
              }else if(END_NODE_ROW === row && END_NODE_COL === col){
                node.isEnd = true;
                this.endNode = node;
              }
  
              this.grid[row].push(node)
            }
        }
    }

    resetBoard() {
        this.visualization = [];

        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < this.cols; col++){
  
              let node = this.grid[row][col];
  
              let tentDistance = node.isStart ? 0 : Infinity;
              let cl = node.isStart ? 'start' : node.isEnd ? 'end' : 'node';
  
              node.tentDistance = tentDistance;
              node.pathDistance = 1;
              node.wall = false;
              node.previusNode = null;
              document.getElementById(node.id).className = cl;
            }
        }
    }

    resetPath() {
      this.visualization = [];
      
        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < this.cols; col++){
                let node = this.grid[row][col];

                let tentDistance = Infinity
                let cl = "";
              
                if(node.isStart){
                  tentDistance = 0;
                }

                if(node.wall){
                    cl = "wall"
                }

                node.tentDistance = tentDistance;
                node.previusNode = null;
                document.getElementById(node.id).className = `node ${cl}` ;
              }
        }
    }

    randomizePathDistances() {
        for(let row = 0; row < this.rows; row++){
          for(let col = 0; col < this.cols; col++){
            let node = this.grid[row][col];
  
            node.pathDistance = 1 + Math.round(Math.random() * 8);
          }
        }
    }
}

export default Board;
import Node from '../Node/Node';

const START_NODE_ROW = 1;
const START_NODE_COL = 1;
const END_NODE_ROW = 20;
const END_NODE_COL = 24;

class Board{
    constructor(rows, cols){
        
        this.rows = rows;
        this.cols = cols;
        this.visualization = [];
        this.grid = [];

        //generates the board
        for(let row = 0; row < rows; row++){
            this.grid.push([]);
            for(let col = 0; col < cols; col++){
  
              let node = new Node(row, col);
              
              if(START_NODE_ROW === row && START_NODE_COL === col){
                node.tentDistance = 0
                node.isStart = true;
              }else if(END_NODE_ROW === row && END_NODE_COL === col){
                node.isEnd = true;
              }
  
              this.grid[row].push(node)
            }
        }
    }

    resetBoard() {
        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < this.cols; col++){
  
              let node = this.grid[row][col];
  
              let tentDistance = Infinity
              
              if(node.isStart){
                tentDistance = 0;
              }
  
              node.tentDistance = tentDistance;
              node.pathDistance = 1;
              node.wall = false;
              node.previusNode = null;
              node.style = {
                  backgroundColor: 'white',
              };
            }
        }
    }

    resetPath() {
        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < this.cols; col++){
                let node = this.grid[row][col];

                let tentDistance = Infinity
                let style = {backgroundColor: 'white'};
              
                if(node.isStart){
                  tentDistance = 0;
                }

                if(node.wall){
                    style = {backgroundColor: 'black',};
                }

                node.tentDistance = tentDistance;
                node.previusNode = null;
                node.style = style;
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
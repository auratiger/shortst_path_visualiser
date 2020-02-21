class Node{
    constructor(row, col){
        this.id = "" + (row < 10 ? '0'+row : row) + (col < 10 ? '0'+col : col);  
        this.row = row;
        this.col = col;
        this.isStart = false;
        this.isEnd = false;
        this.wall = false;
        this.tentDistance = Infinity;
        this.pathDistance = 1;
        this.previusNode = null;
        this.style = {
            backgroundColor: '000',
        };
    }
}

export default Node;
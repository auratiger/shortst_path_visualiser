class Node{
    constructor(row, col, distance){
        this.id = "" + (row < 10 ? '0'+row : row) + (col < 9 ? '0'+col : col);  
        this.row = row;
        this.col = col;
        this.visited = false;
        this.checked = false;
        this.wall = false;
        this.distance = distance;
        this.previusNode = null;
        this.style = {
            backgroundColor: '000',
        };
    }
}

export default Node;
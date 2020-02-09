class Node{
    constructor(id){
        this.id = id;
        this.visited = false;
        this.wall = false;
        this.previusNode = null;
        this.style = {
            backgroundColor: '000',
        };
    }
}

export default Node;
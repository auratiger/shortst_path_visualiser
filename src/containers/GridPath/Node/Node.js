class Node{
    constructor(id, distance){
        this.id = id;
        this.visited = false;
        this.wall = false;
        this.distance = distance;
        this.previusNode = null;
        this.style = {
            backgroundColor: '000',
        };
    }
}

export default Node;
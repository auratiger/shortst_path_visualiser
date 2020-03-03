
// finds the distance from node "start" to node "end"
function calculateDistance(start, end){
    return (Math.abs(start.row - end.row) + Math.abs(start.col - end.col));    
}

function getAdjacentNodes(matrix, curNode){
    let adjacent = [];
    let dir_r = [0, -1, 0, 1]; //
    let dir_c = [1, 0, -1, 0]; // right, up, left, down    

    for(let i = 0; i < 4; i++){
        if(curNode.row + dir_r[i] < 0 || curNode.col + dir_c[i] < 0 ||
            curNode.row + dir_r[i] >= matrix.length || curNode.col + dir_c[i]  >= matrix[0].length){                                
            continue;
        }
        
        let node = matrix[curNode.row + dir_r[i]][curNode.col + dir_c[i]];  
        
        if(node.wall){
            continue;
        }

        adjacent.push(node);
    }

    return adjacent;
}

function getNodeWithShortestDistance(grid){
    let smallest = Infinity;
    let rNode = null;
    let index = 0;
    console.log(grid.length);
    
    
    for(let i = 0; i < grid.length; i++){
        let node = grid[i];
        if(node.fScore <= smallest){
            smallest = node.fScore;
            rNode = node;
            index = i;
        }        
    }

    return [rNode, index];
}

export function aStar(board){
    return new Promise((resolve, reject) => {
        let reachedEnd = false;

        let startNode = board.startNode;
        let endNode = board.endNode;        
        
        startNode.gScore = 0;
        let openSet = [startNode];
        let closedSet = [];
    
        while(openSet.length !== 0){

            let [curNode, i] = getNodeWithShortestDistance(openSet);
            openSet.splice(i, 1); // removes the node at index i;

            if(curNode.isEnd){
                console.log("end");
                reachedEnd = true;
                board.visualization.push(curNode);
                break;
            }

            let adjacentNodes = getAdjacentNodes(board.grid, curNode);

            adjacentNodes.forEach(node => {
                node.previusNode = curNode;

                let g = curNode.gScore + curNode.pathDistance;
                let h = calculateDistance(node, endNode);
                let f = g + h;

                let q = openSet.filter(el => el.id === node.id);
                if(q.length !== 0 && q[0].fScore < f){
                    return;
                }

                q = closedSet.filter(el => el.id === node.id);
                if(q.length !== 0 && q[0].fScore < f){
                    return;
                }

                node.fScore = f;
                openSet.push(node);
            })

            board.visualization.push(curNode);
            closedSet.push(curNode);
        }

        resolve(reachedEnd);
    })    
}
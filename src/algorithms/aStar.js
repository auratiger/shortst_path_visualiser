
// finds the distance from node "start" to node "end"
function calculateDistance(start, end){
    let [startRow, startCol] = [start.row, start.col];
    let [endRow, endCol] = [end.row, end.col];

    let dirY = startRow < endRow ? 1 : -1;
    let dirX = startCol < endCol ? 1 : -1;
    let distance = 0;

    while(startRow != endRow){
        startRow += dirY;
        distance++;
    }

    while(startCol != endCol){
        startCol += dirX;
        distance++;
    }

    return distance;    
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

function getNodeWithSmallestDistance(grid){
    let smallest = Infinity;
    let rNode = null;
    let index = 0;
    
    for(let i = 0; i < grid.length; i++){
        let node = grid[i];
        if(node.tentDistance < smallest){
            smallest = node.tentDistance;
            rNode = node;
            index = i;
        }
    }

    return [rNode, index];
}

export function aStar(board, startNode, endNode){
    return new Promise((resolve, reject) => {
        
            let openSet = [startNode];
            let distanceFromStart = 0;
            let distanceToEnd = 0;
        
            let totalDistance = 0;
        
            // while(openSet.length != 0){

            // }

            reject("N");
    })    
}
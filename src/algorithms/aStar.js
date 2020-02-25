
// finds the distance from node "start" to node "end"
function calculateDistance(start, end){
    let [startRow, startCol] = [start.row, start.col];
    let [endRow, endCol] = [end.row, end.col];

    let dirY = startRow < endRow ? 1 : -1;
    let dirX = startCol < endCol ? 1 : -1;
    let distance = 0;

    while(startRow !== endRow){
        startRow += dirY;
        distance++;
    }

    while(startCol !== endCol){
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

function getNodeWithShortestDistance(grid){
    let smallest = Infinity;
    let rNode = null;
    let index = 0;
    
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

export function aStar(board, startNode, endNode){
    return new Promise((resolve, reject) => {

            let openSet = [startNode];
        
            while(openSet.length != 0){

                let [curNode, i] = getNodeWithShortestDistance(board.grid);
                openSet.splice(i, 1); // removes the node at index i;

                if(curNode.isEnd){
                    console.log("end");
                    break;
                }

                let adjacentNodes = getAdjacentNodes(board.grid, curNode);

                adjacentNodes.forEach(node => {
                    
                })
            }

            reject("N");
    })    
}

export function dijstraAlgorithm(board){

    return new Promise((resolve, reject) => {
        
        let matrix = board.grid;
        let grid = [];

        matrix.map(row => {
            row.map(col => {
                grid.push(col);
            })
        })

        while(grid.length !== 0){
            const [currNode, i] = getNodeWithSmallestDistance(grid);  

            
            if(currNode === null){
                break;
            }
                        
            if(currNode.isEnd){  
                board.visualization.push(currNode); 
                break;
            } 

            grid.splice(i, 1);

            let adjacentNodes = getAdjacentNodes(matrix, currNode);  

            adjacentNodes.forEach(node => {
                let tentDistance = currNode.tentDistance + currNode.pathDistance;

                if(tentDistance < node.tentDistance && !node.wall){
                    board.visualization.push(node);
                    node.tentDistance = tentDistance;
                    node.previusNode = currNode;
                }
            })
        }
        resolve("yes");
    });
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
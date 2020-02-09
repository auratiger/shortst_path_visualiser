
export async function dijstraAlgorithm(matrix, start, end){
    
    let currLoc = start;
    let node = matrix[start[0]][start[1]];
    let endNode = matrix[end[0]][end[1]];

    
    // while(currLoc.every(e => !endNode.includes(e))){
        
        
    // }

    let i = 0;
    while(i++ < 4){
        
        let adjacentNodes =  getAdjacentNodes(matrix, start);
            
    }



    return "hello";
}

function getAdjacentNodes(matrix, curNode){
    let adjacent = [];
    let dir_r = [0, -1, 0, 1]; //
    let dir_c = [1, 0, -1, 0]; // right, up, left, down    

    for(let i = 0; i < 4; i++){
        if(curNode[0] + dir_r[i] < 0 || curNode[1] + dir_c[i] < 0 ||
            curNode[0] + dir_r[i] >= 27 || curNode[0] + dir_r[i]  >= 65){
                // TODO: the rows and cols limit values should not be hard coded
                // they should change accourding to the screen size
            continue;
        }
        
        let node = matrix[curNode[0] + dir_r[i]][curNode[1] + dir_c[i]];     
        
        if(node.wall){
            continue
        }

        adjacent.push(node);
    }

    return adjacent;
}
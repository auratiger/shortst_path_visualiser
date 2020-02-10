import Queue from '../dataStructures/Queue'

export async function dijstraAlgorithm(matrix, startNode, endNode, rerender){
    
    let currNode = null;
    let prevNode = null;
    startNode.checked = true;
    let unvisitedNeigbors = new Queue();
    unvisitedNeigbors.enqueue(startNode);    

    let i = 0;
    while(!unvisitedNeigbors.isEmpty()){     

            currNode = unvisitedNeigbors.dequeue();

            
            currNode.distance += 1;
            currNode.visited = true;
            currNode.previusNode = prevNode;
            currNode.style = {backgroundColor: "blue"};
            
            if(currNode.row === endNode.row && currNode.col === endNode.col){                
                return;
            }
            
            let adjacentNodes =  getAdjacentNodes(matrix, currNode);  
            
            adjacentNodes.forEach(node => {
                unvisitedNeigbors.enqueue(node);
            })

            prevNode = currNode;

            rerender(matrix);
                
    }
}

function getAdjacentNodes(matrix, curNode){
    let adjacent = [];
    let dir_r = [0, -1, 0, 1]; //
    let dir_c = [1, 0, -1, 0]; // right, up, left, down    

    for(let i = 0; i < 4; i++){
        if(curNode.row + dir_r[i] < 0 || curNode.col + dir_c[i] < 0 ||
            curNode.row + dir_r[i] >= 27 || curNode.col + dir_r[i]  >= 65){
                // TODO: the rows and cols limit values should not be hard coded
                // they should change accourding to the screen size
            continue;
        }
        
        let node = matrix[curNode.row + dir_r[i]][curNode.col + dir_c[i]];  
        
        if(node.wall || node.visited || node.checked){
            continue;
        }

        node.checked = true;

        adjacent.push(node);
    }

    return adjacent;
}
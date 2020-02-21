// import Queue from '../dataStructures/Queue'
// 
// export async function dijstraAlgorithm(matrix, startNode, endNode, rerender){
    
//     let currNode = null;
//     let prevNode = null;
//     let nearestNeibour = Infinity;
//     let unvisitedNeigbors = new Queue();
//     unvisitedNeigbors.enqueue(startNode);

//     let i = 0;
//     while(!unvisitedNeigbors.isEmpty()){     

//             currNode = unvisitedNeigbors.dequeue();

//             currNode.visited = true;
//             currNode.style = {backgroundColor: "orange"};
            
//             if(currNode.row === endNode.row && currNode.col === endNode.col){                
//                 break;
//             }            

//             let adjacentNodes =  getAdjacentNodes(matrix, currNode);  
            
//             adjacentNodes.forEach(node => {
//                 let tentDistance = currNode.tentDistance + currNode.pathDistance;

//                 if(tentDistance < node.tentDistance){
//                     node.tentDistance = tentDistance;
//                     node.previusNode = currNode;                    
//                 }

//                 if(node.visited){
//                     return;
//                 }

//                 if(tentDistance < nearestNeibour){
//                     nearestNeibour = tentDistance;
//                     unvisitedNeigbors.toFront(node);
//                 }else{
//                     unvisitedNeigbors.enqueue(node);
//                 }                
//             })

//             prevNode = currNode;                
//     }

//     while(currNode.previusNode !== null){
        
//         currNode.style = {backgroundColor: "blue"};
//         currNode = currNode.previusNode;
//     }

//     rerender(matrix);
// }

export function dijstraAlgorithm(matrix){

    return new Promise((resolve, reject) => {
        
        let grid = [];
        let endNode = null;

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
                endNode = currNode;             
                break;
            } 

            grid.splice(i, 1);

            let adjacentNodes =  getAdjacentNodes(matrix, currNode);  

            adjacentNodes.forEach(node => {
                let tentDistance = currNode.tentDistance + currNode.pathDistance;

                if(tentDistance < node.tentDistance && !node.wall){
                    node.tentDistance = tentDistance;
                    node.previusNode = currNode;
                    node.style = {backgroundColor: "orange"};
                }
            })
        }

        let currNode = endNode;
        while(currNode.previusNode !== null){
            
            currNode.style = {backgroundColor: "blue"};
            currNode = currNode.previusNode;
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
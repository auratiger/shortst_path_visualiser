

export function visualizePath(path, elRefs, reachedEnd){      
    
    for(let i = 0; i < path.length; i++){
        let node = path[i];

        if(i === path.length-1){            
            let backtrackPath = [];

            while(node !== null && node.previusNode !== null){                                
                backtrackPath.push(node);
                node = node.previusNode;
            }   

            setTimeout(() => {
                for(let e = 0; e < backtrackPath.length; e++){
                    if(reachedEnd){
                        setTimeout(() => {
                            elRefs[backtrackPath[e].index].current.className = "node node-shortest-path"
                        }, 50 * e);
                    }
                }  
            }, 10 * i);
            return;
        }

        setTimeout(() => {            
            elRefs[node.index].current.className = 'node node-visited';
        }, 10 * i);
    }
}


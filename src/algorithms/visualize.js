

export function visualizePath(path, reachedEnd){      
    
    for(let i = 0; i < path.length; i++){
        let node = path[i];

        if(i === path.length-1){            
            let backtrackPath = [];

            while(node !== null && node.previusNode !== null){   
                console.log(2);
                             
                backtrackPath.push(node);
                node = node.previusNode;
            }   

            setTimeout(() => {
                for(let e = 0; e < backtrackPath.length; e++){
                    if(reachedEnd){
                        setTimeout(() => {
                                document.getElementById(backtrackPath[e].id).className = 'node node-shortest-path';
                        }, 50 * e);
                    }
                }  
            }, 10 * i);
            return;
        }

        setTimeout(() => {            
            document.getElementById(node.id).className = 'node node-visited'; 
        }, 10 * i);
    }
}


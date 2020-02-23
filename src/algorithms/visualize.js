

export function visualizePath(path){  

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
                    setTimeout(() => {

                        // document.getElementById(backtrackPath[e].id).style.backgroundColor = "blue";
                        document.getElementById(backtrackPath[e].id).className = 'node node-shortest-path' ;
                        
                    }, 50 * e);
                }  
            }, 10 * i);
            return;
        }

        setTimeout(() => {
            
            // document.getElementById(node.id).style.backgroundColor = "orange";
            document.getElementById(node.id).className = 'node node-visited';
            
        }, 10 * i);
    }
}


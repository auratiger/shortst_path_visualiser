let [HORIZONTAL, VERTICAL] = [1, 2];

export function generateMaze(matrix){
    return new Promise((resolve, reject) => {
        
            let width = matrix[0].length;
            let height = matrix.length;
            let orientetion = chooseOrientetion(width, height);
                
            generateMazeEdges(matrix);
        
            divide(matrix, 1, 1, width - 2, height - 2, orientetion, 3);
    })
}

function generateMazeEdges(matrix){

    for(let i = 0; i < matrix.length; i++){
        document.getElementById(matrix[i][0].id).className = 'node wall' ;
        matrix[i][0].wall = true;

        document.getElementById(matrix[i][matrix[0].length - 1].id).className = 'node wall' ;
        matrix[i][matrix[0].length - 1].wall = true;
    }
    for(let i = 0; i < matrix[0].length; i++){
        document.getElementById(matrix[0][i].id).className = 'node wall' ;
        matrix[0][i].wall = true;

        document.getElementById(matrix[matrix.length - 1][i].id).className = 'node wall' ;
        matrix[matrix.length - 1][i].wall = true;
    }
}

function divide(matrix, x, y, width, height, orientetion, e){

    // if(e === 0){
    //     return;
    // }

    if(width < 2 || height < 2){
        return;
    }

    let horizontal = orientetion === HORIZONTAL;

    // what direction will the wall be drawn?
    let dx = horizontal ? 1 : 0;
    let dy = horizontal ? 0 : 1;

    // how long will the wall be?
    let length = horizontal ? width-1 : height-1;

    let wx, wy;
    
    // where will the wall be drawn from?
    wx = x + (horizontal ? 0 : Math.round((width - 2) / 2));
    wy = y + (horizontal ? Math.round((height - 2) / 2) : 0);

    let startPointNeibor = [wx - dx, wy - dy];
    let endPointNeibor = [wx + (dx * length+dx), wy + (dy * length+dy)];
    
    // where will the passage through the wall exist?        
    let px, py;

    if(!matrix[startPointNeibor[1]][startPointNeibor[0]].wall){        
        px = wx;
        py = wy;        
    }else if(!matrix[endPointNeibor[1]][endPointNeibor[0]].wall){        
        px = wx + (dx * (length));
        py = wy + (dy * (length));
    }else{        
        px = wx + (horizontal ? Math.ceil(Math.random() * (width - 2)) : 0);
        py = wy + (horizontal ? 0 : Math.ceil(Math.random() * (height - 2)));
    }    
    
    for(let i = 0; i <= length; i++){
        let node = matrix[wy][wx];

        if(node.isStart){
            node.isStart = false;
            node.tentDistance = Infinity
            matrix[wy+1][wx+1].isStart = true;
            matrix[wy+1][wx+1].tentDistance = 0;
        }else if(node.isEnd){
            node.isEnd = false;
            node.tentDistance = Infinity;
            matrix[wy+1][wx+1].isEnd = true;
            matrix[wy+1][wx+1].tentDistance = 0;
        }

        if(wx !== px || wy !== py){
            document.getElementById(node.id).className = 'node wall' ;
            node.wall = true;
        }
        wx += dx;
        wy += dy;
    }

    let [nx, ny] = [x, y];
    let [w, h] = horizontal ? [width, wy-y] : [wx-x, height];

    divide(matrix, nx, ny, w, h, chooseOrientetion(w, h), e - 1);

    [nx, ny] = horizontal ? [x, wy+1] : [wx+1, y];
    [w, h] = horizontal ? [width, y+height-wy-1] : [x+width-wx-1, height];

    divide(matrix, nx, ny, w, h, chooseOrientetion(w, h), e - 1);
}

function chooseOrientetion(width, height){
    if(width < height){
        return HORIZONTAL;
    }else if(height < width){
        return VERTICAL;
    }else{
        return Math.round(Math.random()) === 0 ? HORIZONTAL : VERTICAL;
    }
}

let [HORIZONTAL, VERTICAL] = [1, 2];

export function generateMaze(matrix){
    return new Promise((resolve, reject) => {
        
            let width = matrix[0].length;
            let height = matrix.length;
            let orientetion = chooseOrientetion(width, height);
        
            let newMatrix = matrix;
        
            generateMazeEdges(matrix);
        
            divide(matrix, 1, 1, width - 2, height - 2, orientetion, 3);
    })
}

function generateMazeEdges(matrix){

    for(let i = 0; i < matrix.length; i++){
        matrix[i][0].style = {
            backgroundColor: 'black',
        };
        matrix[i][0].wall = true;

        matrix[i][matrix[0].length - 1].style = {
            backgroundColor: 'black',
        };
        matrix[i][matrix[0].length - 1].wall = true;
    }
    for(let i = 0; i < matrix[0].length; i++){
        matrix[0][i].style = {
            backgroundColor: 'black',
        };
        matrix[0][i].wall = true;

        matrix[matrix.length - 1][i].style = {
            backgroundColor: 'black',
        };
        matrix[matrix.length - 1][i].wall = true;
    }
}

function divide(matrix, x, y, width, height, orientetion, e){

    if(e === 0){
        return;
    }

    if(width < 2 || height < 2){
        return;
    }

    let horizontal = orientetion === HORIZONTAL;

    // what direction will the wall be drawn?
    let dx = horizontal ? 1 : 0;
    let dy = horizontal ? 0 : 1;

    // how long will the wall be?
    let length = horizontal ? width : height;

    let wx, wy;
    
    // where will the wall be drawn from?
    wx = x + (horizontal ? 0 : Math.round((width - 2) / 2));
    wy = y + (horizontal ? Math.round((height - 2) / 2) : 0);

    let startPointNeibor = [wx - dx, wy - dy];
    let endPointNeibor = [wx + (dx * length), wy + (dy * length)];

    console.log(startPointNeibor);
    console.log(endPointNeibor);
    

    let px, py;

    if(!matrix[startPointNeibor[0]][startPointNeibor[1]].wall){
        console.log(1);
        
        px = wx;
        py = wy;
    }else if(!matrix[endPointNeibor[0]][endPointNeibor[1]].wall){
        console.log(2);
        
        px = wx + (dx * (length - 1));
        py = wy + (dy * (length - 1));
    }else{
        // where will the passage through the wall exist?
        console.log(3);
        
        px = wx + (horizontal ? Math.round(Math.random() * (width - 2)) : 0);
        py = wy + (horizontal ? 0 : Math.round(Math.random() * (height - 2)));
    }
    
    for(let i = 0; i < length; i++){
        if(wx !== px || wy !== py){
            matrix[wy][wx].style = {
                backgroundColor: 'black',
            };
            matrix[wy][wx].wall = true;
        }
        wx += dx;
        wy += dy;
    }

    let [nx, ny] = [x, y];
    let [w, h] = horizontal ? [width, wy-y+1] : [wx-x+1, height];

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
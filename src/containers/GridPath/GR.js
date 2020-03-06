import React, {useState, useEffect, useRef, createRef} from 'react';
// import Draggable from 'react-draggable';

import {dijstraAlgorithm} from '../../algorithms/dijkstra';
import {aStar} from '../../algorithms/aStar';
import {generateMaze} from '../../algorithms/mazeGenerator';
import {visualizePath} from '../../algorithms/visualize';

import Board from '../Board/Board';

import './GridPath.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Card } from 'react-bootstrap';

// const ROWS = 20;
// const COLS = 30;
let ROWS = Math.floor(window.innerHeight / 32);
let COLS = Math.floor(window.innerWidth / 27);

const GridPath = () => {

    const [rerender, setRerender] = useState(false);
    const [board, setBoard] = useState(null);
    const [mouseDown, setMouseDown] = useState(false); 
    const [screenWidth, setScreenWidth] = useState(0); 
    const [screenHeight, setScreenHeight] = useState(0); 
    const [elRefs, setElRefs] = React.useState([]);

    useEffect(() => {

      setElRefs(elRefs => (
        Array(ROWS*COLS).fill().map((_, i) => elRefs[i] || createRef())
      ));

      updateScreenSize();
      window.addEventListener('resize', updateScreenSize);
      setBoard(new Board(ROWS, COLS, setRerender));

        return () => {window.removeEventListener('resize', updateScreenSize)}
    }, []);

    const updateScreenSize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
      ROWS = Math.floor(window.innerHeight / 32);
      COLS = Math.floor(window.innerWidth / 27);
      setBoard(new Board(ROWS, COLS, setRerender));      
    }

    const resetBoard = () => {
      board.resetBoard();
      setRerender(!rerender);
    }

    const PathRandomizer = () => {
      board.resetPath()
      board.randomizePathDistances();
      setRerender(!rerender);
    }

    const runDijcstra = () => {

        dijstraAlgorithm(board).then((reachedEnd) => {
          visualizePath(board.visualization, elRefs, reachedEnd);
        }); 
    }

    const runAStar = () => {
      aStar(board).then((reachedEnd) => {
        visualizePath(board.visualization, elRefs, reachedEnd);
      })
    }

    const runMaze = () => {
        board.resetBoard();
        generateMaze(board.grid).then(setRerender(!rerender));
    }
        
    const colorChangeHandler = (id) => {
        
        let row = parseInt(id.substring(0, 2)); 
        let col = parseInt(id.substring(2));   
       
        let node = board.grid[row][col];
        
        if(node.isStart || node.isEnd){
          return;
        }

        node.wall = true;
        let index = row * board.cols + col;
        elRefs[index].current.className = 'node wall';
    }

    const onClickHandler = (event) => {
        event.preventDefault();

        colorChangeHandler(event.target.id);

        setMouseDown(true);
    }

    const onMouseRelease = (event) => {
        setMouseDown(false);
    }

    const onMouseHover = (event) => {
        if(!mouseDown){
          return
        }

        colorChangeHandler(event.target.id);        
    }
        
    let key = 0; 
    let r = 0;    
    let grid = board !== null ? board.grid.map(row => {
      let cols = row.map(node => {
        
        let cl = node.isStart ? "start" : node.isEnd ? "end" : "node";
        
        return(
          <div id={node.id} 
               key={node.id} 
               ref={elRefs[r++]}
               className={cl}
               onMouseDown={onClickHandler}
               onMouseOver={onMouseHover}
               onMouseUp={onMouseRelease}>
                 {node.pathDistance}
          </div>
        )
      })

      return(
        <div key={key++} className={"wrapper"}>
          {cols}
        </div>
      )
    }) : null;    

    return (
      <div className={"center"}>

        <div className={"con"}>
          <Card.Text>{screenWidth + " " + screenHeight}</Card.Text>
          <ButtonGroup>
            <Button onClick={runDijcstra}>run</Button>
            <Button onClick={runAStar}>aStar</Button>
            <Button onClick={resetBoard}>clean</Button>
            <Button onClick={runMaze}>maze</Button>
            <Button onClick={PathRandomizer}>distance</Button>
          </ButtonGroup>
        </div>

        <div className={"container"}>
          {grid}
        </div>    
      </div>
    );
}

export default GridPath;
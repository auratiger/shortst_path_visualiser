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

// const ROWS = 35;
// const COLS = 92;
const ROWS = Math.floor(window.innerHeight / 34);
const COLS = Math.floor(window.innerWidth / 26);

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
          visualizePath(board.visualization, reachedEnd);
        }); 
    }

    const runAStar = () => {
      aStar(board).then((reachedEnd) => {
        visualizePath(board.visualization, reachedEnd);
      })
    }

    const runMaze = () => {
        board.resetBoard();
        generateMaze(board.grid).then(setRerender(!rerender));
    }
        
    const colorChangeHandler = (id) => {
        
        let row = parseInt(id.substring(0, 2)); 
        let col = parseInt(id.substring(2));   
       
        board.grid[row][col].wall = true;       
        let index = row * COLS + col;
        elRefs[index].current.className = 'node wall';
      }

    const onClickHandler = (event) => {
        event.preventDefault();

        if(event.target.id === "element"){
          return;
        }

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
        
        let element = () => {           

          if(node.isStart){
            return(
              <div className={"start"} id="element"></div>
            )
          }else if(node.isEnd){
            return(
              <div className={"end"} id="element"></div>
            )
          }else {
            return node.pathDistance;
          }
        }
    
        return(
          <div id={node.id} 
               key={node.id} 
               ref={elRefs[r++]}
               className={"node"}
               onMouseDown={onClickHandler}
               onMouseOver={onMouseHover}
               onMouseUp={onMouseRelease}>
                 {element()}
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
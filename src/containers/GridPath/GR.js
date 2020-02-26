import React, {useState, useEffect} from 'react';
// import Draggable from 'react-draggable';

import {dijstraAlgorithm} from '../../algorithms/dijkstra';
import {aStar} from '../../algorithms/aStar';
import {generateMaze} from '../../algorithms/mazeGenerator';
import {visualizePath} from '../../algorithms/visualize';

import Board from '../Board/Board';

import './GridPath.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Card } from 'react-bootstrap';

const ROWS = 30;
const COLS = 30;

const GridPath = () => {

    const [rerender, setRerender] = useState(false);
    const [board, setBoard] = useState(null);
    const [mouseDown, setMouseDown] = useState(false); 
    const [distance, setDistance] = useState(0);     

    useEffect(() => {
        setBoard(new Board(ROWS, COLS, setRerender));
    }, []);

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
          setRerender(!rerender);
        }); 
      }

    const runMaze = () => {
        board.resetBoard();
        generateMaze(board.grid).then(setRerender(!rerender));
    }
        
    const colorChangeHandler = (id) => {
        
        let row = parseInt(id.substring(0, 2)); 
        let col = parseInt(id.substring(2));   
       
        board.grid[row][col].wall = true;       
        document.getElementById(board.grid[row][col].id).className = 'node wall' ;
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
          <Card.Text>{distance}</Card.Text>
          <ButtonGroup>
            <Button onClick={runDijcstra}>run</Button>
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
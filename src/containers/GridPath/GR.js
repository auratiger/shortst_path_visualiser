import React, {useState, useEffect} from 'react';
import Draggable from 'react-draggable';
import {dijstraAlgorithm} from '../../algorithms/dijkstra';
import {generateMaze} from '../../algorithms/mazeGenerator';
import Board from '../Board/Board';
import Node from '../Node/Node';

import CssClasses from "./GridPath.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, ButtonGroup } from 'react-bootstrap';

const ROWS = 31;
const COLS = 31;

const GridPath = () => {

    const [rerender, setRerender] = useState(false);
    const [board, setBoard] = useState(null);
    const [mouseDown, setMouseDown] = useState(false);      

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
        dijstraAlgorithm(board.grid).then(setRerender(!rerender)); 
      }

    const runMaze = () => {
        board.resetBoard();
        setRerender(!rerender);
        generateMaze(board.grid).then(setRerender(!rerender));
    }
        
    const colorChangeHandler = (id) => {
        
        let row = parseInt(id.substring(0, 2)); 
        let col = parseInt(id.substring(2));   
       
        board.grid[row][col].wall = true;
        board.grid[row][col].style = {
          backgroundColor: "red",
        }          
        
        setRerender(!rerender);
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
              <div className={CssClasses.start} id="element"></div>
            )
          }else if(node.isEnd){
            return(
              <div className={CssClasses.end} id="element"></div>
            )
          }else {
            return node.pathDistance;
          }
        }
    
        return(
          <div id={node.id} 
               key={node.id} 
               className={CssClasses.item}
               style={node.style} 
               onMouseDown={onClickHandler}
               onMouseOver={onMouseHover}
               onMouseUp={onMouseRelease}>
                 {element()}
          </div>
        )
      })

      return(
        <div key={key++} className={CssClasses.wrapper}>
          {cols}
        </div>
      )
    }) : null;    

    return (
      <div className={CssClasses.center}>

        <div className={CssClasses.con}>
          <Draggable>
            <div>
              <h1>Hello</h1>
            </div>
          </Draggable>
          <ButtonGroup>
            <Button onClick={runDijcstra}>run</Button>
            <Button onClick={resetBoard}>clean</Button>
            <Button onClick={runMaze}>maze</Button>
            <Button onClick={PathRandomizer}>distance</Button>
          </ButtonGroup>
        </div>

        <div className={CssClasses.container}>
          {grid}
        </div>    
      </div>
    );
}

export default GridPath;
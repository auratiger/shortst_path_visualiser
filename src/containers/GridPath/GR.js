import React, {useState, useEffect} from 'react';
import {dijstraAlgorithm} from '../../algorithms/dijkstra';
import {generateMaze} from '../../algorithms/mazeGenerator';
import Node from '../Node/Node';

import CssClasses from "./GridPath.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, ButtonGroup } from 'react-bootstrap';

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const END_NODE_ROW = 20;
const END_NODE_COL = 24;
const ROWS = 30;
const COLS = 30;

const GridPath = () => {

    const [rerender, setRerender] = useState(false);
    const [board, setBoard] = useState([]);
    const [mouseDown, setMouseDown] = useState(false);

    useEffect(() => {

        let matrix = [];
        for(let row = 0; row < ROWS; row++){
          matrix.push([]);
          for(let col = 0; col < COLS; col++){

            let tentDistance = Infinity;

            if(START_NODE_ROW === row && START_NODE_COL === col){
              tentDistance = 0;
            }
            
            let node = new Node(row, col, tentDistance);

            matrix[row].push(node)
          }
        }
        
        setBoard(matrix);
    }, []);

    const resetBoard = () => {
        
        for(let row = 0; row < ROWS; row++){
          for(let col = 0; col < COLS; col++){
            
            if((START_NODE_ROW === row && START_NODE_COL === col) || 
                END_NODE_ROW === row && END_NODE_COL === col){
              continue;
            }

            board[row][col].tentDistance = Infinity;
            board[row][col].pathDistance = 1;
            board[row][col].wall = false;
            board[row][col].previusNode = null;
            board[row][col].style = {
                backgroundColor: 'white',
            };
          }
        }
        
        setRerender(!rerender);    
    }

    const runDijcstra = () => {
        // let startNode = this.state.matrix[START_NODE_ROW][START_NODE_COL];
        
        let endNode = board[END_NODE_ROW][END_NODE_COL];

        dijstraAlgorithm(board, endNode).then(setRerender(!rerender)); 
      }

    const runMaze = () => {
        resetBoard();
        generateMaze(board).then(setRerender(!rerender));
    }
        
    const colorChangeHandler = (id) => {
        
        let row = parseInt(id.substring(0, 2)); 
        let col = parseInt(id.substring(2));   

        let newMatrix = board;        
        newMatrix[row][col].wall = true;
        newMatrix[row][col].style = {
          backgroundColor: "red",
        }          
        
        setRerender(!rerender);
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
    let grid = board.map(row => {
      let cols = row.map(node => {
        
        let element = () => {           

          if(START_NODE_ROW === node.row && START_NODE_COL === node.col){
            return(
              <div className={CssClasses.start} id="element"></div>
            )
          }else if(END_NODE_ROW === node.row && END_NODE_COL === node.col){
            return(
              <div className={CssClasses.end} id="element"></div>
            )
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
    })    

    return (
      <div className={CssClasses.center}>

        <div className={CssClasses.con}>
          <ButtonGroup>
            <Button onClick={runDijcstra}>run</Button>
            <Button onClick={resetBoard}>clean</Button>
            <Button onClick={runMaze}>maze</Button>
          </ButtonGroup>
        </div>

        <div className={CssClasses.container}>
          {grid}
        </div>    
      </div>
    );
}

export default GridPath;
import React, {Component} from 'react';
import CssClasses from "./GridPath.module.css";
import {dijstraAlgorithm} from '../../algorithms/dijkstra';
import Node from './Node/Node';

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const END_NODE_ROW = 20;
const END_NODE_COL = 64;

class GridPath extends Component{

    constructor(){
        super()
    
        let rows = 27;
        let cols = 65;
    
        let matrix = [];
        for(let row = 0; row < rows; row++){
          matrix.push([]);
          for(let col = 0; col < cols; col++){

            let distance = Infinity;

            if(START_NODE_ROW === row && START_NODE_COL === col){
              distance = 0;
            }
            
            let node = new Node(row, col, distance);
            

            // remove this later !!!
            if(START_NODE_ROW === row && START_NODE_COL+2 === col){
              node.pathDistance = 10;              
            }
            // 

            matrix[row].push(node)
          }
        }
    
        this.state = {
          mouseDown: false,
          matrix: matrix,
          rows: rows,
          cols: cols,
        }
        
        this.matrixRerender = this.matrixRerender.bind(this);
        this.onMouseHover = this.onMouseHover.bind(this);
        this.onMouseRelease = this.onMouseRelease.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
      }

      matrixRerender(matrix) {
        this.setState({
          ...this.state,
          matrix: matrix,
        })
      }

      resetMatrix = () => {

        for(let row = 0; row < this.state.rows; row++){
          for(let col = 0; col < this.state.cols; col++){
            let node = this.state.matrix[row][col];

            let tentDistance = Infinity;

            if(START_NODE_ROW === row && START_NODE_COL === col){
              tentDistance = 0;
            }

            node.wall = false;
            node.tentDistance = tentDistance;
            node.pathDistance = 1;
            node.previusNode = null;
            node.style = {
                backgroundColor: '000',
            };
          }
        }
      }

      runDijcstra = () => {

        let startNode = this.state.matrix[START_NODE_ROW][START_NODE_COL];
        let endNode = this.state.matrix[END_NODE_ROW][END_NODE_COL];

        console.log(dijstraAlgorithm(this.state.matrix, startNode, endNode, this.matrixRerender).then()); 
      }

      colorChangeHandler = (id) => {
        if(id === 'element'){
          return;
        }
        
        let row = parseInt(id.substring(0, 2)); 
        let col = parseInt(id.substring(2));   
        
        let newMatrix = this.state.matrix;
        newMatrix[row][col].wall = true;
        newMatrix[row][col].style = {
          backgroundColor: "red",
        }          
        
        this.setState({
          ...this.state,
          matrix: newMatrix,
        })
      }

      onClickHandler(event) {
        event.preventDefault();

        this.colorChangeHandler(event.target.id);

        this.setState({
          ...this.state,
          mouseDown: true,
        })
      }

      onMouseRelease(event){
        this.setState({
          ...this.state,
          mouseDown: false,
        })
      }

      onMouseHover(event){
        if(!this.state.mouseDown){
          return
        }

        this.colorChangeHandler(event.target.id);        
      }

      render(){            
        
        let key = 0;
        let grid = this.state.matrix.map(row => {
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
                   onMouseDown={this.onClickHandler}
                   onMouseOver={this.onMouseHover}
                   onMouseUp={this.onMouseRelease}>
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
            <div className={CssClasses.container}>
              <button onClick={this.runDijcstra}>run</button>
              {grid}
            </div>    
          </div>
        );
    }
}

export default GridPath;
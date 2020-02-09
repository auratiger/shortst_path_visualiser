import React, {Component} from 'react';
import CssClasses from "./GridPath.module.css";

import Node from './Node/Node';

const START_NODE_ROW = 0;
const START_NODE_COL = 0;
const END_NODE_ROW = 20;
const END_NODE_COL = 20;

class GridPath extends Component{

    constructor(){
        super()
    
        let rows = 25;
        let cols = 60;
    
        let matrix = [];
        for(let row = 0; row < rows; row++){
          matrix.push([]);
          for(let col = 0; col < cols; col++){

            let id = "" + (row < 10 ? '0'+row : row) + (col < 9 ? '0'+col : col);  

            let node = new Node(id);

            matrix[row].push(node)
          }
        }
    
        this.state = {
          mouseDown: false,
          matrix: matrix,
        }
        
        this.onMouseHover = this.onMouseHover.bind(this);
        this.onMouseRelease = this.onMouseRelease.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
      }

      onClickHandler(event) {
        event.preventDefault();
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

        let id = event.target.id;
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

      dijkstraAlgorithm (){

      }

    
      render(){     
        
        let key = 0;
        let grid = this.state.matrix.map(row => {
          let cols = row.map(col => {
        
            return(
              <div id={col.id} 
                   key={col.id} 
                   className={CssClasses.item}
                   style={col.style} 
                   onMouseDown={this.onClickHandler}
                   onMouseOver={this.onMouseHover}
                   onMouseUp={this.onMouseRelease}>
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
              {grid}
            </div>    
          </div>
        );
    }
}

export default GridPath;
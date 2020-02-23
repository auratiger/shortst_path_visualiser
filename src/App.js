import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'; 
import CssClasses from "./App.module.css";
// import GridPath from './containers/GridPath/GridPath';
import GR from './containers/GridPath/GR';
import Layout from './components/Layout/Layout';

class App extends Component {

  renderPage = () => {
    return(
      <Switch>
        <Route path="/" component={GR}></Route>
      </Switch>
    )
  }

  render(){
    return(
      <div className={CssClasses.App}>
        <Layout>
          {this.renderPage()}
        </Layout>
      </div>
    )
  }
}

export default App;

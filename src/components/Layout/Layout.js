import React, {Component} from 'react';
import CssClasses from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

class Layout extends Component{
    render(){
        return(
            <div>
                <Toolbar/>
                <main className={CssClasses.center}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout;

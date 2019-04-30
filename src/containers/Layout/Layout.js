import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
  constructor(props){
    super(props);
    this.state = {
      showSideDrawer: false
    }
  }

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }  

  sideDrawerToggleHandler = () => {
    this.setState((currentState)=>{
      return {
        showSideDrawer: !currentState.showSideDrawer
      }
    })
  }

  render(){
    return (
      <Aux>
        <Toolbar 
          isAuth={this.props.isAuthenticated} 
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />        
        <SideDrawer 
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer} 
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>
          {
            // in here we want to output the component we wrap with this Layout component
            this.props.children
          }
        </main>
      </Aux>
    );
  }  
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);
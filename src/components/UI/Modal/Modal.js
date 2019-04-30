import React,{ Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop';


// NOTE : THE WRAPPING ELEMENT CONTROLS THE UPDATING OF THE WRAPPED ELEMENT --> MODAL controls ORDERSUMMARY

class Modal extends Component{

  shouldComponentUpdate(nextProps,nextState){
    // this if statement returns a boolean , which we can return in just one line like below    
    // if(nextProps.show !== this.props.show){
    //   return true;
    // }
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  componentWillUpdate(){
    // console.log('[Modal] Will Update');
  }

  render(){
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.closeModal}/>
        <div className={classes.Modal} style={{
          transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: this.props.show ? '1' : '0'
        }}>
          {this.props.children}
        </div>    
      </Aux>
    );  
  }
}

export default Modal;
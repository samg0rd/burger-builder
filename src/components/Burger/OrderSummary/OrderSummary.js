import React,{ Component } from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // this can go back to be a functional component because we check the will update lifecycle from the modal component
  // and we dont need shouldComponentUpdate bcuz this component should always update when modal is shown
  componentWillUpdate(){
    console.log('[OrderSummary] will UPDATE');
  }
  
  render(){
    const ingerdientSummary = Object.keys(this.props.ingredients).map((ingKey)=>{
      return (
        <li key={ingKey}>
          <span style={{textTransform:"capitalize"}}>{ingKey}</span>: {this.props.ingredients[ingKey]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>a delicious burger with the following ingerdients : </p>
        <ul>
          {ingerdientSummary}
        </ul>
        <p><strong>Total Price : {this.props.price}</strong></p>
        <p>Continue to checkout?</p>
        <Button clicked={this.props.cancel} btnType="Danger">CANCEL</Button>
        <Button clicked={this.props.continue} btnType="Success">CONTINUE</Button>      
      </Aux>
    );
  }
}

export default OrderSummary;
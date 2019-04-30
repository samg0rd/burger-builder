import React, { Component } from 'react';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {

  state = {    
    purchasing: false,    
  }
  
  
  componentDidMount() {
    this.props.initIngredients();
  }

  purchaseHandler = () => {
    if(this.props.isAuthenticated){
      this.setState({
        purchasing: true
      })
    }else{
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    } 
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {    
    // const queryParams = [];
    // for (const key in this.state.ingredients) {
    //   // console.log('burgerbuilder key check!',key);
    //   // key = meat , cheese , bacon , salad      
    //   queryParams.push(encodeURIComponent(key)+ "=" + encodeURIComponent(this.state.ingredients[key]))      
    // }
    // queryParams.push('price='+this.props.prc);
    // const queryString = queryParams.join('&');

    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: '?' + queryString
    // });

    // using redux we dont need to pass our props to the checkout component using queryParams
    this.props.initPurchase();
    this.props.history.push('/checkout');
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map((ingKey)=>{
      return ingredients[ingKey];
    }).reduce((sum,el)=>{
      return sum + el
    },0); 
    return sum > 0;
  }

  render() {

    const disabledInfo = {
      // ...this.state.ingredients
      ...this.props.ing
    }    

    for (const key in disabledInfo) {              
      disabledInfo[key] = disabledInfo[key] <= 0;              
    }

    let orderSummary = null;        
    let burger = this.props.error ? <p>Ingredients cant be loaded</p> : <Spinner />;

    if(this.props.ing){
      burger =  (
        <Aux>
          <Burger ingredients={this.props.ing} />        
          <BuildControls 
            ingredientAdded={this.props.addIngredientHandler} 
            ingredientRemoved={this.props.removeIngredientHandler} 
            disabled={disabledInfo} 
            purchasable={this.updatePurchaseState(this.props.ing)}
            price={this.props.prc.toFixed(2)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
            
          />
        </Aux>
        );
      orderSummary = <OrderSummary 
        ingredients={this.props.ing}
        cancel={this.purchaseCancelHandler}
        continue={this.purchaseContinueHandler}
        price={this.props.prc.toFixed(2)}
      />;
    }        

    // console.log(disabledInfo);        
    return (      
      <Aux>        
        <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>        
          {orderSummary}               
        </Modal>              
        {burger}
      </Aux>      
    );
  }
}

const mapStateToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    prc: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIngredientHandler: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
    removeIngredientHandler: (ingName) => dispatch(actionCreators.removeIngredient(ingName)),
    initIngredients: () => dispatch(actionCreators.initIngredients()),
    initPurchase: () => dispatch(actionCreators.initPurchase()),
    onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
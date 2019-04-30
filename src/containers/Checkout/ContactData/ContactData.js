import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component {
  state={
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'your name'
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        // touched means if the input has been touched ( typed in ) or not
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP CODE'
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: "test@test.com"
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value:"fastest", displayValue: "Fastest"},
            {value:"cheapest", displayValue: "Cheapest"}
          ]
        },
        validation:{},
        valid: true,
        value: "fastest",
      },
    },
    // we add this form is valid property to control the enable and disable form of the order/submit button
    formIsValid: false,
    // Loading: false
  }

  orderHandler = (e) => {
    e.preventDefault();
    // console.log('orderHandlerFunction -> : ',this.props);

    const formData = {};
    for (const formElementIdentifire in this.state.orderForm) {
      formData[formElementIdentifire] = this.state.orderForm[formElementIdentifire].value;
    }
    
    const order = {
      ingredients: this.props.ings,
      // on a real app we calculate the price on the server so the user wouldnt be able to manipulate the price before sending it
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    }
    
    this.props.onOrderBurger(order,this.props.token);    
  }

  // funtion that checks form validation --- rules argument is the validation object inside orderForm object in state, we use this function is changeInputHandler method
  // this function returns either true or false
  checkValidity(value, rules){
    let isValid = true;
    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }
    if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  changeInputHandler = (event, inputIdentifire) => {
    // console.log(event.target.value,inputIdentifire);
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    // console.log('updatedOrderForm ',updatedOrderForm);
    const updatedFormElement = {
      ...this.state.orderForm[inputIdentifire]
    }
    // console.log('updatedFormElement ',updatedFormElement);
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifire] = updatedFormElement;

    // console.log(updatedFormElement);
    let formIsValid = true;
    for (const inputIdentifire in updatedOrderForm) {
      // we add this && formIsValid becuz it might only get the last valid property value and that might be true and not false, so in this way we can override that problem
      formIsValid = updatedOrderForm[inputIdentifire].valid && formIsValid;
    }
    console.log('formIsValid : ',formIsValid);

    this.setState({
      orderForm : updatedOrderForm,
      formIsValid: formIsValid
    })

  }

  render() {
    const formElementArray = [];
    for (const key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    // console.log('formElementArray',formElementArray);

    let form = (<form onSubmit={this.orderHandler}>
                  {
                    formElementArray.map(el=>{
                      return <Input
                                key={el.id}
                                elementType={el.config.elementType}
                                elementConfig={el.config.elementConfig}
                                value={el.config.value}
                                invalid={!el.config.valid}
                                shouldValidate={el.config.validation}
                                touched={el.config.touched}
                                changed={(event)=>this.changeInputHandler(event,el.id)}
                              />;
                    })
                  }
                  <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                </form>);
                
    if(this.props.Loading){
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    onOrderBurger: (orderData,token) => dispatch(actionCreators.purchaseBurger(orderData,token))
  }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorHandler(ContactData,axios));

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


class Auth extends Component {
  state={
    controls : {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        // touched means if the input has been touched ( typed in ) or not
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'password'
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        // touched means if the input has been touched ( typed in ) or not
        touched: false
      },
    },
    isSignup: true
  }

  componentDidMount() {
    // make sure to reset the path if we are not building a burger
    if(!this.props.buildingBurger && this.props.authRedirectPath !== "/"){
      this.props.onSetAuthRedirectPath();
    }
  }
  

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

  inputChangedHandler = (event, controlName) => {
    const udatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      } 
    };
    this.setState({controls: udatedControls})
  }

  submitHandler = (event) => {
    event.preventDefault();    
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  switchAuthModeHandler = () => {
    this.setState((prevSate)=>{
      return {
        isSignup: !prevSate.isSignup
      }
    })
  }

  render() {
    const formElementArray = [];
    for (const key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }
    let form = formElementArray.map(el=>{
                  return <Input 
                          key={el.id}
                          elementType={el.config.elementType}
                          elementConfig={el.config.elementConfig}
                          value={el.config.value}
                          invalid={!el.config.valid}
                          shouldValidate={el.config.validation}
                          touched={el.config.touched}
                          changed={(event)=>this.inputChangedHandler(event,el.id)}
                          />                           
                })

    if(this.props.loading){
      form = <Spinner />
    }

    let errorMessage = null;

    if(this.props.error){
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    let authRedirect = null;
    if(this.props.isAuthenticated){
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button 
          clicked={this.switchAuthModeHandler} 
          btnType="Danger">
          SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email,password,isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
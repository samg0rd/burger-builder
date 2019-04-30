import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {

  let inputElement = null;
  const inputClasses = [classes.InputElement];

  // check if an input has invalid value
  if(props.invalid && props.shouldValidate && props.touched){
    inputClasses.push(classes.invalid);
  }

  // whatever the inputType props value be, the type of input we need will be rendered by the switch statement below
  // we can also add more cases like dropdown or whatever input we might wanna have too ;)
  switch (props.elementType) {
    case ('input'):
      inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>     
      break;
    case ('textarea'):
      inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>  
      break;
    case ('select'):
      inputElement = (
        <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
          {props.elementConfig.options.map(option=>{
            return <option key={option.value} value={option.value}>
                    {option.displayValue}
                  </option>
          })}
        </select>
      )
      break;
    default:
      inputElement = <input {...props.elementConfig} value={props.value} onchange={props.changed}/>
      break;
  }

  return (    
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
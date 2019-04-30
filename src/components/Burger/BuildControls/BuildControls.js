import React from 'react';
import classes from './BuildControls.module.css';

import BuildControl from './BuildControl/BuildControl';

const Controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
]

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}> 
    <p>Current Price: <strong> {props.price} </strong></p>
      {
        Controls.map((el)=>{
          return <BuildControl 
                  label={el.label} 
                  key={el.label} 
                  additem={()=>props.ingredientAdded(el.type)} 
                  removeItem={()=>props.ingredientRemoved(el.type)}
                  disabled={props.disabled[el.type]}
                />
        })
      }
      <button 
        disabled={!props.purchasable} 
        className={classes.OrderButton}
        onClick={props.ordered}
      >
      {props.isAuth ? 'ORDER NOW' : 'SIGN IN'}
      </button>
    </div>
  );
};

export default BuildControls;
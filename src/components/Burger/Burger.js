import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
// import {withRouter} from 'react-router-dom';

const Burger = (props) => {  
  // console.log(props);
  
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingKey)=>{
      return [
        ...Array(props.ingredients[ingKey])
      ].map((_,i)=>{
        return <BurgerIngredient key={ingKey + i} type={ingKey}/>;
      })
    }).reduce((prevVal,curVal)=>{
      return prevVal.concat(curVal);
    },[]);

  if(transformedIngredients.length === 0){
    transformedIngredients = <p>please start adding items</p>
  }

  // console.log(transformedIngredients);
  

  return (
    <div className={classes.Burger}>

      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}      
      <BurgerIngredient type="bread-bottom"/>      
      
    </div>
  );
};

// export default withRouter(Burger);
export default Burger;
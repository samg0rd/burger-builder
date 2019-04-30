import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName
  }
}

export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName
  }
}

export const setIngredients = (ingredients) => {
  // console.log('setIngredients actionCreator: ' ,ingredients);
  // we can change the order of the ingredients here 
  const updatedIng = {    
    salad: ingredients.salad,
    bacon: ingredients.bacon,
    meat: ingredients.meat,
    cheese: ingredients.cheese,    
  }  
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: updatedIng
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://react-my-burger-e0bbe.firebaseio.com/ingredients.json')
      .then(response => {        
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      })
  }
}
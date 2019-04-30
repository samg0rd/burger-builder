/* * * * * * * * * * * * * * * * * * *
  burger builder container
* * * * * * * * * * * * * * * * * * */
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';

/* * * * * * * * * * * * * * * * * * *
  checkout and contact data containers
* * * * * * * * * * * * * * * * * * */
// we only delare the 2 synchronus action types for the actionType we save here, because only these are meant to 
// be sent to the reducer
export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL';
// for sending the loading state if its loading or not
export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';
// for when we init the process of purchasing
export const ON_PURCHASE_INIT = 'ON_PURCHASE_INIT';

/* * * * * * * * * * * * * * * * * * *
  Orders container
* * * * * * * * * * * * * * * * * * */
export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL'; 

/* * * * * * * * * * * * * * * * * * *
  AUTHENTICATION
* * * * * * * * * * * * * * * * * * */

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';
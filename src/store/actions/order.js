import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import history from '../../history';

// we expect to get the id of the ordered burger
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseBurgerStart = () => {
  return { 
    type: actionTypes.PURCHASE_BURGER_START
  }
}

// this is the action we dispatch from the container once we clicked that order button
export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    // we dispatch this action to say its going to be in the loading phase
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json?auth=' + token, orderData)
      .then(response => {
        console.log(response.data.name);        
        // we dont use router here, we can of course get it via and argument, but we chose another option for redirecting later
        // this.props.history.push('/');              
        history.push('/');
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));                
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  }
}

export const initPurchase = () => {
  return {
    type: actionTypes.ON_PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = (token,userId) => {  
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/orders.json' + queryParams)
    .then(responce=>{        
      const fetchDataOrders = [];
      for (const key in responce.data) {
        fetchDataOrders.push({
          ...responce.data[key],
          id: key
        })
      }
      dispatch(fetchOrdersSuccess(fetchDataOrders));
    })
    .catch(error=>{      
      dispatch(fetchOrdersFail(error));
    })
  }
}
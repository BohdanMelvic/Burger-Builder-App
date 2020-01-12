import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngedientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGEDIENTS_FAILED
    }
} 

export const initIngredients = () => {
    return dispatch => {
        axios({
            method: 'get',
            url: '/ingredients.json',
            responseType: 'json',
            headers: {"Access-Control-Allow-Origin": "*"}
          }).then( res => {
            if (res.data === null) {
                dispatch( fetchIngedientsFailed() )
            } else {
                dispatch(setIngredients(res.data));
            }
            
        }).catch( error => {
            dispatch( fetchIngedientsFailed() );
        })
    }
}
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

export const fetchIngedientsFailed = (error) => {
    return {
        type: actionTypes.FETCH_INGEDIENTS_FAILED,
        error: error
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
            dispatch(setIngredients(res.data));
        }).catch( error => {
            dispatch(fetchIngedientsFailed(error))
        })
    }
}
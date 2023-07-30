import { SET_PRODUCTS, SET_SEARCH, CHANGE_PRODUCT_IN_CART, SET_CURRENT_USER, SET_ORDERS} from "../Constants/actions-types";

export const setProducts = products => {
    return {
        type: SET_PRODUCTS,
        payload: products
    }
}

export const setSearch = product => {
    return {
        type: SET_SEARCH,
        payload: product
    }
}

export const changeProductInCart = product => {
    return {
        type: CHANGE_PRODUCT_IN_CART,
        payload: product
    }
}

export const setCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}

export const setOrders = orders => {
    return {
        type: SET_ORDERS,
        payload: orders
    }
}
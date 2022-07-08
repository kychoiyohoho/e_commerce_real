import { createContext, useReducer } from "react";

//다른 컴포넌트에서 Store 이름으로 useContext 넣어서 사용가능하다
export const Store = createContext();

//초기 상태값
const initialState ={
    cart:{
        cartItems:localStorage.getItem('cartItems')? 
        JSON.parse(localStorage.getItem('cartItems')) :[]
    }
};
function reducer(state,action){
    switch(action.type){
        case 'CART_ADD_ITEM':
        //add to Cart
        const newItem = action.payload;
        const existItem = state.cart.cartItems.find(
            (item)=>item._id === newItem._id
        );
        const cartItems = existItem? state.cart.cartItems.map((item)=> item._id===existItem._id? newItem:item)
        :[...state.cart.cartItems, newItem];
        localStorage.setItem('cartItems',JSON.stringify(cartItems));
            return {...state, cart:{...state.cart, cartItems}};
        case 'CART_REMOVE_ITEM':{
            console.log("state from Store",state);
            const cartItems = state.cart.cartItems.filter(
                (item)=> item._id !== action.payload._id
            );
            localStorage.setItem('cartItems',JSON.stringify(cartItems));
            return {...state, cart:{...state.cart, cartItems}};
        }
    
   
        default:
            return state;
    }
}
//다른 컴포넌트에서 store 에 접근할 수 있다
export function StoreProvider(props){
    const[state, dispatch]=useReducer(reducer, initialState);
    const value={state,dispatch};  //공유할 값
  //value 에 상태랑 dspatch가 담겨 있다, Provider 로 감싸서 props.children 이 value 를 사용할 수 있게 했다

    return <Store.Provider value={value}>{props.children}</Store.Provider>
}
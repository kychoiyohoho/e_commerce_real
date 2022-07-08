import { createContext, useReducer } from "react";

//다른 컴포넌트에서 Store 이름으로 useContext 넣어서 사용가능하다
export const Store = createContext();

//초기 상태값
const initialState ={
    cart:{
        cartItems:[]
    }
};
function reducer(state,action){
    switch(action.type){
        case 'CART_ADD_ITEM':
        //add to Cart
        return{
            ...state,cart:{
                ...state.cart,cartItems:[...state.cart.cartItems,action.payload]
            }
        }
        default:
            return state;
    }
}
//다른 컴포넌트에서 store 에 접근할 수 있다
export function StoreProvider(props){
    const[state, dispatch]=useReducer(reducer, initialState);
    console.log("State",state)
    const value={state,dispatch};  //공유할 값
  //value 에 상태랑 dspatch가 담겨 있다, Provider 로 감싸서 props.children 이 value 를 사용할 수 있게 했다

    return <Store.Provider value={value}>{props.children}</Store.Provider>
}
import {createStore} from 'redux';

// Action generators - functions that return action objects

const incrementBy = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementBy = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const reset = ({} = {}) => ({
    type: 'RESET'
});

const set = ({ count } = {})=>({
    type: 'SET',
    count
});
// Reducer

const countReducer = (state={count:0}, action)=>{
    switch(action.type){
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
            case 'DECREMENT':                
                return {
                    count: state.count - action.decrementBy
            }
            case 'SET':
                return {
                    count: action.count
                }
            case 'RESET':
                return{
                    count: 0
                }
        default:
            return state;
    }    
};

// Redux Store
const store = createStore(countReducer);

const unsubscribe =store.subscribe(() => {
    console.log(store.getState());
}); 


// store.dispatch({
//     type:'INCREMENT'
// });

// store.dispatch({
//     type:'DECREMENT',
//     decrementBy: 10
// });

// store.dispatch({
//     type:'RESET'
// });

// store.dispatch({
//     type:'INCREMENT'
// });

// Call to dispatch Action by calling Action generators

console.log(store.dispatch(incrementBy({incrementBy:10})));
console.log(store.dispatch(set({count:10})));
console.log(store.dispatch(decrementBy({decrementBy:10})));
console.log(store.dispatch(decrementBy({decrementBy:10})));
console.log(store.dispatch(reset()));


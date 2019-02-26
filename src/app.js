import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';


const store = configureStore();

// store.subscribe(()=>{
//     const state = store.getState();
//     const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
//     console.log(visibleExpenses);
// });

// store.dispatch(addExpense({ description:'water bill', amount: 2500, createdAt: 300 }));
// store.dispatch(addExpense({ description:'gas bill', amount: 500, createdAt: 400 }));
// store.dispatch(setTextFilter('bill'));


const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>    
);

ReactDOM.render(jsx, document.getElementById('app'));

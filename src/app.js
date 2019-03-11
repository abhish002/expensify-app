import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import { firebase } from './firebase/firebase';

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

let hasRendered = false;

const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        // console.log('logged in');
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(()=>{
            renderApp();
            // redirect to dashboard page only if user is on login page
            if (history.location.pathname === '/') {
                history.push('/dashboard')
            }
        });        
    }else{
        // console.log('logged out');
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});

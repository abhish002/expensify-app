import { createStore, combineReducers } from 'redux';
import Uuid from 'uuid';

const demoState = {
    expenses: [{
        id: 'ass',
        description: 'description',
        note: 'This was the final payment',
        amount: 54500, // in cents to avoid any conversion problems
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        enddate: undefined
    }
};

// Add Expense Action
const addExpense = ({description='', note='', amount=0, createdAt=0}={}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: Uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// Remove Expense Action
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// Edit Expense Action
const editExpense = (id, updates ) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// Set Filter Text Action
const setTextFilter = (text='') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// Sortby Amount Filter Action
const sortByAmount = () => ({
    type:'SORT_BY_AMOUNT_FILTER'
});

// Sortby Date Filter Action
const sortByDate = () => ({
    type:'SORT_BY_DATE_FILTER'
});

// Set Start Date Action
const setStartDate = (date = undefined) => ({
    type: 'SET_START_DATE',
    date
});

// Set End Date Action
const setEndDate = (date = undefined) => ({
    type: 'SET_END_DATE',
    date
});

// Expenses reducer
const expensesReducer = (state = [], action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];

        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
            
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    };
                }else{
                    return expense;
                }
            });
                        
        default:
            return state;
    }
};

// Filters reducer
const filtersReducerDefaultState = {
    text:'',
    sortBy: 'date',
    startDate: undefined, // a value of zero refers to time at January 1st 1970 00:00am helps to create time zone independent dates
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };

        case 'SORT_BY_AMOUNT_FILTER':
            return {
                ...state,
                sortBy: 'amount'
            };

        case 'SORT_BY_DATE_FILTER':
            return {
                ...state,
                sortBy: 'date'
            };

        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date
            };

        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
            };        

        default:
            return state;
    }
};

// Get Visible Expenses or Filtered Expenses (filtered results)
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()) || expense.note.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1
        }else if(sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1
        }
    });
};

// Create Store with multiple reducers
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(()=>{
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    //console.log(state);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description:'rent', amount: 500, createdAt: 400}));
const expenseTwo = store.dispatch(addExpense({description:'coffee shop', amount: 10000, createdAt: 300}));
// const editExpenseTwo = store.dispatch(editExpense(expenseTwo.expense.id, {amount: 600}));
// const setTextFilterCall = store.dispatch(setTextFilter('rent'));
// const setTextFilterCallTwo = store.dispatch(setTextFilter());
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setStartDate(350));
// store.dispatch(setEndDate(500));

//store.dispatch(setTextFilter('shop'));


//console.log(editExpenseTwo);
//store.dispatch(removeExpense({ id:expenseOne.expense.id }));


// const obj = {
//     name: 'Abhi',
//     age: 23
// }

// console.log({
//     ...obj,
//     location: 'Philadelphia'
// });



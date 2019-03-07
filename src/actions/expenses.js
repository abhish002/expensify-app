import database from '../firebase/firebase';

// Add Expense Action
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

// Dispatches Add Expense as a function
export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const { description='', note='', amount=0, createdAt=0 } = expenseData;
        const expense = { description, note, amount, createdAt };

        return database.ref('expenses').push(expense).then(ref => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    }
}

// Remove Expense Action
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// Edit Expense Action
export const editExpense = (id, updates ) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_EXPENSES
export const setExpenses= (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

// async action to call and set expenses
export const startSetExpenses = () => {
    return((dispatch) => {
        const expenses = [];
        return database.ref('expenses').once('value').then((snapshot) => {            
            snapshot.forEach(expense => {
                expenses.push({
                    id: expense.key,
                    ...expense.val()
                });
            });
            dispatch(setExpenses(expenses));
        });
    });
}
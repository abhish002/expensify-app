import database from '../firebase/firebase';

// Add Expense Action
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

// Dispatches Add Expense as a function
export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const { description='', note='', amount=0, createdAt=0 } = expenseData;
        const expense = { description, note, amount, createdAt };
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/expenses`).push(expense).then(ref => {
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

// Async action to remove an expense
export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const ref = database.ref(`users/${uid}/expenses/${id}`);
        return ref.remove().then(() => {
            dispatch(removeExpense({ id }))
        });
    }
}

// Edit Expense Action
export const editExpense = (id, updates ) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// Async action to edit expense
export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;        
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates))
        });
    }
}

// SET_EXPENSES
export const setExpenses= (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

// async action to call and set expenses
export const startSetExpenses = () => {
    return((dispatch, getState) => {
        const expenses = [];
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {            
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
import Uuid from 'uuid';

// Add Expense Action
export const addExpense = ({description='', note='', amount=0, createdAt=0}={}) => ({
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
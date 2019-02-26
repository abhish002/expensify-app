import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense({ id:'123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', {
        description:'description'
    });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id:'123abc',
        updates: {
            description: 'description'
        }
    });
});

test('should setup Add Expense object with provided values', () => {
    const expenseData = {
        description:'rent',
        note:'House rent',
        amount: 100,
        createdAt: 100
    }
    
    const action = addExpense(expenseData);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseData
        }
    })
})

test('should generate Add Expense object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:{
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    })
})
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('set default state', ()=>{
    const state = expensesReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual([]);
});

test('should remove expense by id', ()=>{
    const action = {
        type:'REMOVE_EXPENSE',
        id:expenses[1].id
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]])
});

test('should not remove expense for wrong id', ()=>{
    const action = {
        type:'REMOVE_EXPENSE',
        id:'random'
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[1], expenses[2]])
});

test('should edit expense for given id', ()=>{
    const action = {
        type:'EDIT_EXPENSE',
        id: expenses[0].id,
        updates:{
            description: 'test'
        }
    }

    const state = expensesReducer(expenses, action);
    expect(state[0].description).toBe('test');
});

test('should not edit expense for wrong id', ()=>{
    const action = {
        type:'EDIT_EXPENSE',
        id: 'WRONGID',
        updates:{
            description: 'test'
        }
    }

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add expense without any data', ()=>{
    const action={
        type:'ADD_EXPENSE'
    }

    const state = expensesReducer(expenses, action);
    expect(state.length).toBe(4);
});

test('should add expense with some data', ()=>{
    const expense = {
        id:'123',
        description: 'description',
        note:'note',
        createdAt: moment().valueOf()
    }
    const action={
        type:'ADD_EXPENSE',
        expense
    }

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
});

test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
});


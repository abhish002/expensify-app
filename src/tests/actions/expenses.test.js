import { 
    startAddExpense, 
    addExpense, 
    editExpense, 
    removeExpense, 
    setExpenses , 
    startSetExpenses, 
    startRemoveExpense,
    startEditExpense 
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import consfigureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = consfigureMockStore([thunk]);
const uid = "fakeuid";

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, amount, note, createdAt}) => {
        expensesData[id] = {description, amount, note, createdAt};
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

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
    const action = addExpense(expenses[2]);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

// asynchronous test case
test('should add expense to database and store', (done) => {
    const store = createMockStore({auth: { uid }});
    const expenseData = {
        description: '',
        amount: 150,
        note: '',
        createdAt: 1000
    }

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');        
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

// asynchronous test case
test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({auth: { uid }});    
    
    const defaultExpenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }

    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions();
        
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultExpenseData
            }
        });        
        
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultExpenseData);
        done();
    });
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type:'SET_EXPENSES', 
        expenses
    });
});

test('should fetch expenses from firebase', (done)=>{
    const store = createMockStore({auth: { uid }});
    store.dispatch(startSetExpenses()).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});

test('should remove an expense from the database', (done)=>{
    const store = createMockStore({auth: { uid }});
    const id = expenses[1].id;
    store.dispatch(startRemoveExpense({id})).then(() => {
        const actions = store.getActions();        
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');        
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

// async test to see if a given expense was updated in firebase
test('should edit expense in firebase', (done) => {
    const store = createMockStore({auth: { uid }});
    const id = expenses[2].id;
    const updates = {
        description: 'updated description',
        amount: 100000
    }
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();        
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');        
    }).then((snapshot) => {
        expect(snapshot.val().description).toEqual('updated description');
        expect(snapshot.val().amount).toEqual(100000);
        done();
    });
});
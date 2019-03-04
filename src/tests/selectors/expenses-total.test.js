import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return sum of amount for given expenses object', () => {
    const total = getExpensesTotal(expenses);
    expect(total).toBe(114195);
});

test('should return zero for when there are no expenses', () => {
    const total = getExpensesTotal([]);
    expect(total).toBe(0);
});

test('should return sum of single expense', () => {    
    const total = getExpensesTotal([expenses[0]]);
    expect(total).toBe(195);
});
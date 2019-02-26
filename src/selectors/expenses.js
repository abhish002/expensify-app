import moment from 'moment';

// Get Visible Expenses or Filtered Expenses (filtered results)
export default (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const momentCreatedAt = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(momentCreatedAt, 'day'): true;
        const endDateMatch = endDate ? endDate.isSameOrBefore(momentCreatedAt, 'day') : true;
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
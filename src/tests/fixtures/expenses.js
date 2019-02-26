import moment from 'moment';

const expenses = [{
    id: '1',
    description: 'book',
    note:'book',
    amount: 195,
    createdAt: 0
},
{
    id: '2',
    description: 'rent',
    note:'rent',
    amount: 109500,
    createdAt: moment(0).subtract(4, 'days').valueOf()
},
{
    id: '3',
    description: 'gas',
    note:'gas',
    amount: 4500,
    createdAt: moment(0).add(4, 'days').valueOf()
}];

export default expenses;
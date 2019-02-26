const book = {
    title: 'Ego is the enemy',
    author: 'Ryan Holiday',
    Publisher: {
        //name: 'Penguin'
    }
}

const {name: publisherName = 'self-published'} = book.Publisher;

console.log(publisherName);


const item = ['coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [itemName,,medium] = item;
console.log(`A medium ${itemName} cost ${medium}`);
import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESAGING_SENDER_ID
  };

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.addScope('profile');
googleAuthProvider.addScope('email');

export { firebase, googleAuthProvider, database as default };
// expenses.forEach((expense)=>{
//     database.ref('expenses').push(expense);
// });
//   database.ref().set({
//       name: 'Abhish',
//       age: 26,
//       location: {
//           city: 'Kansas City',
//           state: 'Missouri'
//       }
//   });

//   database.ref('attributes').set({      
//         height: 168,
//         weight: 90      
//   }).then(()=>{
//       console.log('attributes added');
//   }).catch((e)=>{
//     console.log(`There was an error adding attributes. ${e}`);
//   });

// const onValChange = database.ref('expenses').on('value', (snapshot) => {
//     //console.log('data: ', snapshot.val());
//     const expenses = [];

//     snapshot.forEach((expense)=>{
//         expenses.push({
//             id: expense.key,
//             ...expense.val()
//         });
//     });

//     console.log(expenses);
// });


import Firebase from 'firebase';

Firebase.initializeApp({
  apiKey: 'AIzaSyDIoCyBM3IAMrkS6tH70sz1qtr6WaxhTmo',
  authDomain: 'hubsson-foosball-eur3.firebaseapp.com',
  databaseURL: 'https://hubsson-foosball-eur3.firebaseio.com',
  projectId: 'hubsson-foosball-eur3',
  storageBucket: 'hubsson-foosball-eur3.appspot.com',
  messagingSenderId: '978313456818',
});

export const database = Firebase.database();

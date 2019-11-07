import store from '../store';
import Firebase from 'firebase';

Firebase.initializeApp({
  apiKey: 'AIzaSyDIoCyBM3IAMrkS6tH70sz1qtr6WaxhTmo',
  authDomain: 'hubsson-foosball-eur3.firebaseapp.com',
  databaseURL: 'https://hubsson-foosball-eur3.firebaseio.com',
  projectId: 'hubsson-foosball-eur3',
  storageBucket: 'hubsson-foosball-eur3.appspot.com',
  messagingSenderId: '978313456818'
});

class FirebaseService {
  public readonly database = Firebase.database();

  public subscribeToAuthStateChange(): void {
    Firebase.auth().onAuthStateChanged((user) => {
      store.commit('setUser', user ? user.displayName : undefined);
    });
  }

}

const service = new FirebaseService();
export default service;

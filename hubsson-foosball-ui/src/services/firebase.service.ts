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

export type SupportedProvider = 'google' | 'github';

const supportedProvidersObject: { [k in SupportedProvider]: () => Firebase.auth.AuthProvider } = {
  github: () => new Firebase.auth.GithubAuthProvider(),
  google: () => new Firebase.auth.GoogleAuthProvider()
};


class FirebaseService {
  public readonly database = Firebase.database();

  public subscribeOnAuthStateChange(callback: (user: Firebase.User | null) => void) {
    Firebase.auth().onAuthStateChanged(callback);
  }

  public isAuthenticated(): boolean {
    return !!Firebase.auth().currentUser;
  }

  public login(providerName: SupportedProvider) {
    const provider = supportedProvidersObject[providerName]();

    Firebase.auth()
      .signInWithPopup(provider);
  }

  public logout() {
    Firebase.auth().signOut();
  }
}

const service = new FirebaseService();
export default service;

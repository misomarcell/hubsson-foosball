import firebaseService from './firebase.service';


class MatchService {
    // private matchRef = firebaseService.database.ref('matches');

    public subsrcibeOnMatchValue(id: string, callback: (snapshot: any) => void) {
        firebaseService.database.ref(`matches/${id}`).on('value', callback);
    }
}

const service = new MatchService();
export default service;

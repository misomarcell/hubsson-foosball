import firebaseService from './firebase.service';


class ActiveMatchService {
    private activeMatchRef = firebaseService.database.ref('activeMatch');

    public subsrcibeOnValue(callback: (snapshot: any) => void) {
        this.activeMatchRef.on('value', callback);
    }
}

const service = new ActiveMatchService();
export default service;

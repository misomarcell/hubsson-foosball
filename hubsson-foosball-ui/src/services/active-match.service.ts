import firebaseService from './firebase.service';
import { docData } from 'rxfire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActiveMatch } from '@/models/activeMatch';

class ActiveMatchService {
    private activeMatchRef = firebaseService.database.ref('activeMatch');


    public getActiveMatch$(): Observable<ActiveMatch | undefined>
    {
        return docData(firebaseService.firestore.doc('activeMatch')).pipe(map((x: any) => x ? x.data() : undefined));
    }

}

const service = new ActiveMatchService();
export default service;

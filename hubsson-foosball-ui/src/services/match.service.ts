import firebaseService from './firebase.service';
import { docData } from 'rxfire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Match } from '@/models/match';


class MatchService {

    public getMatch$(matchId: string): Observable<Match>
    {
        return docData(firebaseService.firestore.collection('matches').doc(matchId))
            .pipe(
                map((match: any) => match.data())
            );
    }
}

const service = new MatchService();
export default service;

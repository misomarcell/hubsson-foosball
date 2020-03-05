import firebaseService from './firebase.service';
import { docData, collectionData } from 'rxfire/firestore';
import { map, tap, startWith } from 'rxjs/operators';
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

    public getMatches$(): Observable<Match[]>
    {
        return collectionData(firebaseService.firestore.collection('matches').orderBy('startTime', 'desc'), 'id');
    }
}

const service = new MatchService();
export default service;

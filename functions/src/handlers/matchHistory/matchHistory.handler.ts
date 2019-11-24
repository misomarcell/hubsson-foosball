import { Request, Response } from "express";
import * as admin from "firebase";

admin.initializeApp({
    apiKey: 'AIzaSyDIoCyBM3IAMrkS6tH70sz1qtr6WaxhTmo',
    authDomain: 'hubsson-foosball-eur3.firebaseapp.com',
    databaseURL: 'https://hubsson-foosball-eur3.firebaseio.com',
    projectId: 'hubsson-foosball-eur3',
    storageBucket: 'hubsson-foosball-eur3.appspot.com',
    messagingSenderId: '978313456818'
});

export function getMatchHistoryHandler(request: Request, response: Response) {
    admin.database().ref("activeMatch").once("value")
        .then(
            currentMatch => {
                response.send(currentMatch.val());
            }
        )
        .catch((error: any) => {
            response.send(error);
        });
}

export function putMatchHistoryHandler(request: Request, response: Response) {
    admin.database().ref("activeMatch")
        .once("value")
        .then((activeMatchResult: any) => {
            let activeMatch = {} as any;
            try {
                activeMatch = activeMatchResult.val();
            }
            catch (e) {
                throw e;
            }

            const team01 = request.body.team01;
            const position01 = request.body.position01;

            const historyEntry = {
                player01: activeMatch[team01][position01],
                player02: null,
                time: new Date().toUTCString(),
                type: request.body.action
            };

            if (request.body && request.body.team02 && request.body.position02) {
                const team02 = request.body.team02;
                const position02 = request.body.position02;
                historyEntry.player02 = activeMatch[team02][position02]
            }

            admin.database()
                .ref('matches/' + activeMatch.matchId + "/history")
                .push(historyEntry)
                .then(result => {
                    response.send(result);
                })
                .catch(error => { throw error });
        })
        .catch((error: any) => {
            response.send(error);
        });
}

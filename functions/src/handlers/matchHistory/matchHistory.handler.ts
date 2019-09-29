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
        .then(activeMatchResult => {
            let activeMatchId = "";
            try {
                activeMatchId = activeMatchResult.val().matchId;
            }
            catch (e) {
                throw e;
            }

            const newScore = {
                player: request.body["buttonId"],
                time: new Date().toUTCString(),
                type: request.body["action"]
            };

            admin.database()
                .ref('matches/' + activeMatchId + "/history")
                .push(newScore)
                .then(result => {
                    response.send(result);
                })
                .catch(error => { throw error });
        })
        .catch((error: any) => {
            response.send(error);
        });
}

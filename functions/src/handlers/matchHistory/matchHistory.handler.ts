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

export async function getMatchHistoryHandler(request: Request, response: Response) {
    await admin.database().ref("matches").limitToFirst(1).once("value",
        currentMatch => {
            response.send(currentMatch.val());
        },
        (error: any) => {
            response.send(error);
        });
}

export async function postMatchHistoryHandler(request: Request, response: Response) {
    admin.database().ref("activeMatch").limitToFirst(1).once("value",
        activeMatchSnapshot => {
            const activeMatch = activeMatchSnapshot!.val();
            if (!activeMatch || !activeMatch.matchId) {
                return;
            }

            admin.database()
                .ref(`matches/${activeMatch.matchId}`)
                .limitToFirst(1)
                .once("value", matchSnapshot => {
                    const match = matchSnapshot.val();
                    const update = {} as any;

                    const newScore = {
                        player: request.body["buttonId"],
                        time: new Date().toUTCString(),
                        type: "goal"
                    };

                    update['/history'] = match[activeMatch.matchId].history
                        ? [newScore, ...match[activeMatch.matchId].history]
                        : [newScore];

                    admin.database()
                        .ref('matches/' + activeMatch.matchId)
                        .update(
                            update,
                            result => {
                                response.send(result);
                            });
                });
        },
        (error: any) => {
            response.send(error);
        });
}

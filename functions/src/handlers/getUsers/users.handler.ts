import { Request, Response } from "express";
import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://hubsson-foosball-eur3.firebaseio.com'
});

export function getUsers(request: Request, response: Response) {
    admin.auth().listUsers(100).then((listUsersResult) =>
        response.send(listUsersResult)
    ).catch(function (error) {
        console.log('Error listing users:', error);
        response.send(error);
    });
}
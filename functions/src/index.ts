import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';

import { getMatchHistoryHandler, putMatchHistoryHandler } from "./handlers/matchHistory/matchHistory.handler";
import { getUsers } from './handlers/getUsers/users.handler';

const matchHistoryApp = express();
const usersApp = express();

matchHistoryApp.use(cors({ origin: true }));
usersApp.use(cors({ origin: true }));

usersApp.get('/', getUsers);
matchHistoryApp.get('/', getMatchHistoryHandler);
matchHistoryApp.put('/', putMatchHistoryHandler);

// exported function names that are visible in firebase
exports.matchHistory = functions.https.onRequest(matchHistoryApp);
exports.users = functions.https.onRequest(usersApp);
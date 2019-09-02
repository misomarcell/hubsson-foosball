import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';

import { getMatchHistoryHandler, postMatchHistoryHandler } from "./handlers/matchHistory/matchHistory.handler";

const app = express();

app.use(cors({ origin: true }));

app.get('/', getMatchHistoryHandler);
app.post('/', postMatchHistoryHandler);

// exported function names that are visible in firebase
exports.matchHistory = functions.https.onRequest(app);

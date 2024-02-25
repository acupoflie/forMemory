

import { getUserBySessionToken } from '../db/users';
import express from 'express';

import {get, merge} from 'lodash';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['EX-AUTH'];
        if(!sessionToken) {
            res.sendStatus(404);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if(!existingUser) {
            res.sendStatus(403);
        }

        merge(req, {identity: existingUser});

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
}
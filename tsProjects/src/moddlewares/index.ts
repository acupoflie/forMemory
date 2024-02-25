

import { getUserBySessionToken } from '../db/users';
import express from 'express';

import {get, merge} from 'lodash';

//! important note for using lodash
// merge(req, {myIdentity: existingUser});
// get(req, 'myIdentity._id') as string



//! we have problem with this
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['EX-AUTH'];
        if(!sessionToken) {
            return res.sendStatus(404);
        }
        console.log(sessionToken)
        const token = 'WNGDW3Ua38CbxFi0wz7GWnvGRGV4ZspwMxfiY2HBTCs%3D'

        const existingUser = await getUserBySessionToken(sessionToken);

        if(!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, {identity: existingUser});

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
}
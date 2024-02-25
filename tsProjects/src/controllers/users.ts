
import express from 'express';
import { UserModel } from '../db/users'

import { getUsers } from '../db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        console.log('fck1')
        const users = await getUsers();
        console.log('fck2')
        res.sendStatus(200).json(users).end();

    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
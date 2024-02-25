
import express from 'express';
import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.sendStatus(400).json({message: 'provide datas'});
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if(!user) {
            return res.sendStatus(400).json({message: "user not exist"});
        }

        const expectedHash = authentication(user.authentication[0].salt, password);

        if(user.authentication[0].password != expectedHash) {
            return res.sendStatus(403)
        }

        const salt = random();
        user.authentication[0].sessionToken = authentication(salt, user._id.toString());
        await user.save();

        res.cookie('EX-AUTH', user.authentication[0].sessionToken, {domain: 'localhost', path: '/'});

        res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const {email, username, password} = req.body;
        if(!email || !username || !password) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser) {
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: [{
                salt,
                password: authentication(salt, password)
            }]
        });

        return res.status(200).json(user).end()

    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
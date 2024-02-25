

import express from 'express';

import { getAllUsers, deleteUser } from '../controllers/users';
import { isAuthenticated } from '../moddlewares'; 

export default (router: express.Router) => {
    router.get('/users', getAllUsers);
    router.delete('/users/:id', deleteUser)
};
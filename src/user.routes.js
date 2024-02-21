import express from 'express';
import { expressYupMiddleware } from 'express-yup-middleware';

import userController from './controllers/user.controller';
import {addUser,updateUser,getUser, deleteUser } from './user.schemas';

const router = express.Router();

const STATUS = {
    success: 'OK',
    failure: 'NO'
};

router.get('/all', userController.getAllUsers);

router.get(
    '/:id', 
    expressYupMiddleware({
        schemaValidator: getUser
    }),
    userController.getUser);

router.post(
    '/', 
    expressYupMiddleware({
        schemaValidator: addUser, 
    }),
    userController.addUser
);

router.put(
    '/:id', 
    expressYupMiddleware({
        schemaValidator: updateUser, 
    }),
    userController.updateUser
);

router.delete(
    '/:id', 
    expressYupMiddleware({
        schemaValidator: deleteUser,
    }),
    userController.deleteUser
)

export default router;
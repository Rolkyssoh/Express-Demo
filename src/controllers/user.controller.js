import { StatusCodes } from "http-status-codes";
import pino from "pino";

import userService from "../services/user.service";

const logger = pino();
const STATUS = {
    success: 'OK',
    failure: 'NO'
};

/**
 * @param req 
 * @param res 
 * @returns {*}
 */
const getAllUsers = (req, res) => {
    const users= userService.getAllUsers();

    if(users.length){
        return res.status(StatusCodes.OK).send(users);
    }

    return res.status(StatusCodes.NOT_FOUND).send(
        {
            status: STATUS.failure,
            message: 'No users found.',
        }
    )
};

/**
 * Retrieve a user
 * @param req 
 * @param res 
 * @returns {*}
 */
const getUser = (req, res) => {
    // localhost/v1/user/get/1
    const id = parseInt(req.params.id)
    const user= userService.getUser(id);

    if(user){
        logger.info(`Retrieving ${id} user.`);
        return res.status(StatusCodes.OK).send({
            status: STATUS.success,
            user
        });
    }

    return res.status(StatusCodes.NOT_FOUND).send(
        {
            status: STATUS.failure,
            message: 'No user found.',
        }
    )
};

/**
 * Add a user
 * @param req 
 * @param res 
 * @returns {*}
 */
const addUser = (req, res) => {
    const data = [];
    const {body: user} = req;

    const addedUser = userService.addUser(user);

    logger.info('Creating a user');
    
    console.log('the request:::::', data)
    res.status(StatusCodes.CREATED).send({
        status: STATUS.success,
        user: addedUser,
    });
};

/**
 * update a user
 * @param req 
 * @param res 
 * @returns {*}
 */
const updateUser = (req, res) => {
    const {body: user} = req;

    const id = parseInt(req.params.id, 10);

    const updatedUser = userService.updateUser(id, user);
        
    if(updatedUser){
        logger.info(`Updating ${id} user`);
        return res.status(StatusCodes.OK).send({
            status: STATUS.success,
            user: updatedUser,
        });

    } else {
        return res.status(StatusCodes.NOT_FOUND).send({
            status: STATUS.failure,
            message: `User with id ${id} is not found!!!`,
        })
    }
};

/**
 * delete a user
 * @param req 
 * @param res 
 * @returns {*}
 */
const deleteUser = (req, res) => {
    const {params} = req;

    const id = parseInt(params.id);
    const user = userService.getUser(id);
    if(user){
        userService.removeUser(id);
        logger.info('Removing a user');
        return res.status(StatusCodes.OK).send({
            status: STATUS.success,
            message: `User ${id} han been deleted.`
        });
    } else {
        return res.status(StatusCodes.NOT_FOUND).send({
            status: STATUS.failure,
            message: `User ${id} hasn't been deleted.`
        })
    }    
};

export default {
    getAllUsers,
    getUser,
    addUser, 
    updateUser,
    deleteUser,
}
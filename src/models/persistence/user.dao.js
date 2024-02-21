import users from '../data/users.data';

const get = (userId) => {
    const findUser = users.find((user) => user.id === userId);

    return findUser;
}

const getAll = () => {
    return users;
}

/**
 * Update a user from its ID
 * @param {integer} userId 
 * @param {object} newDetails 
 * @returns {boolean|*}
 */
const update = (userId,newDetails) => {
    let existingUser  = null;
    let userIndex;
    users.map((user, index) => {
        if(user.id === userId){
            existingUser = user;
            userIndex = index;
        } 
    });

    if(!existingUser) {return null};

    const updatedUser = {
        ...existingUser,
        ... newDetails
    };
    users.splice(userIndex, 1, updatedUser);

    return updatedUser;
}

/**
 * Insert a user
 * @param details 
 * @returns {*&{id:number}} 
 */
const insert = (details) => {
    const newUser = {id: users.length+1, ...details};
    users.push(newUser);

    return newUser;
}

/**
 * Remove a user from its ID
 * @param userId 
 * @returns {*} 
 */
const remove = (userId) => {
    return users.find((user, index) => {
        if(user.id === userId) {
            users.splice(index, 1);
            return true;
        }
        return false;
    });
}

export default{
    get,
    getAll,
    update,
    insert,
    remove,
}
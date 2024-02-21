import * as Yup from 'yup';

const MIN_LENGTH = {
    name: 3,
    city: 2,
    country: 3
};

const MAX_LENGTH = {
    name:30,
    city: 25,
    country: 35
};

export const getUser = {
    schema: {
        params:{
            yupSchema: Yup.object().shape({
                id: Yup.number().required(),
            })
        }
    }
}

export const addUser = {
    schema: {
        body: {
            yupSchema: Yup.object().shape({
                name: Yup.string().min(MIN_LENGTH.name).max(MAX_LENGTH.name),
                email: Yup.string().email(),
                city: Yup.string().min(MIN_LENGTH.city).max(MAX_LENGTH.city),
                country: Yup.string().min(MIN_LENGTH.country).max(MAX_LENGTH.country),
            })
        }
    }
}

export const updateUser = {
    schema: {
        params:{
            yupSchema: Yup.object().shape({
                id: Yup.number().required(),
            })
        },
        body: {
            yupSchema: Yup.object().shape({
                name: Yup.string(),
                email: Yup.string().email(),
                city: Yup.string(),
                country: Yup.string(),
            })
        }
    }
}

export const deleteUser = {
    schema: {
        params:{
            yupSchema: Yup.object().shape({
                id: Yup.number().required(),
            })
        }
    }
}
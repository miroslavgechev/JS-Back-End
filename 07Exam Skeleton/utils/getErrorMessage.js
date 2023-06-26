
function getFirstMongoError(error) { 
    // const errors = Object.keys(error.errors).map(key => error.errors[key].message);
    // return errors[0];

    const firstError = Object.values(error.errors)[0].message;
    return firstError;
}

exports.getErrorMessage = (error) => {

    switch (error.name) {
        case 'Error':
            return error.message;
        case 'ValidationError':
            return getFirstMongoError(error);
        // case 'MongooseError':
        //     return getFirstMongoError(error);
        default:
            return error.message;
    }

}
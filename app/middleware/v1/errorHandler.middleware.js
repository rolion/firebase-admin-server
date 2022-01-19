const boom = require('@hapi/boom');
const {config} = require('../../config');
function withErrorStack(error, stack){
    if(config.dev){
        return {...error, stack};
    }
    return error;
}

function logErrors(err, req, res, next){

    //myLogger.log('error',`reqId: ${err.reqId} stack: ${err.stack}`);
    console.log(`from error handler`, err);
    next(err);
}

function wrapError(error, req, res, next){
    if(!error.isBoom){
        let newWrappedError;
        if(error.source !== undefined){
            if(error.type == config.errorType.validation){
                newWrappedError=boom.badRequest(error.message);
            }else{
                newWrappedError=boom.badImplementation(error.message);
            }
            newWrappedError.reformat();
        }else{
            newWrappedError=boom.badImplementation(error);
        }
        next(newWrappedError);
    }else{
        next(error);
    }
}

function errorHandlers(err, req, res, next){
    const { output: {statusCode, payload}} = err;
    res.status(statusCode);
    res.json(withErrorStack(payload, err.stack));
}

module.exports ={
    logErrors,
    wrapError,
    errorHandler: errorHandlers
}

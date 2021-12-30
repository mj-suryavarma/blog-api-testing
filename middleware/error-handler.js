import {StatusCodes} from 'http-status-codes';
import {CustomApiError} from '../errors/index.js';


const ErrorHandlerMiddleware = (err, req, res, next) => {


    if(err instanceof CustomApiError) {
        return res.status(err.statusCode).json({msg: err.message});
    }

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("something went wrong..");


    next();
}

export default ErrorHandlerMiddleware;
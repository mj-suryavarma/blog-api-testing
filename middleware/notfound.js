import { StatusCodes } from "http-status-codes";

const NotFound = (req,res,next) => {

    res.status(StatusCodes.NOT_FOUND).send("Router does not exist");

    next();
}

export default NotFound;

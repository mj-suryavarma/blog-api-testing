 
class CustomApiError extends Error {

    constructor(message, statusCode) {
         super(message);

    }

}

export default CustomApiError;
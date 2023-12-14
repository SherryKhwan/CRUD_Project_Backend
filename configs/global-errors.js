class GlobalErrors {
    constructor() { }  

    static INTERNAL_SERVER_ERROR = {
        code: 500,
        message: 'Internal Server Error.'
    };
    
    static INTERNAL_SERVER_ERROR_WITH_MESSAGE(e) {        
        return {
            code: 500,
            message:  'Internal server error occured when ' + e.message
        }
    }

    static CONFLICT(e) {        
        return {
            code: 406,
            message: e.message
        }
    }

    static NOT_FOUND(e) {        
        return {
            code: 404,
            message: e.message
        }
    }

    static INVALID_PAYLOAD(e) {        
        return {
            code: 403,
            message: e.message
        }
    }

    static UNAUTHORIZED(e) {        
        return {
            code: 401,
            message: e.message
        }
    }

    static SESSION_EXPIRED(e) {        
        return {
            code: 440,
            message: e.message
        }
    }

}
module.exports = GlobalErrors;
class ApiError extends Error{
    constructor(statusCode,message="something went wrond",errors=[]){
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors;
    }
}

module.exports = {
    ApiError
}
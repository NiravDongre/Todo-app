

class CustomError extends Error {
    constructor(StatusCode, message) {
        super(message)
        this.StatusCode = StatusCode
        this.Status = StatusCode >= 400 || StatusCode <= 500 ? "fail" : "error"
        this.isOperation = true

        Error.captureStackTrace(this.constructor)
    }
}

module.exports = CustomError
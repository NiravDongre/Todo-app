
const errorMiddleware = async( err, req, res, next) => {
    const status = err.status || "fail";
    const StatusCode = err.StatusCode || 500
    const message = err.message || "Backend Error"

    return res.status(StatusCode).json({status ,message})
}

module.exports = {
    errorMiddleware
}
// const errorHandlerMiddleware = (err, req, res, next) => {
//     console.log("Inside error handleer middleware")
//     const status = err.status === 200 ? 500 : err.status;
//     res.status(status)
//         .json({
//             message: err.message,
//             status: process.env.NODE_ENV === 'development' ? null : err.stack
//         })
// }


const errorHandlerMiddleware = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

module.exports = { errorHandlerMiddleware }
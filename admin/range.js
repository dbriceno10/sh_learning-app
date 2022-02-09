module.exports=(req, res, next)=>{
    res.header('content-Range', 'users 0-10/10');
    next()
}
export function requestTime(req, res, next){
    req.requestTime = Date.now();
    next();
}

export function logger(req, res, next){
    console.log(`request time: ${req.requestTime}`);
    console.log(req.path);
    console.dir(req.query);
    console.dir(req.body);
    next();
}
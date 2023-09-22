import { NextFunction, Request, Response } from 'express';

/** Define try catch async */
const catchAsync = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};

export default catchAsync;

import type { Request, Response, NextFunction } from "express";

type AsyncFuncTionType = (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<void>;

function asyncErrorHandler(func: AsyncFuncTionType) {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch(next);
    };
}

export default asyncErrorHandler;

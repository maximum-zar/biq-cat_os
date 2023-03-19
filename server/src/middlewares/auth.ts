import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import default_env from '../lib/default_env';

const getTokenFromHeader = (req: Request) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        return req.headers.authorization.split(' ')[1];
};

export function verifyUserToken(req: Request, res: Response & { user: string | JwtPayload }, next: NextFunction) {
    try {
        const token = getTokenFromHeader(req);
        if (token === 'null' || !token)
            return res.status(401).json({
                message: 'Access denied / Unauthorized request',
            });

        let verifiedUser = verify(token, process.env.JWT_SECRET || default_env.JWT_SECRET);
        if (!verifiedUser)
            return res.status(401).json({
                message: 'Unauthorized request',
            });

        res.user = verifiedUser;
        next();
    } catch (error) {
        res.status(400).json({
            message: 'Invalid token',
        });
    }
}

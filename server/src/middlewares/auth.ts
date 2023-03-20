import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import default_env from '../lib/default_env';

export function verifyUserToken(req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) {
    try {
        const session: typeof req.session & { jwt?: string } = req.session;
        const token = session.jwt;
        if (token === 'null' || !token) return res.redirect('/users/login');

        let verifiedUser = <JwtPayload>verify(token, process.env.JWT_SECRET || default_env.JWT_SECRET);
        if (!verifiedUser)
            return res.status(401).json({
                message: 'Unauthorized request',
            });

        req.user = verifiedUser;
        next();
    } catch (error) {
        res.status(400).json({
            message: 'Invalid token',
        });
    }
}

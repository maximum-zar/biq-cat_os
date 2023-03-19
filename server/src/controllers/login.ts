import { pbkdf2Sync } from 'crypto';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import sendError500 from '../lib/error500';
import generateJWT from '../lib/generateJWT';
import User, { generatePayload } from '../models/User';

export default function login(req: Request, res: Response) {
    const body = req.body as Object;
    if (
        'username' in body &&
        typeof body.username === 'string' &&
        'password' in body &&
        typeof body.password === 'string' &&
        'login' in body
    ) {
        User.findOne({ username: body.username })
            .exec()
            .then(
                (user) => {
                    if (user) {
                        const hash = pbkdf2Sync(<string>body.password, user.salt, 1000, 64, 'sha512').toString('hex');
                        if (hash === user.password) {
                            const payload = generatePayload(user);
                            res.status(201).json({ user: payload, jwt: generateJWT(payload) });
                        } else res.status(400).json({ message: 'Incorrect password' });
                    } else {
                        res.status(400).json({ message: 'User not exist' });
                    }
                },
                (reason) => sendError500(reason, res),
            );
    } else {
        res.status(400).json({ message: 'Invalid data signature' });
    }
}

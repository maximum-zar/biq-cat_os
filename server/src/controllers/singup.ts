import { Request, Response } from 'express';
import sendError500 from '../lib/error500';
import generateJWT from '../lib/generateJWT';
import * as validation from '../lib/validation';
import User, { generatePayload } from '../models/User';

export default function (req: Request, res: Response) {
    validation.singup(
        req.body as Object,
        (body) =>
            createUser(
                {
                    name: body.name,
                    birthday: new Date(body.birthday),
                    username: body.username,
                    password: body.password,
                },
                res,
            ),
        (signature) =>
            signature
                ? res.status(400).json({ message: 'Invalid data signature' })
                : res.status(400).json({ message: 'Invalid data' }),
    );
}

function createUser(body: { name: string; birthday: Date; username: string; password: string }, res: Response) {
    User.exists({ username: body.username })
        .exec()
        .then(
            (value) => {
                if (value === null) {
                    const user = new User({
                        name: body.name,
                        birthday: body.birthday,
                        username: body.username,
                        password: body.password,
                    });

                    user.save().then(
                        (value) => {
                            const payload = generatePayload(value);
                            res.status(201).json({ user: payload, jwt: generateJWT(payload) });
                        },
                        (reason) => sendError500(reason, res),
                    );
                } else {
                    res.status(400).json({ message: 'User exists' });
                }
            },
            (reason) => sendError500(reason, res),
        );
}

import { Request, Response } from 'express';

export default function (req: Request, res: Response, js: boolean) {
    const body = req.body as Object;
    let email: string | undefined = undefined;
    if (
        'birthday' in body &&
        typeof body.birthday === 'string' &&
        'name' in body &&
        typeof body.name === 'string' &&
        'username' in body &&
        typeof body.username === 'string' &&
        'password' in body &&
        typeof body.password === 'string' &&
        'confirm-password' in body &&
        typeof body['confirm-password'] === 'string' &&
        'register' in body
    ) {
        // Checking body type
        if (
            body.birthday.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/) &&
            body.password === body['confirm-password'] &&
            body.password.length >= 8 &&
            body.password.length < 16
        ) {
        }
    }
}

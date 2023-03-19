import { Response } from 'express';

export default function sendError500(reason: any, res: Response) {
    res.sendStatus(500);
    console.error(reason);
}

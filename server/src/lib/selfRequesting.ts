import axios, { AxiosError, AxiosResponse } from 'axios';
import { Request, Response } from 'express';

export default function (
    req: Request,
    res: Response,
    port: string | number,
    url: string,
    cb: (response: AxiosResponse<any, any>) => void,
) {
    axios
        .post(`${req.protocol}://${req.hostname}:${port}/${url}`, req.body)
        .then(cb)
        .catch((error: AxiosError<any, any>) => {
            if (error.response) {
                if (error.response.status >= 500) {
                    res.sendStatus(error.response.status);
                } else {
                    res.status(error.response.status).send(error.response.data.message);
                }
            } else if (error.request) {
                res.status(500).send(error.request);
            } else {
                res.status(500).send('Error: ' + error.message);
            }
            console.log(error.config);
        });
}

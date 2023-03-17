import { json as expressJSON, Request, Response, Router, urlencoded as expressUrlencoded } from 'express';
import singup from '../controllers/singup';
export default function (): Router {
    const router = Router();
    router.post('/singup', expressUrlencoded({ extended: false }), (req: Request, res: Response) =>
        singup(req, res, false),
    );
    router.post('/add_user', expressJSON(), (req: Request, res: Response) => singup(req, res, true));
    return router;
}

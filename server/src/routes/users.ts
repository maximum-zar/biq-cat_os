import { json as expressJSON, Request, Response, Router, urlencoded as expressUrlencoded } from 'express';
import login from '../controllers/login';
import singup from '../controllers/singup';
const router = Router();
router.post('/singup', expressJSON(), singup);
router.post('/login', expressJSON(), login);
export default router;

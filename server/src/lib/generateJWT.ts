import { sign } from 'jsonwebtoken';
import default_env from './default_env';

export default function generateJWT(payload: object) {
    const secret = process.env.JWT_SECRET || default_env.JWT_SECRET;
    return sign({ payload }, secret, { expiresIn: '6h' });
}

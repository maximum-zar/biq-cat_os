import express, { response, Router, urlencoded } from 'express';
import { join } from 'path';
import { connect } from 'mongoose';
import helmet from 'helmet';
import default_env from './lib/default_env';
import index from './gui';
import users from './routes/users';
import axios, { AxiosError } from 'axios';
import session from 'express-session';
import selfRequesting from './lib/selfRequesting';
import readContent from './lib/content';
import { JwtPayload, verify } from 'jsonwebtoken';
import routes from './lib/routes';
const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const staticDir = join(__dirname, '..', '..', 'app', 'dist');
const viewsDir = join(__dirname, '..', '..', 'app', 'views');

const port = process.env.PORT || default_env.PORT;

app.set('views', join(viewsDir));
app.set('view engine', 'ejs');
app.use(helmet());
app.use(
    session({
        secret: 'secret',
        saveUninitialized: true,
        resave: false,
    }),
);
app.use('/css', express.static(join(staticDir, 'css')));
app.use('/js', express.static(join(staticDir, 'js')));
app.use('/img', express.static(join(staticDir, 'images')));
app.use('/data/pages', express.static(join(viewsDir, 'pages')));

// NoJS actions
const actions = Router();
actions.post('/singup', urlencoded({ extended: true }), (req, res) =>
    selfRequesting(req, res, port, 'api/users/singup', (response) => {
        const session: typeof req.session & { jwt?: string } = req.session;
        session.jwt = response.data.jwt;
        res.redirect('/actions/dashboard');
    }),
);
actions.post('/login', urlencoded({ extended: true }), (req, res) =>
    selfRequesting(req, res, port, 'api/users/login', (response) => {
        const session: typeof req.session & { jwt?: string } = req.session;
        session.jwt = response.data.jwt;
        res.redirect('/actions/dashboard');
    }),
);
actions.get('/dashboard', (req, res) => {
    const session: typeof req.session & { jwt?: string } = req.session;
    if (session.jwt) {
        const payload = (<JwtPayload>verify(session.jwt, process.env.JWT_SECRET || default_env.JWT_SECRET)).payload;
        res.render('index', {
            content: readContent('dashboard', {
                name: payload.name,
            }),
            links: routes,
            css: [],
            js: [],
        });
    } else {
        res.redirect('/users/login');
    }
});
app.use('/actions', actions);

app.use('/', index);

// REST API
const api = Router();
api.use('/users', users);

app.use('/api', api);

connect(process.env.MONGODB_URL || default_env.MONGODB_URL, { dbName: 'biq-cat_os' }).then(
    () => console.log('[server] Succesifully conected to MongoDB'),
    (reason) => console.error(`[server] Error while connecting to MongoDB: ${reason}`),
);

app.listen(port, () => {
    console.log(`[server]: Server is running at port ${port}`);
});

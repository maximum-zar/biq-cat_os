import express, { Router, urlencoded } from 'express';
import { join } from 'path';
import { connect } from 'mongoose';
import helmet from 'helmet';
import default_env from './lib/default_env';
import index from './gui';
import users from './routes/users';
import * as validaton from './lib/validation';
import axios, { AxiosError } from 'axios';
import e from 'express';
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

app.use('/css', express.static(join(staticDir, 'css')));
app.use('/js', express.static(join(staticDir, 'js')));
app.use('/img', express.static(join(staticDir, 'images')));
app.use('/data/pages', express.static(join(viewsDir, 'pages')));

// Form actions
const actions = Router();
actions.post('/singup', urlencoded({ extended: true }), (req, res) =>
    axios
        .post(`${req.protocol}://${req.hostname}:${port}/api/users/singup`, req.body)
        .then((response) => {
            res.status(response.status).send(response.data);
        })
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
        }),
);
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

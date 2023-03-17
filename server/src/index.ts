import express from 'express';
import { join } from 'path';
import default_env from './lib/default_env';
import index from './gui';
import { connect } from 'mongoose';
import helmet from 'helmet';
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
app.use('/', index);

connect(process.env.MONGODB_URL || default_env.MONGODB_URL, { dbName: 'biq-cat_os' }).then(
    () => console.log('[server] Succesifully conected to MongoDB'),
    (reason) => console.error(`[server] Error while connecting to MongoDB: ${reason}`),
);

app.listen(port, () => {
    console.log(`[server]: Server is running at port ${port}`);
});

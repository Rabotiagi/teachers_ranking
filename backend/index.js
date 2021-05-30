import express from 'express';
import path from 'path';
import router from './router.js';
import DB from './db_api.js';
import {logger, requestTime} from './middlewears.js';

const app = express();
const PORT = process.env.PORT || 3006;
const dirname = path.resolve();
const db = new DB();

app.set('view engine', 'ejs');
console.log(app.get('views'));
app.use(express.static(path.resolve(dirname, '../static/')));
app.use(requestTime);
app.use(logger);
app.use(router);

app.listen(PORT, () => {
    console.log('server was started');
});
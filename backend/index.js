
import express from 'express';
import path from 'path';
import router from './router.js';
import {logger, requestTime} from './middlewears.js';

const app = express();
const PORT = process.env.PORT || 3000;
const dirname = path.resolve();

app.set('view engine', 'ejs');
app.use(express.static(path.resolve(dirname, '../static/')));
app.use(requestTime);
app.use(logger);
app.use(router);

app.listen(PORT, () => {
    console.log('server was started');
});
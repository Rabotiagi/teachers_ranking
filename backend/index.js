import express from 'express';
import path from 'path';
import router from './router.js';
import {logger, requestTime} from './middlewears.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(requestTime);
app.use(logger);
app.use(router);

app.listen(PORT, () => {
    console.log('server was started');
});
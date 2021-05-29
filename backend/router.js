import {Router} from 'express';
import path from 'path';

const router = Router();
const dirname = path.resolve();

router.get('/', (req, res) => {
    res.sendFile(path.resolve(dirname, '../static', 'index.html'));
});

router.get('/list', (req, res) => {
    res.sendFile(path.resolve(dirname, '../static', 'list.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.resolve(dirname, '../static', 'login.html'));
});

router.get('/registration', (req, res) => {
    res.sendFile(path.resolve(dirname, '../static', 'registration.html'));
});

export default router;
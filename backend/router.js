import {Router} from 'express';
import path from 'path';

const router = Router();
const dirname = path.resolve();

router.get('/', (req, res) => {
    res.sendFile(path.resolve(dirname, '../frontend', 'index.html'));
});

router.get('/list', (req, res) => {
    res.sendFile(path.resolve(dirname, '../frontend', 'list.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.resolve(dirname, '../frontend', 'login.html'));
});

router.get('/registration', (req, res) => {
    res.sendFile(path.resolve(dirname, '../frontend', 'registration.html'));
});

export default router;
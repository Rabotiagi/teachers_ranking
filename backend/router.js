'use strict';

import DB from './db_api.js';
import {Router} from 'express';
import path from 'path';

const router = Router();
const dirname = path.resolve();
const db = new DB();

router.get('/', (req, res) => {
    res.sendFile(path.resolve(dirname, '../static', 'index.html'));
});

router.get('/list', (req, res) => {
    db.initPool();
    const params = req.query;
    if(params.id){
        (async () => {
            const teachers = await db.getTeachers();
            await db.addGrades(params.id, params.grades);
            res.render('teachers', { teachers });
        })();
    } else { 
        (async () => {
            const teachers = await db.getTeachers();
            res.render('teachers', { teachers });
            db.closePool();
        })();
    }
});

router.get('/login', (req, res) => {
    db.initPool();
    const params = req.query;
    if(params){
        (async () => {
            const check = await db.checkUser(params.email, params.password);
            if(check){
                res.sendFile(path.resolve(dirname, '../static', 'list.html'));
            } else {
                res.sendFile(path.resolve(dirname, '../static', 'login.html'));
            }

            db.closePool();
        })();
    } else {
        res.sendFile(path.resolve(dirname, '../static', 'login.html'));
    }

    
});

router.get('/registration', (req, res) => {
    db.initPool();
    const params = req.query;
    if(params.email){
        console.log(1);
        (async () => {
            await db.createUser(params.email, params.password);
            res.sendFile(path.resolve(dirname, '../static', 'list.html'));

            db.closePool();
        })();
    } else {
        res.sendFile(path.resolve(dirname, '../static', 'registration.html'));
    }
});

router.get('/script.js', (req, res) => {
    res.sendFile(path.resolve(dirname, '../', 'script.js'));
});


export default router;
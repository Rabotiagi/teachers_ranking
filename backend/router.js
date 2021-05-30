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
    const voc = ['Умение вызвать и поддержать интерес аудитории:',
                 'Содержательность излагаемого материала:',
                 'Актуальность материала:',
                 'Пунктуальность:',
                 'Наличие четкого РСО:',
                 'Информирование студенто:',
                 'Предоставление вопросов для зачета/экзамена:',
                 'Вежливость:',
                 'Объективность оценивания:',
                 'Насколько вы удовлетворены преподаванием предмета?:'];

    db.initPool();
    const params = req.query;
    if(params.id){
        
        (async () => {
            const teachers = await db.getTeachers();
            for(let i = 0; i < teachers.length; i++){
                const votes = await db.getVotes(i + 1);
                votes.forEach(element => element.feature = voc[element.feature - 1]);
                
                teachers[i].grades = votes;
            }

            const active = await db.readActive();
            const check = await db.checkVote(active, +params.id);
            if(check){
                console.log('no right for vote');
                res.render('teachers', { teachers });
                return;
            }

            const points = params.grades.split('');
            for(let i = 0; i < points.length; i++){
                points[i] = +points[i];
            }
            
            await db.addGrades(params.id, points);
            await db.voted(active, params.id);

            res.render('teachers', { teachers });
        })();
    } else { 
        (async () => {
            const teachers = await db.getTeachers();
            for(let i = 0; i < teachers.length; i++){
                const votes = await db.getVotes(i + 1);
                votes.forEach(element => element.feature = voc[element.feature - 1]);
                
                teachers[i].grades = votes;
            }
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
                await db.writeActive(params.email);
                res.sendFile(path.resolve(dirname, '../static', 'list.html'));
            } else {
                res.sendFile(path.resolve(dirname, '../static', 'login.html'));
            }
        })();
    } else {
        res.sendFile(path.resolve(dirname, '../static', 'login.html'));
    }
});

router.get('/registration', (req, res) => {
    db.initPool();
    const params = req.query;
    if(params.email){
        (async () => {
            await db.createUser(params.email, params.password);
            res.sendFile(path.resolve(dirname, '../static', 'list.html'));
            db.writeActive();
        })();
    } else {
        res.sendFile(path.resolve(dirname, '../static', 'registration.html'));
    }
});

router.get('/script.js', (req, res) => {
    res.sendFile(path.resolve(dirname, '../', 'script.js'));
});


export default router;
'use strict';

import DB from './db_api.js';
import {Router} from 'express';
import path from 'path';

const router = Router();
const dirname = path.resolve();
const db = new DB();
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

router.get('/', (req, res) => {
    res.sendFile(path.resolve(dirname, '../static', 'index.html'));
});

router.get('/list', (req, res) => {
    

    db.initPool();
    const params = req.query;
    if(params.id){
        console.log(1);
        (async () => {
            const points = params.grades.split('');
            for(let i = 0; i < points.length; i++){
                points[i] = +points[i];
            }
            
            await db.addGrades(params.id, points);

            const teachers = await db.getTeachers();
            for(let i = 0; i < teachers.length; i++){
                const votes = await db.getVotes(i + 1);
                votes.forEach(element => element.feature = voc[element.feature - 1]);
                
                teachers[i].grades = votes;
            }

            
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
                //await db.writeActive(params.email);

                const teachers = await db.getTeachers();
                for(let i = 0; i < teachers.length; i++){
                    const votes = await db.getVotes(i + 1);
                    votes.forEach(element => element.feature = voc[element.feature - 1]);
                
                    teachers[i].grades = votes;
                }

            
                res.render('teachers', { teachers });
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
            //await db.writeActive(params.email);
            await db.createUser(params.email, params.password);
            const teachers = await db.getTeachers();
            for(let i = 0; i < teachers.length; i++){
                const votes = await db.getVotes(i + 1);
                votes.forEach(element => element.feature = voc[element.feature - 1]);
                
                teachers[i].grades = votes;
            }

            
            res.render('teachers', { teachers });


            db.closePool();
        })();
    } else {
        res.sendFile(path.resolve(dirname, '../static', 'registration.html'));
    }
});

router.get('/script.js', (req, res) => {
    res.sendFile(path.resolve(dirname, '../', 'script.js'));
});

router.get('/wel.js', (req, res) => {
    res.sendFile(path.resolve(dirname, '../', 'wel.js'));
});

router.get('/login_registration.js', (req, res) => {
    res.sendFile(path.resolve(dirname, '../', 'login_registration.js'));
});


export default router;
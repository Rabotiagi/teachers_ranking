'use strict';

import pkg from 'pg';
const {Pool} = pkg;

class DB{
    initPool(){
        this.pool = new Pool({
            host: '127.0.0.1',
            port: 5432,
            database: 'app',
            user: 'artem',
            password: '27778336',
            idleTimeoutMillis: 1000
        });
    }

    createUser(email, password){
        const sql = 'INSERT INTO AppUser (email, password) values ($1, $2)';
        return new Promise(resolve => {
            this.pool.query(sql, [email, password], err => {
                if(err) throw err;
            });

            resolve();
        });
    }

    async checkUser(email, password){
        const sql = 'SELECT * FROM AppUser';
        const {rows} = await this.pool.query(sql);

        for(let i = 0; i < rows.length; i++){
            if(rows[i].email === email && rows[i].password === password){
                return true;
            }
        }

        return false;
    }

    voted(email, teacher_id){
        const sql = 'INSERT INTO CheckVote (user_email, voted, teacher_id) values ($1, 1, $2)';
        return new Promise(resolve => {
            this.pool.query(sql, [email, teacher_id], err => {
                if(err) throw err;
            });

            resolve();
        });
    }

    async checkVote(email, teacher_id){
        const sql = 'SELECT * FROM CheckVote WHERE user_email=$1';
        const {rows} = await this.pool.query(sql, [email]);

        for(let i = 0; i < rows.length; i++){
            if(rows[i].teacher_id === teacher_id && rows[i].voted === 1){
                return true;
            }
        }

        return false;
    }

    async getRows(id_teacher){
        const sql = 'SELECT feature, points, countvote FROM Votes WHERE teacher_id=$1';
        return this.pool.query(sql, [id_teacher]);
    }

    updatePoints(id_teacher, grades){
        return new Promise(resolve => {
            const sql = 'UPDATE Votes SET points=$1 WHERE (teacher_id=$2 AND feature=$3)';
            for(let i = 0; i < grades.length; i++){
                this.pool.query(sql, [grades[i], id_teacher, i + 1], err => {
                    if(err) throw err;
                });
            }

            resolve();
        });
    }

    updateCount(id_teacher, count){
        return new Promise(resolve => {
            const sql = 'UPDATE Votes SET countvote=$1 WHERE teacher_id=$2';
            this.pool.query(sql, [count + 1, id_teacher], err => {
                if(err) throw err;
            });

            resolve();
        });
    }

    insertGrades(id_teacher, grades){
        return new Promise(resolve => {
            const sql = 'INSERT INTO Votes (teacher_id, feature, points, countvote) values ($1, $2, $3, 1)';
            for(let i = 0; i < grades.length; i++){
                this.pool.query(sql, [id_teacher, i + 1, grades[i]], err => {
                    if(err) throw err;
                });
            }

            resolve();
        });
    }

    async addGrades(id_teacher, grades){
        const {rows} = await this.getRows(id_teacher);
        
        if(rows.length){
            for(let i = 0; i < grades.length; i++){
                for(let j = 0; j < rows.length; j++){
                    if(i + 1 === rows[j].feature){
                        grades[i] += rows[j].points;
                        break;
                    }
                }
            }

            console.log(grades);
            await this.updatePoints(id_teacher, grades);
            await this.updateCount(id_teacher, rows[1].countvote);
            return;
        }

        await this.insertGrades(id_teacher, grades);
    }

    async getVotes(id_teacher){
        const sql = 'SELECT feature, points, countvote FROM Votes WHERE teacher_id=$1';
        const {rows} = await this.pool.query(sql, [id_teacher]);
        console.log(rows);
        let result = [];

        for(let row of rows){
            const grade = row.points / (row.countvote * 5);
            result.push({feature: row.feature, grade: grade});
        }
        
        return result;
    }

    async getTeachers(){
        const sql = 'SELECT * FROM Teacher';
        const {rows} = await this.pool.query(sql);
        return rows;
    }

    closePool(){
        this.pool.end();
    }
}

(async () => {
    const db = new DB();
    db.initPool();
    //db.addGrades(2, [1,2,3,4,5,4,3,2,1,1]);
    const grades = await db.getTeachers();
    console.log(grades);
    db.closePool();
})();

export default DB;
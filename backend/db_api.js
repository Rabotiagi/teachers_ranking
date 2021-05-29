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
            password: '27778336'
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

    async addGrades(id_teacher, grades){
        const sql = 'SELECT ';
        
        new Promise(resolve => {
            const sql1 = 'INSERT INTO Votes () values ()';
        });
    }

    closePool(){
        this.pool.end();
    }
}

(async () => {
    const db = new DB();
    const pool = db.initPool();
    await db.voted(pool, 'yar', 1);
    pool.end();
})();

export default DB;
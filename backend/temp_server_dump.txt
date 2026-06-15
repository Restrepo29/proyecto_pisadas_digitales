import express from 'express';
 import cors from 'cors';
import router from './router';
import mysql, { Connection } from 'mysql2';
import  dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());//para que express procese JSON


//conexion a la base de datos
export const DB:Connection = mysql.createConnection({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`
});

 DB.connect((err) => {
    if (err) {
     throw err;
    }
    console.log('Conectado a la base de datos');
});



app.use('/api/store', router);

app.use('/api/user', router);


export default app;
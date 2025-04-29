import mysql from 'mysql2';
import { promisify } from "util";

const connection = mysql.createPool({
    host: 'mysql_db_2',
    port: 3306,
    user: 'root',
    password: 'pass',
    database: 'research'
});

export const db = promisify(connection.query).bind(connection);
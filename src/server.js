
import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import { db } from "./connection_db/connect.js";
import helmet from "helmet";

const app = express();
const port = 8000;


app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());


app.get('/get_comments/', async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    const response = await db('SELECT * FROM comments;');
    res.json(response);
})

app.get('/get_test_reflected/', async(req, res) => {
    res.send(`<div>${req.query.test}</div>`);
})

app.post('/comment', async (req, res) => {
    const comment = req.body.text; // санитизация отсутствует
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    await db('INSERT INTO comments (comment) VALUES (?)', [comment]);
    res.redirect('/');
});

// более безопасный вариант добавления новой записи

app.post('/comment_validation', async (req, res) => {
    console.log(req.body);
      const safeInput = escapeHTML(req.body.text);
    const comment = safeInput; // санитизация 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    await db('INSERT INTO comments (comment) VALUES (?)', [comment]);
    res.redirect('/');
});


app.listen(port, '0.0.0.0', () => {
    console.log(`Сервер успешно запущем на порту: ${port}`)
});



function escapeHTML(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
  }

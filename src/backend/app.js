const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getComments, addComment } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/comments', async (req, res) => {
    const comments = await getComments();
    res.json(comments);
});

app.post('/comments', async (req, res) => {
    const { name, comment } = req.body;
    await addComment(name, comment);
    res.status(201).send();
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

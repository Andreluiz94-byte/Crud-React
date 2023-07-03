const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'CRUDDataBase',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Obter todos os registros
app.get('/api/get', (req, res) => {
    const sqlSelect = 'SELECT * FROM cadastro_medico';
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            res.status(500).send('Erro ao consultar o banco de dados');
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
});

// Inserir um novo registro
app.post('/api/insert', (req, res) => {
    const { nome, crm, telefone, esp_medica } = req.body;
    const sqlInsert = 'INSERT INTO cadastro_medico (nome, crm, telefone, esp_medica) VALUES (?, ?, ?, ?)';
    db.query(sqlInsert, [nome, crm, telefone, esp_medica], (err, result) => {
        if (err) {
            console.error('Erro ao inserir no banco de dados:', err);
            res.status(500).send('Erro ao inserir no banco de dados');
        } else {
            console.log(result);
            res.sendStatus(200);
        }
    });
});

// Excluir um registro pelo ID
app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = 'DELETE FROM cadastro_medico WHERE id = ?';
    db.query(sqlDelete, id, (err, result) => {
        if (err) {
            console.error('Erro ao excluir do banco de dados:', err);
            res.status(500).send('Erro ao excluir do banco de dados');
        } else {
            console.log(result);
            res.sendStatus(200);
        }
    });
});

// Atualizar um registro pelo ID
app.put('/api/update/:id', (req, res) => {
    const id = req.params.id;
    const { nome, crm, telefone, esp_medica } = req.body;
    const sqlUpdate = 'UPDATE cadastro_medico SET nome = ?, crm = ?, telefone = ?, esp_medica = ? WHERE id = ?';
    db.query(sqlUpdate, [nome, crm, telefone, esp_medica, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar no banco de dados:', err);
            res.status(500).send('Erro ao atualizar no banco de dados');
        } else {
            console.log(result);
            res.sendStatus(200);
        }
    });
});

app.listen(3001, () => {
    console.log('Servidor executando na porta 3001');
});

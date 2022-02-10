const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'employeeSchema'
})

db.connect((err) => {
    if (!err) {
        console.log('Connection successful');
    }
    else {
        console.log('Connection failed');
    }
})

app.post("/create", (req, res) => {
    //console.log(req.body);
    const name = req.body.employeeName;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query('INSERT into employees (employeeName, age, country, position, wage) VALUES (?, ?, ?, ?, ?)', [name, age, country, position, wage], (err, result) => {
        if (err) {
            console.log(`Some error occurred: ${err}`);
        } else {
            res.send('Values inserted');
        }
    })
})

app.get("/getEmployee", (req, res) => {
    db.query('SELECT * from employees', (err, result) => {
        if (err) {
            console.log(`Some error occurred: ${err}`);
        }
        else {
            res.send(result);
        }
    })
})

app.listen(3001, () => {
    console.log(`Server running on port 3001`)
})
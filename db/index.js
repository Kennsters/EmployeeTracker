const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "K33nnyishere",
    database: 'employeeTracker'
})

module.exports = db
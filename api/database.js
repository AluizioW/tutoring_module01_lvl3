const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function getDb() {
    const db = await open({
        filename: './api/database.db',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY NOT NULL,
        cpf TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        password TEXT NOT NULL
        );    

        CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        reason TEXT,
        status TEXT NOT NULL,
        patientId INTERGER,
        FOREIGN KEY (patientId)
        REFERENCES patients(id)
        );

    `);

    return db;
}

module.exports = {
    getDb
};
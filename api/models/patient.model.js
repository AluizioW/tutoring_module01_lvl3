const { getDb } = require('../database')

class Patient{
    constructor(id, cpf, name, password) {
        this.id = id;
        this.cpf = cpf;
        this.name = name;
        this.password = password;
    }

    async appointments() {
        const db = await getDb();
        const my_appointments = await db.all('SELECT * FROM appointments WHERE patientID = ?', [this.id]);
        return my_appointments;
    }
}

module.exports = Patient;
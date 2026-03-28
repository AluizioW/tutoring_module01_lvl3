const { getDb } = require('../database');
const Patient = require('../models/patient.model');

// todo
async function index(req, res) {

    try {

        const db = await getDb();
        let query = 'SELECT * FROM patients';
        let params = [];

        let patientsFiltered = await db.all(query, params);
        res.json({data: patientsFiltered});

    } catch(error) {
        res.status(500).json({error: "Erro ao buscar paciente", details: error.message});
    }

}

async function update(req, res) {
    
}

async function store(req, res) {

    const {cpf, name, password} = req.body;

    if( !name || !cpf || !password) {
        return res.status(400).json({error: "Preencha todos os campos."});
    }

    const db = await getDb();

    try {
        // const db = await getDb();
        const check = await db.get('SELECT cpf FROM patients WHERE cpf = ?', [cpf]);
        
        const result = await db.run(
            'INSERT INTO patients (cpf, name, password) VALUES (?, ?, ?)',
            [cpf, name, password]
        );

        const newPatient = await db.get('SELECT * FROM patients WHERE id = ?', [(await result).lastID]);
        return res.status(201).json(newPatient);
        

    } catch(error) {
        // const db = await getDb();
        const check = await db.get('SELECT cpf FROM patients WHERE cpf = ?', [cpf]);

        if(check) {
            res.status(500).json({error: "CPF já cadastrado!"});
        } else {
            res.status(500).json({error: "Erro ao cadastrar paciente", details: error.message});
        }

    }
}

// todo
async function login(req, res) {
    const {cpf, password} = req.body;

    if(!cpf || !password) {
        return res.status(400).json({error: "Preencha todos os campos!"});
    }

    const db = await getDb();

    try {

        const login = await db.get('SELECT * FROM patients WHERE cpf = ?', [cpf]);

        if(!login) {
            return res.status(404).json({error: "CPF não cadastrado"});
        }

        if(login.password != password) {
            return res.status(401).json({error: "Senha incorreta!"});
        }

        const patientModel = new Patient(login.id, login.cpf, login.name, login.password);
        const appointments = await patientModel.appointments();
        res.status(201).json({patient: patientModel, appointments: appointments});

        // res.status(201).json({data: login});

    } catch(error) {
        
        res.status(500).json({error: "Não foi possível fazer login", details: error.message});
        
    }
}

async function destroy(res, res) {

}

module.exports = {
    index, 
    update, 
    store, 
    login,
    destroy
}
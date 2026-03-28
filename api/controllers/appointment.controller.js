const { getDb } = require('../database');

async function index(req, res) {

    const db = await getDb();

    try{
        const query = 'SELECT * FROM appointments WHERE 1=1 ';
        let params = [];
        
        const appointment_list = await db.all(query, params);
        res.status(201).json(appointment_list);

    } catch(error) {
        res.status(500).json({error: "Não foi possível listar consultas", details: error.message});
    }


}

async function store(req, res) {

    const {date, time, reason, status, patientId} = req.body;
    // const patientId = req.params;

    if(!date || !time || !reason || !patientId) {
        return res.status(400).json({error: "Preencha todos os campos!"});
    }

    const db = await getDb();
    
    if(patientId) {
        
        const check_patient = await db.get('SELECT id FROM patients WHERE id = ?', [patientId]);

        try{
            if(!check_patient) {
                return res.status(404).json({error: "Erro ao encontrar paciente"});
            }

        } catch(error) {
            res.status(500).json({error: "Não foi possível encontrar paciente!", details: error.message});
        }
    }


    const check_date = await db.get('SELECT date FROM appointments WHERE date = ?', [date]);
    const check_time = await db.get('SELECT time FROM appointments WHERE time = ?', [time]);

    
    try{

        if(check_date && check_time) {
            return res.status(409).json({error: "Horário não disponível"});
        }    

    } catch(error) {
        res.status(500).json({error: "Não é possível marcar consulta neste horário!", details: error.message});
    }
    

    try{

        const result = await db.run(
            'INSERT INTO appointments (date, time, reason, status, patientId) VALUES (?, ?, ?, ?, ?)',
            [date, time, reason, status || "agendado", patientId]
        );

        const newAppointment = await db.get('SELECT * FROM appointments WHERE id = ?', [result.lastID]);
        res.status(201).json({data:newAppointment});
        

    } catch(error) {
        res.status(500).json({error: "Não foi possível adicionar consulta!", details: error.details});
    }
}

async function update(req, res) {
    const id = req.params.id;

    const { status, reason } = req.body;

    try {
        const db = await getDb();
        const appointment = await db.get('SELECT * FROM appointments WHERE id = ?', [id]);

        if(!appointment) {
            return res.status(400).json({error: "Consulta não encontrada!"});
        }

        let query = 'UPDATE appointments SET ';
        let updates = [];
        let params = [];

        if(status) {
            updates.push('status = ?');
            params.push(status);
        }

        if(reason) {
            updates.push('reason = ?');
            params.push(reason)
        }

        if(updates.length > 0) {
            query += updates.join(', ') + ' WHERE id = ?';
            params.push(id);

            await db.run(query, params);

            const updatedAppointment = await db.get('SELECT * FROM appointments WHERE id = ?', [id]);
            return res.json(updatedAppointment);
        } else {
            res.json(appointment);
        }

    } catch (error) {
        res.status(500).json({error: "Não foi possível editar dados da consulta.", details: error.message});
    }
}

module.exports = {
    index,
    store,
    update
}
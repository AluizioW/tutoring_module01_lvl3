const express = require('express');
const patientRouter = require('./routers/patient.router');
const appointmentRouter = require('./routers/appointment.router');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/patient', patientRouter);
app.use('/appointment', appointmentRouter);

app.listen(port, () => {
    console.log('servidor iniciado')
});
class Appointment {
    constructor(id, date, time, reason, status, patientId) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.reason = reason;
        this.status = status;
        this.patientId = patientId;
    }
}

module.exports = Appointment;
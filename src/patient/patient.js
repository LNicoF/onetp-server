import { randomUUID } from 'crypto'
import { fetchRelative } from '../relative/relative_repository.js'
import { createPerson } from '../person/person.js'
import { saveNewPatient } from './patient_repository.js'

export function Patient({ id, person }) {
    this.id = id
    this.person = person
}

export const createPatient = ({ name, lastName, DNI, birthDate }) => {
    let person = createPerson({
        id: randomUUID(),
        name,
        lastName,
        DNI,
        birthDate
    })

    let patient = new Patient({
        id: randomUUID(),
        person: person
    })
    
    saveNewPatient( patient );
    return patient;
}

Patient.prototype.getRelatives = function () {
    return this.relative = fetchRelative()
}

Patient.prototype.getInterventions = function () {
    throw "not implement";
}


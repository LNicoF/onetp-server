import { randomUUID } from 'crypto'
import { createPerson } from '../person/person.js'
import { saveNewRelative } from './relative_repository.js'

export function Relative({ id, person }) {
    this.id = id
    this.person = person
}

export const createRelative = ({ name, lastName, DNI, birthDate }) => {
    let person = createPerson({
        id: randomUUID(),
        name,
        lastName,
        DNI,
        birthDate
    })

    let relative = new Relative({
        id: randomUUID(),
        person: person
    })

    saveNewRelative(relative);
    return relative;
}

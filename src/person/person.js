import { randomUUID } from 'crypto'
import { saveNewPerson } from './person_repository.js'

export function Person({ id,name,lastName,DNI,birthDate }) {
    this.id         = id
    this.name       = name
    this.lastName   = lastName
    this.DNI        = DNI
    this.birthDate  = birthDate
}
export const createPerson = ({ name,lastName,DNI,birthDate }) => {
    let person = new Person({
        id: randomUUID(),
        name,
        lastName,
        DNI,
        birthDate
    })
    saveNewPerson( person )
    return person;
}

import { createRoom, getFreeRoom } from './room/room.js'
import { createRoomLocation } from './room/room_location.js'
import { createPatient } from './patient/patient.js'
import { fetchAllRooms, fetchRoom } from './room/room_respository.js'
import { fetchAllPatients, fetchPatient } from './patient/patient_repository.js'
import { fetchAllPeople, fetchPerson } from './person/person_repository.js'
import { createPerson } from './person/person.js'
import { createPersonPatient } from './person_patient/person_patient.js'
import { createPersonRelative } from './person_relative/person_relative.js'
import { createRelative } from './relative/relative.js'
import { createPatientRelative } from './patient_relative/patient_relative.js'

/*=========================================
                Person
=========================================*/

export const addPerson = async ( data ) => {
    const person = createPerson( data );
    return person;
}

export const getPerson = async ( data ) => {
    let person = await fetchPerson( data ) 
    return person
}

export const getAllPeople = async ( data ) => {
    return await fetchAllPeople()
}

/*=========================================
                Patient
=========================================*/

export const addPatient = async ( data ) => {
    const patient = createPatient( data );
    return patient;
}

export const getPatient = async ( data ) => {
    let patient = await fetchPatient( data ) 
    return patient
}

export const getAllPatients = async ( data ) => {
    return await fetchAllPatients()
}

/*=========================================
                Relative
=========================================*/

export const addRelative = async ( data ) => {
    const relative = createRelative( data );
    return relative;
}

export const getRelative = async ( data ) => {
    let relative = await fetchFamiliar( data ) 
    return relative
}

export const getAllRelatives = async ( data ) => {
    return await fetchFamily()
}

/*=========================================
            Person Patient
=========================================*/



/*=========================================
            Person Relative
=========================================*/

export const addPersonRelative = async ( data ) => {
    const personRelative = createPersonRelative( data );
    return personRelative;
}

/*=========================================
            Patient relative
=========================================*/

export const addPatientRelative = async ( data ) => {
    const patientRelative = createPatientRelative( data );
    return patientRelative;
}
import { Table } from '../lib/database.js'
import { KeysMapper } from '../keys_mapper.js'
import { getPath } from "../lib/from_root.js";
import { Patient } from './patient.js'
import { createPersonPatient } from '../person_patient/person_patient.js';

const dbFile = process.env.PATIENT_SQL;
const TABLE_NAME = 'patients'

const dbTable = new Table(TABLE_NAME)

const mapper = new KeysMapper({
    //  attribute -> db column
    id: 'id'
})

export const fetchPatient = async ({ id }) => {
    const rawData = await dbTable.getRows({
        columns: mapper.getMappedKeys(),
        where: {
            field: mapper.mapKey('id'),
            value: id,
        },
    })

    if (rawData.length == 0) {
        throw 'No patients available'
    }

    const patientData = mapper.reverse(rawData[0])
    return new Patient(patientData)
}

export const fetchAllPatients = async () => {
    const rowsRawData = await dbTable.getRows({
        columns: mapper.getMappedKeys(),
    })

    if (rowsRawData.length == 0) {
        throw 'No patients available';
    }

    let patients = rowsRawData.map( ( rawData ) => {
        let data = mapper.reverse( rawData )
        return new Patient( data )
    })
    return patients;
}

export const saveNewPatient = async (patient) => {
    await dbTable.createRow( { fields: mapper.map(patient) } )
    createPersonPatient(patient.person, patient)
}
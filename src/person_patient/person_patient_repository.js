import { Table } from '../lib/database.js'
import { KeysMapper } from '../keys_mapper.js'
import { getPath } from "../lib/from_root.js";

const dbFile = process.env.PATIENT_SQL;
const TABLE_NAME = 'person_patient'

const dbTable = new Table(TABLE_NAME)

const mapper = new KeysMapper({
    //  attribute   db column
    personId: 'person_id',
    patientId: 'patient_id'
})

export const fetchPersonPatient = async ({ id }) => {
    const rawData = await dbTable.getRows({
        columns: mapper.getMappedKeys(),
        where: {
            field: mapper.mapKey('id'),
            value: id,
        },
    })

    if (rawData.length == 0) {
        throw 'No person patient available'
    }

    const personPatientData = mapper.reverse(rawData[0])
    return new PersonPatient(personPatientData)
}

export const fetchAllPersonPatients = async () => {
    const rowsRawData = await dbTable.getRows({
        columns: mapper.getMappedKeys(),
    })

    if (rowsRawData.length == 0) {
        throw 'No person patients available';
    }

    let personPatients = rowsRawData.map( ( rawData ) => {
        let data = mapper.reverse( rawData )
        return new PersonPatient( data )
    })
    return personPatients;
}

export const saveNewPersonPatient = async ({personId, patientId}) => {
    await dbTable.createRow( { fields: mapper.map({personId, patientId}) } )
}
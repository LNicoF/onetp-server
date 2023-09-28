import { Table } from '../lib/database.js'
import { KeysMapper } from '../keys_mapper.js'

const dbFile = process.env.PATIENT_SQL;
const TABLE_NAME = 'patient_relative'

const dbTable = new Table(TABLE_NAME)

const mapper = new KeysMapper({
    //  attribute -> db column
    patientId: 'patient_id',
    relativeId: 'relative_id'
})

export const fetchPatientRelative = async ({ id }) => {
    const rawData = await dbTable.getRows({
        columns: mapper.getMappedKeys(),
        where: {
            field: mapper.mapKey('id'),
            value: id,
        },
    })

    if (rawData.length == 0) {
        throw 'No patient relative available'
    }

    const patientRelativeData = mapper.reverse(rawData[0])
    return new PersonPatient(patientRelativeData)
}

export const fetchAllpatientsRelative = async () => {
    const rowsRawData = await dbTable.getRows({
        columns: mapper.getMappedKeys(),
    })

    if (rowsRawData.length == 0) {
        throw 'No person patients available';
    }

    let patientRelatives = rowsRawData.map( ( rawData ) => {
        let data = mapper.reverse( rawData )
        return new PatientRelatives( data )
    })
    return patientRelatives;
}

export const saveNewPatientRelative = async ({patientId, relativeId}) => {
    await dbTable.createRow( { fields: mapper.map({patientId, relativeId}) } )
}
import { Table } from '../lib/database.js'
import { KeysMapper } from '../keys_mapper.js'
import { getPath } from "../lib/from_root.js";

const TABLE_NAME = 'person_relative'

const dbTable = new Table(TABLE_NAME)

const mapper = new KeysMapper({
    //  attribute   db column
    personId: 'person_id',
    relativeId: 'relative_id'
})

export const fetchPersonRelative = async ({ id }) => {
    const rawData = await dbTable.getRows({
        columns: mapper.getMappedKeys(),
        where: {
            field: mapper.mapKey('id'),
            value: id,
        },
    })

    if (rawData.length == 0) {
        throw 'No person relative available'
    }

    const personRelativeData = mapper.reverse(rawData[0])
    return new PersonRelative(personRelativeData)
}

export const fetchAllPersonRelative = async () => {
    const rowsRawData = await dbTable.getRows({
        columns: mapper.getMappedKeys(),
    })

    if (rowsRawData.length == 0) {
        throw 'No person relative available';
    }

    let personRelatives = rowsRawData.map( ( rawData ) => {
        let data = mapper.reverse( rawData )
        return new PersonRelative( data )
    })
    return personRelatives;
}

export const saveNewPersonRelative = async ({personId, relativeId}) => {
    await dbTable.createRow( { fields: mapper.map({personId, relativeId}) } )
}
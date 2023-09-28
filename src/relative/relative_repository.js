import { Table } from '../lib/database.js'
import { KeysMapper } from '../keys_mapper.js'
import { Relative } from './relative.js'
import { createPersonRelative } from '../person_relative/person_relative.js'

const TABLE_NAME = 'relatives'
let dbTable = new Table(TABLE_NAME)

const mapper = new KeysMapper({
    //  attribute   db column
    id: 'id'
})

export const fetchRelative = async ({ id }) => {
    const rawData = await dbTable.getRows({
        columns: mapper.getRawKeys(),
        where: {
            field: mapper.mapKey('id'),
            value: id,
        },
    })

    if (rawData.length == 0) {
        throw 'No person available';
    }

    const relativeData = mapper.reverse(rawData[0]);
    return new Relative(relativeData);
}
export const fetchAllRelatives = async () => {
    const rawData = await dbTable.getRows({
        columns: mapper.getRawKeys(),
    })

    if (rawData.length == 0) {
        throw 'No relatives available';
    }

    let data = mapper.map(rawData);
    let relatives = data.map((obj) => new Relative(obj));
    return relatives;
}

export const saveNewRelative = async (relative) => {
    await dbTable.createRow( { fields: mapper.map(relative) } )
    createPersonRelative(relative.person, relative)
}
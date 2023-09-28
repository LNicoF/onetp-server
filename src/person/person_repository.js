import { Table } from '../lib/database.js'
import { KeysMapper } from '../keys_mapper.js'
import { Person } from './person.js'

const TABLE_NAME = 'people'
let dbTable = new Table(TABLE_NAME)

const mapper = new KeysMapper({
    //  attribute   db column
    id: 'id',
    name: 'name',
    lastName: 'last_name',
    DNI: 'DNI',
    birtDate: 'birt_date',
})

export const fetchPerson = async ({ id }) => {
    const rawData = await dbTable.getRows({
        columns: mapper.getMappedKeys(),
        where: {
            field: mapper.mapKey('id'),
            value: id,
        },
    })

    if (rawData.length == 0) {
        throw 'No person available';
    }

    const personData = mapper.reverse(rawData[0]);
    return new Person(personData);
}

export const fetchAllPeople = async () => {
    const rowsRawData = await dbTable.getRows({
        columns: mapper.getMappedKeys(),
    })

    if (rowsRawData.length == 0) {
        throw 'No people available';
    }

    let people = rowsRawData.map( ( rawData ) => {
        let data = mapper.reverse( rawData )
        return new Person( data )
    })
    return people;
}

export const saveNewPerson = async ( person ) => {
    await dbTable.createRow( { fields: mapper.map( person ) } )
}
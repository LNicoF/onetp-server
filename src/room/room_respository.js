import { Table } from '../lib/database.js'
import { KeysMapper } from '../keys_mapper.js'
import { Room } from './room.js'

const TABLE_NAME = 'rooms'

const mapper = new KeysMapper({
    //  attribute   db column
    id: 'id',
    isOccupied: 'is-occupied',
    locationId: 'location-id',
})

let dbTable = new Table(TABLE_NAME)

export const fetchAllRooms = async () => {
    const rowsRawData = await dbTable.getRows({
        columns: mapper.getMappedKeys(),
    })

    let rooms = rowsRawData.map( ( rawData ) => {
        let data = mapper.reverse( rawData )
        return new Room( data )
    })
    return rooms
}

export const fetchRoom = async ({ id }) => {
    const rawData = await dbTable.getRows({
        columns: mapper.getMappedKeys(),
        where: {
            field: mapper.mapKey('id'),
            value: id,
        },
    })

    if (rawData.length == 0) {
        throw 'No rooms available'
    }

    const roomData = mapper.reverse(rawData[0])
    return new Room(roomData)
}

export const fetchFreeRoom = async () => {
    const rawData = await dbTable.getRows({
        columns: mapper.getMappedKeys(),
        where: {
            field: mapper.mapKey('isOccupied'),
            value: 0,
        },
    })

    if (rawData.length == 0) {
        throw 'No rooms available'
    }

    console.log( 'fetchFreeRoom', { rawData } )

    const roomData = mapper.reverse(rawData[0])
    return new Room(roomData)
}

/**
 * @param { Room } room
 */
export const saveNewRoom = async (room) => {
    await dbTable.createRow( { fields: mapper.map(room) } )
}

/**
 * @param { Room } room
 */
export const saveRoom = async (room) => {
    const id = mapper.mapKey('id')
    const mappedFields = mapper.map(room)
    dbTable.saveRows({
        fields: mappedFields,
        where: {
            field: id,
            value: mappedFields[id],
        },
    })
}

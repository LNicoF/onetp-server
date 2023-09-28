import { KeysMapper } from "../keys_mapper.js";
import { Table } from "../lib/database.js";
import { RoomLocation } from "./room_location.js" ;

let mapper = new KeysMapper( {
    id:         'id',
    roomNumber: 'room-number'
})

const dbTable = new Table( 'room-locations' )

/**
 * @param { { id: string } }
 * @returns { Promise< RoomLocation > }
 */
export const fetchRoomLocation = async ( { id } ) => {
    const rows = await dbTable.getRows( {
        columns: mapper.getMappedKeys(),
        where: {
            field: mapper.mapKey( 'id' ),
            value: id,
        }
    })

    if ( rows.length == 0 ) {
        throw 'Room location not found'
    }

    return new RoomLocation( mapper.reverse( rows[ 0 ] ) )
}

/**
 * @param { RoomLocation } location
 */
export const saveNewRoomLocation = async ( location ) => {
    const data = mapper.map( location ) ;
    dbTable.createRow( { fields: data } )
}

/**
 * @param { RoomLocation } location
 */
export const saveRoomLocation = async ( location ) => {
    let data = mapper.map( location )
    let idCol = mapper.mapKey( 'id' )
    dbTable.saveRows( {
        fields: data,
        where: {
            field: idCol,
            value: data[ idCol ]
        }
    })
}
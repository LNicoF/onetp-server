import { randomUUID } from "crypto"
import { saveNewRoomLocation } from "./room_location_repository.js"

/**
 * @param { { roomNumber: number } }
 */
export const createRoomLocation = ( { roomNumber } ) => {
    let location = new RoomLocation( {
        id: randomUUID(),
        roomNumber
    })
    saveNewRoomLocation( location )
    return location
}

/**
 * @param { {
 *   id: string?,
 *   roomNumber: number
 * } }
 */
export function RoomLocation( { id, roomNumber } ) {
    this.id  = id
    this.roomNumber = roomNumber
}

RoomLocation.prototype.getRoomNumber = function() {
    return this.roomNumber
}
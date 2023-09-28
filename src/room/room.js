import { randomUUID } from 'crypto'
import { fetchFreeRoom, saveNewRoom, saveRoom } from './room_respository.js'
import { alertDevices } from '../alert_devices.js'
import { fetchRoomLocation } from './room_location_repository.js'

/**
 * @returns { Room }
 */
export const createRoom = ( { isOccupied = false, location } ) => {
    let room = new Room( {
        id: randomUUID(),
        isOccupied: isOccupied,
        locationId: location.id,
    } )
    console.log( 'Room created', { room } )
    saveNewRoom( room ).then( () => {
        console.log( 'Room saved', { room } )
    } )
    return room
}

export const getFreeRoom = async () => {
    return await fetchFreeRoom()
}

/**
 * @param { {
 *   id: string,
 *   isOccupied: boolean,
 *   locationId: string,
 * } }
 */
export function Room( { id, isOccupied, locationId } ) {
    this.id         = id
    this.isOccupied = Number( isOccupied )
    this.locationId = locationId
    this.location = fetchRoomLocation({ id: locationId })
    this.location.then(
        (location) => { this.location = location }
    );
}

Room.prototype.occupy = async function() {
    alertDevices( await this.location )
    this.isOccupied = 1
    saveRoom( this )
}

Room.prototype.disoccupy = function() {
    this.isOccupied = 0
    saveRoom( this )
}

Room.prototype.toJson = async function() {
    await this.location
    return JSON.stringify( this ) ;
}
import { createRoom, getFreeRoom } from "../room/room.js"
import { createRoomLocation } from "../room/room_location.js"
import { fetchAllRooms, fetchRoom } from "../room/room_respository.js"

export const addRoom = async ( { roomNumber } ) => {
    const location = createRoomLocation( { roomNumber } )
    const room = createRoom( {
        location
    })
    return room
}

export const getRoom = async ( { id } ) => {
    let room = await fetchRoom( { id } ) // fix
    return room
}

export const getAllRooms = async ( data ) => {
    return await fetchAllRooms()
}

export const alert = async () => {
    let room = await getFreeRoom()
    room.occupy()
}

export const freeRoom = async ( data ) => {
    let room = await fetchRoom( data ) // fix
    room.disoccupy()
}


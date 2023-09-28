import { createServer } from 'http'
import { addRoom, alert, getAllRooms, getRoom } from './controller/room.js'
import { addGetRoute, addPostRoute, runRouter } from './lib/router.js'
import { addPatient, getAllPatients, getPatient } from './controller.js'
import { addPerson, getAllPeople, getPerson } from './controller.js'
import { addRelative, getAllRelatives, getRelative } from './controller.js'
import { addPersonRelative } from './controller.js'
import { addPatientRelative } from './controller.js'
import "./controller/account.js"

/*=========================================
                Room
=========================================*/

addGetRoute( '/', ( _, res ) => {
    res.writeHead(200, {
        'Content-Type': 'text/html',
    })
    res.end( '<h1>Server</h1>')
} )

addPostRoute('/room/create', async (_, res, params) => {
    let room = await addRoom(params)
    res.writeHead(201, {
        'Content-Type': 'application/json',
    })
    res.end( await room.toJson() )
})

addGetRoute('/room/get', async (_, res, { id } ) => {
    let room = await getRoom( { id } )
    res.writeHead(200, {
        'Content-Type': 'application/json',
    })

    res.end( await room.toJson() )
})

addGetRoute('/room/getall', async ( _, res ) => {
    let roomsJsonList = []
    let rooms = await getAllRooms()
    for ( const room of rooms ) {
        roomsJsonList.push( await room.toJson() ) ;
    }
    roomsJsonList = roomsJsonList.join( ',' )

    res.writeHead(200, {
        'Content-Type': 'application/json',
    })
    res.statusCode = 200 ;

    res.end( `{ "rooms": [ ${ roomsJsonList } ] }`)
})

addPostRoute('/room/disoccupy', async (_, res, { id }) => {
    try {
        let room = await getRoom( { id } )
        room.disoccupy()
        res.writeHead(200, {
            'Content-Type': 'application/json',
        })
        res.end()
    } catch ( e ) {
        res.writeHead( 404, {
            'Content-Type': 'application/json',
        } ) ;
        res.end() ;
    }
})

addPostRoute('/alert', async (_, res ) => {
    await alert()
    res.writeHead(200, {
        'Content-Type': 'application/json',
    })
    res.end()
})

/*=========================================
                Patient
=========================================*/

addPostRoute('/patient/create', async (_, res, params) => {
    let patient = await addPatient(params)
    res.writeHead(200, {
        'Content-Type': 'application/json',
    })
    res.end(JSON.stringify({ patient }))
})

addGetRoute('/patient/get', async (_, res, params) => {
    let patient = await getPatient(params)
    res.writeHead(200, {
        'Content-Type': 'application/json',
    })

    res.end(JSON.stringify({ patient }))
})

addGetRoute('/patient/getall', async (_, res, params) => {
    let patients = await getAllPatients(params)
    res.writeHead(200, {
        'Content-Type': 'application/json',
    })

    res.end(JSON.stringify({ patients }))
})

/*=========================================
                Person
=========================================*/

addPostRoute('/person/create', async (_, res, params) => {
    let person = await addPerson(params)
    res.writeHead(200, {
        'Content-Type': 'application/json',
    })
    res.end(JSON.stringify({ person }))
})

addGetRoute('/person/get', async (_, res, params) => {
    let person = await getPerson(params)
    res.writeHead(200, {
        'Content-Type': 'application/json',
    })

    res.end(JSON.stringify({ person }))
})

addGetRoute('/person/getall', async (_, res, params) => {
    let person = await getAllPeople(params)
    res.writeHead(200, {
        'Content-Type': 'application/json',
    })

    res.end(JSON.stringify({ person }))
})
/*=========================================
                Relative
=========================================*/

addPostRoute('/relative/create', async (_, res, params) => {
    let relative = await addRelative(params)
    res.writeHead(200, {
        'Content-Type': 'application/json',
    })
    res.end(JSON.stringify({ relative }))
})

addGetRoute('/relative/get', async (_, res, params) => {
    let relative = await getRelative(params)
    res.writeHead(200, {
        'Content-Type': 'application/json',
    })

    res.end(JSON.stringify({ relative }))
})

addGetRoute('/relative/getall', async (_, res, params) => {
    let relative = await getAllRelatives(params)
    res.writeHead(200, {
        'Content-Type': 'application/json',
    })

    res.end(JSON.stringify({ relative }))
})

/*=========================================
                Person Patient
=========================================*/

addPostRoute('/personPatient/create', async (_, res, params) => {
    let personPatient = await addPersonPatient(params)
    res.writeHead(200, {
        'Content-Type': 'application/json',
    })
    res.end(JSON.stringify({ personPatient }))
})

/*=========================================
                Person relative
=========================================*/

addPostRoute('/personRelative/create', async (_, res, params) => {
    let personRelative = await addPersonRelative(params)
    res.writeHead(200, {
        'Content-Type': 'application/json',
    })
    res.end(JSON.stringify({ personRelative }))
})

/*=========================================
                Patient Relative
=========================================*/

addPostRoute('/patientRelative/create', async (_, res, params) => {
    let patientRelative = await addPatientRelative(params)
    res.writeHead(200, {
        'Content-Type': 'application/json',
    })
    res.end(JSON.stringify({ patientRelative }))
})

/*=========================================
                Server
=========================================*/

let server = createServer( ( req, res ) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Max-Age": 2592000, // 30 días
      };
    runRouter( req, res )
} )

const { HOST = 'localhost', PORT = 4000 } = process.env

server.listen( PORT, HOST, () => {
    console.log( `listening on http://${ HOST }:${ PORT }/` )
} )
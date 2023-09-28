import waitPort from 'wait-port'
import { createConnection } from 'mysql2'

/**
 * @type { Promise< Connection > }
 */
const connection = new Promise( async ( resolve ) => {
    const {
        MYSQL_HOST = 'localhost',
        MYSQL_PORT = 3306,
        MYSQL_TIMEOUT = 10000,
        MYSQL_USER    = 'root',
        MYSQL_PASS    = '',
        MYSQL_DB      = 'rooms-app',
    } = process.env

    waitPort( {
        port: Number( MYSQL_PORT ),
        host: MYSQL_HOST ?? 'localhost',
        timeout: MYSQL_TIMEOUT ?? 10000,
        waitForDns: true,
    } )

    let connection = createConnection( {
        host: MYSQL_HOST ?? 'localhost',
        user: MYSQL_USER ?? 'root',
        password: MYSQL_PASS ?? '',
        database: MYSQL_DB ?? 'rooms-app',
    } )

    connection.connect( ( err ) => {
        if ( err ) throw err
    } )

    resolve( connection )
} )

export const getConnection = () => connection
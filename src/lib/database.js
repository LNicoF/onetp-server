import { readFile } from 'fs/promises'
import { getConnection } from './db_connection.js'

const processFile = ( path ) => {
    return new Promise( async ( resolve ) => {
        let contents = readFile( path, { encoding: 'utf-8' } )
        const connection = await getConnection()
        connection.beginTransaction( async ( err ) => {
            if ( err ) throw err

            connection.query( await contents, ( err ) => {
                if ( err ) {
                    return connection.rollback( () => {
                        throw err
                    })
                }
            })

            connection.commit( ( err ) => {
                if ( err ) {
                    return connection.rollback( () => {
                        throw err
                    })
                }
                resolve()
            })
        } )
    })
}

/**
 * @param { string } name
 * @param { { filePath: ?string } }
 */
export function Table( name, { filePath } = { filePath: null } ) {
    this.name = name
    if ( filePath != null ) {
        this.ready = processFile( filePath )
    }
}

/**
 * @param { {
 *   columns: string[],
 *   where: ?{ field: string, value: string, operation: string? }
 * } }
 * @returns { Promise< {}[] > }
 */
Table.prototype.getRows = function( { columns, where = null } ) {
    return new Promise( async ( resolve ) => {
        const columnsString = columns.map( col => `\`${ col }\`` ).join( ',' )
        let queryString = `SELECT ${ columnsString } FROM \`${ this.name }\``
        let queryValues = []
        
        if ( where ) {
            queryString += `WHERE \`${ where.field }\` ${ where.operation ?? '=' } ?`,
            queryValues.push( where.value )
        }

        await this.ready
        const connection = await getConnection()
        const query = connection.query( queryString, queryValues, ( err, res ) => {
            if ( err ) throw err
            resolve( res )
        } ).sql
        console.log( 'getRows', { query })
    } )
}

/**
 * @param { { fields: { } } }
 */
Table.prototype.createRow = function( { fields } ) {
    return new Promise( async ( resolve ) => {
        let columns = Object.keys( fields ).map( col => `\`${ col }\`` )
        let values = Object.values( fields )
        let marks  = values.map( () => '?' ).join( ',' )

        await this.ready
        const connection = await getConnection()
        let query = connection.query(
            `INSERT INTO \`${ this.name }\`( ${ columns.join( ',' ) } ) \
                VALUES ( ${ marks } )`,
            values,
            ( err ) => {
                if ( err ) throw err
                resolve()
            }
        )
        console.log("======="+query.sql+"=======")
    } )
}

/**
 * @param { {
 *   fields: {},
 *   where: { field: string, value: string, operation: string?, }
 * } }
 */
Table.prototype.saveRows = function( { fields, where } ) {
    return new Promise( async ( resolve ) => {
        const entries = Object.keys( fields )
        const marks = entries
            .map( key => `\`${ key }\` = ?` )
            .join( ', ' )

        await this.ready
        let connection = await getConnection()
        connection.query(
            `UPDATE \`${ this.name }\` SET ${ marks }\
                WHERE \`${ where.field }\` ${ where.operation ?? '=' } ?`,
                Object.values( fields )
                    .concat( [ where.value ] ),
            ( err ) => {
                if ( err ) throw err
                resolve()
            }
        )
    } )
}

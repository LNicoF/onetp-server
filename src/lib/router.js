'use strict'

import { IncomingMessage, ServerResponse } from 'http'
import { buildGetParams, buildPostParams } from "./request_processor.js"

let routes = {
    [ '404' ]: ( _, res ) => {
        res.statusCode = 404
        res.end( '<h1> 404 </h1>' )
    }
}

let buildParams = {
    get: buildGetParams,
    post: buildPostParams,
}

/** @param { string } url */
const extractPath = ( url ) => url.split( '?' )[ 0 ]

/**
 * @param { 'get' | 'post' } method
 * @param { string }         route
 * @param { ( req: IncomingMessage , res: ServerResponse, params: {} ) => void } callback
 */
export const addRoute = ( method, route, callback ) => {
    if ( routes[ route ] !== undefined ) {
        throw 'Route already declared'
    }
    routes[ route ] = { method, callback }
}

/**
 * @param { string } route
 * @param { ( req: IncomingMessage, res: ServerResponse, params: {} ) => void } callback
 */
export const addPostRoute = ( route, callback ) => addRoute( 'post', route, callback ) ;

/**
 * @param { string } route
 * @param { ( req: IncomingMessage, res: ServerResponse, params: {} ) => void } callback
 */
export const addGetRoute = ( route, callback ) => addRoute( 'get', route, callback ) ;

export const set404 = ( callback ) => {
    routes[ '404' ] = callback
}

const setupCors = ( response ) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
    response.setHeader('Access-Control-Max-Age', '2592000'); // 30 dias
}

export const runRouter = ( req, res ) => {
    const path = extractPath( req.url )
    for ( const [ route, { method, callback } ] of Object.entries( routes ) ) {
        if ( route === path ) {
            setupCors( res )
            buildParams[ method ](
                req,
                ( params ) => callback( req, res, params )
            )
            return
        }
    }
    routes[ '404' ]( req, res )
}

export default {
    addRoute,
    addPostRoute,
    addGetRoute,
    set404,
    run: runRouter,
}

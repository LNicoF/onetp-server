'use strict';

/**
 * @param { Request } req
 * @param { ( params: {} ) => void } callback
 */
export const buildPostParams = async (req, callback) => {
    let res = '';
    let ended = false;
    req.on('data', (data) => {
        res += data;
    });

    req.on('end', () => {
        ended = true;
        if ( res.length == 0 ) {
            callback( {} )
        } else {
            callback(JSON.parse( res ));
        }
    });
};

/**
 * @param { Request } req
 * @param { ( params: {} ) => void } callback
 */
export const buildGetParams = async (req, callback) => {
    let res = {};
    const HOST = 'localhost';
    const PORT = 3000;
    const url = `${HOST}:${PORT}${req.url}`;
    let builder = new URL(url).searchParams;
    for (const [key, value] of builder) {
        res[key] = value;
    }
    callback(res);
};

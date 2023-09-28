/**
 * @param { { } } fields from: to
 */
export function KeysMapper( fields ) {
    this.fields = fields
}

/**
 * @param { {} } rawData 
 * @returns { {} }
 */
KeysMapper.prototype.map = function( rawData ) {
    let mappedData = {}
    for ( const [ from, to ] of Object.entries( this.fields ) ) { 
        mappedData[ to ] = rawData[ from ]
    }
    return mappedData
}

/**
 * @param { {} } rawData 
 * @returns { {} }
 */
KeysMapper.prototype.reverse = function( mappedData ) {
    let rawData = {}
    for ( const [ to, from ] of Object.entries( this.fields ) ) { 
        rawData[ to ] = mappedData[ from ]
    }
    return rawData
}

KeysMapper.prototype.mapKey = function( key ) {
    return this.fields[ key ]
}

KeysMapper.prototype.reverseKey = function( key ) {
    const [ mappedKey, _ ] = Object.entries( fields )
        .find( ( [ _, from ] ) => from == key )
    return mappedKey
}

KeysMapper.prototype.getRawKeys = function() {
    return Object.keys( this.fields )
}

KeysMapper.prototype.getMappedKeys = function() {
    return Object.values( this.fields )
}

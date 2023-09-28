import { KeysMapper } from "../keys_mapper.js";
import { Table } from "../lib/database.js";
import { getPath } from "../lib/from_root.js";
import { Account } from "./account.js";

const dbFile = process.env.ACCOUNT_DB_FILE

const dbTable = new Table('account', {
    filePath: dbFile ? getPath( dbFile ) : null
}) 

const mapper = new KeysMapper( {
    id:    'id',
    email: 'email',
    password:  'password',
})

export const saveNewAccount = async ( account ) => {
    await dbTable.createRow( { fields: mapper.map( account ) } )
    return dbTable
}

export const loginVerificationAccount = async ( { email, password } ) => {

    const accounts = await dbTable.getRows( {
        columns:["email", "password"],
        where: {
            field : "email",
            value : email
        }
    });
    if ( accounts.length == 0 || accounts[0].password != password) {
        throw 'account not found or password incorrect'
    }
    const account = mapper.reverse(accounts[0])
    return new Account(account)
}
export const searchAccount = async( { email } ) => {
    console.log(email);
    const accounts = await dbTable.getRows( {
        columns:["email"],
        where: {
            field : "email",
            value : email
        }
    });
    if ( accounts.length == 0 ) {
        console.log('hola');
        return null
    }
    throw 'Ya hay una cuenta existente'
}

export const searchIdAccount = async( { email } ) => {
    console.log(email);
    const accounts = await dbTable.getRows( {
        columns:["email", "id"],
        where: {
            field : "email",
            value : email
        }
    });
    return accounts[0].id
}


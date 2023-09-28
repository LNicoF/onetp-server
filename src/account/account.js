import { randomUUID } from "crypto"
import { loginVerificationAccount, saveNewAccount, searchAccount } from "./account_repository.js";



export const createAccount = async ( {email, password} ) => {
    let account = new Account({
        id: randomUUID(),
        email: email,
        password: password,
    })
    const accountSearch = await searchAccount({email})
    if( accountSearch == null ){
        saveNewAccount( account ).then( () => {
            console.log( 'Account saved', { account } )
        } )
        return account
    }
    throw 'cuenta ya existente'
}

export const loginAccount = async ( {email, password} ) => {

    let account = await loginVerificationAccount( { email, password } )
    return account

}
export const deleteAccount = (id, email, password) => {
    
}

/**
* @param { {
*   id: string,
*   email: string,
*   password: string
* } }
*/

export function Account( {id, email, password } ){
    this.id       = id
    this.email    = email
    this.password = password
}


Account.prototype.deleteC = function(){

}
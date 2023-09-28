import { addGetRoute, addPostRoute } from "../lib/router.js";
import { createAccount, loginAccount } from "../account/account.js";
import { createJWT } from "../JWT/jwtCreate.js";

addPostRoute( '/account/register', async ( _, res, { email, password} ) => {
    try{
        await createAccount( { email, password } );
    }
    catch(execption){
        res.writeHead(409, { 'Content-Type': 'application/json' })
        res.end("Ya existe una cuenta asociada al usuario")
        console.error(execption)
        return ;
    }
    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end("Sesion Creada")
} )

addGetRoute( '/account/login', async ( _, res, { email, password} ) => {
    try{
        await loginAccount( { email, password} )
    }
    catch(exeption){
        res.writeHead(409, { 'Content-Type': 'application/json' })
        res.end("Email o Contraseña no Existente")
        console.error(exeption)
        return ;
    }
    const token = await createJWT({email})
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(token)//envia un token jwt que dura 1h
} )


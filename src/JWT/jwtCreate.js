import { searchIdAccount } from "../account/account_repository.js";
import jwt from 'jsonwebtoken';


export const createJWT = async ( {email} ) => {
    const accountSearch = await searchIdAccount({email})
    const payload = { userId: accountSearch };
    const secretKey = 'CE30z8dVCnjdfhkjs';

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
}
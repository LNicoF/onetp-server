import jwt from 'jsonwebtoken';

export const verifyJWT = ( {token} ) => {

const secretKey = 'CE30z8dVCnjdfhkjs';

jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('JWT verification failed:', err);
  } else {
    console.log('Decoded JWT:', decoded);
  }
});

}
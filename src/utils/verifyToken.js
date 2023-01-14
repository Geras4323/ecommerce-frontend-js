import jwt_decode from 'jwt-decode';

async function verifyToken(token) {
  const payload = await jwt_decode(token);
  return payload;
}

export { verifyToken };
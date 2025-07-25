//Server-side authentication utilities

import { jwtVerify } from 'jose';

interface UserJwtPayload {
    jti: string;
    iat: number;
}

export const getJwtSecretKey = () => {
    const secret = process.env.JWT_SECRET;
    
    if (!secret || secret.length === 0) {
        throw new Error('The environment variable JWT_SECRET is not set.');
    }
    
    return secret;
};

export const verifyAuth = async (token: string) => {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));
        return verified.payload as UserJwtPayload;
    } catch (error) {
        console.error('JWT verification failed:', error);
        throw new Error('User token has expired.');
    }
};
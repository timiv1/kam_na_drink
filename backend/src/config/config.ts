import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME;
const SERVER_PORT = process.env.SERVER_PORT;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER as string;
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET as Secret;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};

const config = {
    server: SERVER
};

export default config;
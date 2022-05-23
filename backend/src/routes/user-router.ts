import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

const cors = require('cors');
const router = Router();
const { CREATED, OK } = StatusCodes;

export const p = {
    get: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete',
} as const;

const drinks: string = "/drinks";
const locals: string = "/locals";

// Export default
export default router;
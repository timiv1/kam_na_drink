import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

const router = Router();
const { CREATED, OK } = StatusCodes;
const cors = require('cors');

export const p = {
    get: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete',
} as const;

// Export default
export default router;

import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { ParamMissingError } from '@shared/errors';

const cors = require('cors');
const router = Router();
const { CREATED, OK } = StatusCodes;

export const p = {
    get: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete',
} as const;
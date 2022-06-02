import Ajv from "ajv";
import { Request, Response, NextFunction } from "express";
const ajv = new Ajv()

function validateBody(schema: object) {
    // compile schema
    const validate = ajv.compile(schema);
    // middleware that returns error if schema is not ok
    return (req: Request, res: Response, next: NextFunction) => {
      if (!validate(req.body)) return res.status(400).json(validate.errors);
      return next();
    };
  }

export default validateBody;
import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

/**
 * Middleware genérico para validar corpo da requisição com Zod
 */
export const validateBody =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: result.error.issues, // ✅ usa .issues ao invés de .errors
      });
    }

    req.body = result.data;
    next();
  };


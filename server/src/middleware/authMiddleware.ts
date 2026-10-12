import type { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Falta el token d'autenticació" });
    return;
  }

  const token = header.slice("Bearer ".length);

  try {
    await getAuth().verifyIdToken(token);
    next(); // el token és vàlid: deixem passar la petició
  } catch {
    res.status(401).json({ error: "Token no vàlid o caducat" });
  }
}
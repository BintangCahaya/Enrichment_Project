import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../db/database.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../../config/env.js";

export async function registerUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const result = await db.run(
    `INSERT INTO users (email, password_hash) VALUES (?, ?)`,
    [email, passwordHash]
  );

  return { id: result.lastID, email };
}

export async function loginUser(email, password) {
  const user = await db.get(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user.id },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { token };
}

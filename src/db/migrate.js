import { db } from "./database.js";

export async function migrate() {
  // USERS (AUTH)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // KOS (OWNER RESOURCE)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS kos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (owner_id) REFERENCES users(id)
    );
  `);

  // ROOMS
  await db.exec(`
    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kos_id INTEGER NOT NULL,
      owner_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      price INTEGER,
      status TEXT DEFAULT 'available',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (kos_id) REFERENCES kos(id),
      FOREIGN KEY (owner_id) REFERENCES users(id)
    );
  `);

    // TENANTS
    await db.exec(`
    CREATE TABLE IF NOT EXISTS tenants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_id INTEGER NOT NULL,
      room_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      phone TEXT,
      check_in_date DATE NOT NULL,
      check_out_date DATE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (room_id) REFERENCES rooms(id),
      FOREIGN KEY (owner_id) REFERENCES users(id)
    );
  `);

  await db.exec(`
  CREATE TABLE IF NOT EXISTS room_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    tenant_id INTEGER,
    action TEXT NOT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

await db.exec(`
CREATE TABLE IF NOT EXISTS assets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  owner_id INTEGER NOT NULL,
  room_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  condition TEXT DEFAULT 'good',
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);
`);

await db.exec(`
CREATE TABLE IF NOT EXISTS asset_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  owner_id INTEGER NOT NULL,
  asset_id INTEGER NOT NULL,
  action TEXT NOT NULL,
  note TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);
`);

  // 💰 FINANCE — RENTS
  await db.exec(`
    CREATE TABLE IF NOT EXISTS rents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_id INTEGER NOT NULL,
      tenant_id INTEGER NOT NULL,
      amount INTEGER NOT NULL,
      period TEXT NOT NULL,           -- YYYY-MM
      due_date DATE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tenant_id) REFERENCES tenants(id),
      FOREIGN KEY (owner_id) REFERENCES users(id)
    );
  `);

  // 💳 FINANCE — PAYMENTS
  await db.exec(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_id INTEGER NOT NULL,
      tenant_id INTEGER NOT NULL,
      rent_id INTEGER,
      amount INTEGER NOT NULL,
      paid_at DATE NOT NULL,
      note TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tenant_id) REFERENCES tenants(id),
      FOREIGN KEY (rent_id) REFERENCES rents(id),
      FOREIGN KEY (owner_id) REFERENCES users(id)
    );
  `);

  console.log("✅ Database migrated");
}

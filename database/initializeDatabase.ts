import { SQLiteDatabase } from "expo-sqlite";



export async function initializeDatabase(db: SQLiteDatabase) {
    const DATABASE_VERSION = 1;

    try {
      const result = await db.getFirstAsync<{ user_version: number }>(
        'PRAGMA user_version'
      );
      let currentDbVersion = result?.user_version ? result?.user_version : 0
      if (currentDbVersion >= DATABASE_VERSION) {
        return;
      }
      if (currentDbVersion === 0) { 
        await db.execAsync(`
          PRAGMA journal_mode = 'wal';
          CREATE TABLE Transacciones (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fecha TEXT NOT NULL,
          descripcion TEXT,
          monto REAL NOT NULL,
          tipo TEXT CHECK (tipo IN ("Préstamo", "Devolución", "Otro")),
          movimiento TEXT NOT NULL CHECK (movimiento IN ("Ingreso", "Egreso"))
          )
        `);
        currentDbVersion = 1;
      }
      // if (currentDbVersion === 1) {
      //   Add more migrations
      // }
      console.log("Creación database exitosa")
      await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    } catch (error) {
      console.log("Error al inicializar las tablas: ", error)
    }
  }
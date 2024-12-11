import { createContext, PropsWithChildren, useState } from "react";
import * as SQLite from 'expo-sqlite';

import { Transaccion } from "@/interfaces/interfaces";



interface CrudDatbase {
  addTransaccion: ({ }: Transaccion) => Promise<"Ok" | "Error">,
  getTransacciones: () => Promise<"Ok" | "Error">,
  transacciones: Transaccion[] | undefined,
  totalMontos: number,
  deleteTransacciones: () => Promise<"Ok" | "Error">,
  totalIngresos: number,
  totalEgresos: number,
}


const DatabaseContext = createContext<CrudDatbase>({} as CrudDatbase);

const DatabaseProvider = ({ children }: PropsWithChildren) => {

  const db = SQLite.useSQLiteContext()

  const [transacciones, setTransacciones] = useState<Transaccion[] | undefined>([]);
  const [totalMontos, setTotalMontos] = useState<number>(0);
  const [totalIngresos, setTotalIngresos] = useState<number>(0);
  const [totalEgresos, setTotalEgresos] = useState<number>(0);



  const getTransacciones = async () => {

    try {
      const resultados = await db.getAllAsync<Transaccion>(`SELECT * FROM Transacciones`);
      const resultadosInvertidos = resultados.reverse()
      setTransacciones(resultadosInvertidos);
      await getTotalMontos()
      await getTotalIngresos()
      await getTotalEgresos()
      console.log("se consulto con exito")
      return ("Ok")
      
    } catch (error) {
      console.log("Error while loading getTransacciones: ", error)
      return ("Error")
    }
  };

  
  
  const addTransaccion = async ({ fecha, descripcion, monto, tipo, movimiento }: Transaccion) => {

    const statement = await db.prepareAsync(
      'INSERT INTO Transacciones (fecha, descripcion, monto, tipo, movimiento) VALUES (?, ?, ?, ?, ?)'
    );
    
    try {
      console.log("Creando transacción")
      await statement.executeAsync([fecha, descripcion, monto, tipo, movimiento]);
      return ("Ok")
    } catch (error) {
      console.log("Error while add a transaccion: ", error)
      return ("Error")
    } finally {
      await statement.finalizeAsync();
    }
  };
  
  const getTotalMontos = async () => {
    
    try {
      const resultados = await db.getAllAsync<{ "totalMonto": number }>(`SELECT SUM(monto) AS totalMonto FROM transacciones`);
      console.log("total monto: ", resultados)
      setTotalMontos(resultados[0].totalMonto)
      return ("Ok")
      
    } catch (error) {
      console.log("Error while loading getMontos: ", error)
      return ("Error")
    }
  };
  
  const getTotalIngresos = async () => {
    
    try {
      const resultados = await db.getAllAsync<{ "totalIngreso": number }>(`SELECT SUM(monto) AS totalIngreso FROM transacciones WHERE movimiento = ?`, ['Ingreso']);
      console.log("total ingreso: ", resultados)
      setTotalIngresos(resultados[0].totalIngreso)
      return ("Ok")

    } catch (error) {
      console.log("Error while loading getTotalIngresos: ", error)
      return ("Error")
    }
  };

  const getTotalEgresos = async () => {
    
    try {
      const resultados = await db.getAllAsync<{ "totalEgreso": number }>(`SELECT SUM(monto) AS totalEgreso FROM transacciones WHERE movimiento = ?`, ['Egreso']);
      console.log("total ingreso: ", resultados)
      setTotalEgresos(resultados[0].totalEgreso)
      return ("Ok")

    } catch (error) {
      console.log("Error while loading getTotalIngresos: ", error)
      return ("Error")
    }
  };


  const deleteTransacciones = async () => {

    try {
      await db.execAsync(`
        DROP TABLE IF EXISTS Transacciones;
        CREATE TABLE IF NOT EXISTS Transacciones (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fecha TEXT NOT NULL,
          descripcion TEXT,
          monto REAL NOT NULL,
          tipo TEXT CHECK (tipo IN ("Préstamo", "Devolución", "Otro")),
          movimiento TEXT NOT NULL CHECK (movimiento IN ("Ingreso", "Egreso"))
        );
        `)
      await getTransacciones()
      console.log("Tabla Transacciones, borrada e inicializada exitosamente")
      return "Ok"
    } catch (error) {
      console.log("Error, no se pudo borrar la BD: ", error)
      return "Error"
    }
  }

  return (
    <DatabaseContext.Provider value={{
      addTransaccion,
      getTransacciones,
      transacciones,
      totalMontos,
      totalIngresos,
      totalEgresos,
      deleteTransacciones,
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export { DatabaseContext };

export default DatabaseProvider;


export interface Transaccion {
  id?: number;
  monto: number;
  descripcion: string;
  fecha: string;
  tipo: 'Préstamo' | 'Devolución' | 'Otro';
  movimiento: "Ingreso" | "Egreso";
}
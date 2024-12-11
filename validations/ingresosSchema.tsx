import { date, number, object, string } from "yup";




export const ingresosSchema = object().shape({
    monto: string().required("Campo obligatorio"),
    descripcion: string(),
    fecha: date(),
})
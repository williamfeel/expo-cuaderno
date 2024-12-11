import { Alert } from "react-native";
import { printToFileAsync } from "expo-print";
import { isAvailableAsync, shareAsync } from "expo-sharing";
import { Transaccion } from "@/interfaces/interfaces";


interface Props {
    transacciones: Transaccion[] | undefined;
    totalMonto: number;
    totalIngresos: number;
    totalEgresos: number;
    setIsCreatingPdf: (value:boolean)=>void;
}



export const crearPDF = async ({ transacciones, totalMonto, totalIngresos, totalEgresos, setIsCreatingPdf }: Props) => {
    try {
        // Crear el contenido HTML
        const htmlContent = `
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { text-align: center; color: #6200EE; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
                th { background-color: #6200EE; color: white; }
              </style>
            </head>
            <body>
              <h1>Lista de Transacciones</h1>
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Fecha</th>
                    <th>Descripción</th>
                    <th>Tipo</th>
                    <th>Movimiento</th>
                    <th>Monto</th>
                    </tr>
                </thead>
                <tbody>
                  ${transacciones === undefined ? `<tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>` :
                transacciones.map(
                    (transacciones, index) => `
                      <tr>
                        <td>${index}</td>
                        <td>${transacciones.fecha}</td>
                        <td>${transacciones.descripcion}</td>
                        <td>${transacciones.tipo}</td>
                        <td>${transacciones.movimiento}</td>
                        <td>${transacciones.monto.toLocaleString("en-US")}</td>
                      </tr>
                    `
                )
                    .join('')}
                    <tr>
                    </tr>
                    <tr>
                        <td colspan="5">Total Ingresos:</td>
                        <td>${totalIngresos.toLocaleString("en-US")}</td>
                    </tr>
                    <tr>
                        <td colspan="5">Total Egresos:</td>
                        <td>${totalEgresos.toLocaleString("en-US")}</td>
                    </tr>
                    <tr>
                        <td colspan="5">Total Ingresos - Egresos:</td>
                        <td>${totalMonto.toLocaleString("en-US")}</td>
                    </tr>
                  <tr>
                </tbody>
              </table>
            </body>
          </html>
        `;

        // Generar el PDF
        const { uri } = await printToFileAsync({ html: htmlContent });
        console.log('PDF generado en:', uri);

        // Compartir el archivo PDF
        if (await isAvailableAsync()) {
            await shareAsync(uri);
        } else {
            Alert.alert('PDF Generado', `El PDF ha sido guardado en: ${uri}`);
        }
        setIsCreatingPdf(false)
    } catch (error) {
        console.error('Error al generar el PDF:', error);
    }


};

import { Transaccion } from "@/interfaces/interfaces";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";


interface Props {
  transacciones: Transaccion[] | undefined
}

export default function ListarTransacciones({ transacciones }: Props) {

  const fechaString = (fechaStr: string) => {

    const newFechaStr = new Date(fechaStr)
    const strggg = newFechaStr.toLocaleDateString("es-ES", {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    return strggg
  }

  const fechaDia = (fechaStr: string) => {

    const newFechaStr = new Date(fechaStr)
    const strggg = newFechaStr.toLocaleDateString("es-ES", {
      weekday: 'long',
    })
    return strggg
  }

 
  return (
    <View style={{ paddingBottom: 280 }}>
      {transacciones?.length === 0 ? (<Text>No hay registros en el cuaderno...</Text>)
        : (
          <FlatList
            data={transacciones}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) =>
              <View style={styles.header}>
                <View>
                  <Text style={{ textAlign: "right", fontSize: 24, backgroundColor: "#fff", paddingLeft: 5 }}>{item.monto.toLocaleString("en-US")}</Text>
                  <View style={{ flexDirection: "row", backgroundColor: "#fff" }}>
                    <Text style={{ paddingTop:5}}>
                      {item.movimiento === "Ingreso" ?
                        <MaterialCommunityIcons name="notebook-plus" color={"green"} size={26} />
                        : <MaterialCommunityIcons name="notebook-minus" color={"red"} size={26} />}
                    </Text>
                    <View style={{paddingLeft:5}}>
                      <Text>{fechaDia(item.fecha)}</Text>
                      <Text>{fechaString(item.fecha)}</Text>
                    </View>
                  </View>
                </View>
                <Text style={[styles.cell, { flex: 2, fontSize: 18 }]}>
                  {item.tipo === "Préstamo" ? "(Préstamo) " : item.tipo === "Devolución" ? "(Devolución) " : "(Otro) "}{item.descripcion}
                </Text>
              </View>
            }
          />)
      }
    </View>
  )

}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    padding: 8,
    alignItems: 'flex-start',
  },
  ingresoIcon: {
    backgroundColor: "green",
    padding: 8,
    alignItems: 'center',
    margin: 10,
    borderRadius: 50
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor:"#fff",
    borderRadius:10
  },
});
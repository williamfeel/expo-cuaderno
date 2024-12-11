import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListarTransacciones from "@/components/ListarTransacciones";
import { DatabaseContext } from "@/components/context/DatabaseProvider";
import MyModalOpcionesCuaderno from "@/components/modals/MyModalOpcionesCuaderno";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MyModalMessageConfirmation from "@/components/modals/MyModalMessageConfirmation";
import { crearPDF } from "@/helpers/createPdf";


const useDatabase = () => useContext(DatabaseContext);

export default function Cuaderno() {

  const { transacciones, totalMontos, deleteTransacciones, getTransacciones, totalIngresos, totalEgresos } = useDatabase()

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalConfirmation, setModalConfirmation] = useState<boolean>(false);
  const [res, setRes] = useState<"Ok" | "Error">()
  const [isCreatingPdf, setIsCreatingPdf] = useState(false)

  useEffect(() => {
    getTransacciones()
  }, [])

  const borrarTablaTransacciones = async () => {
    const respuesta = await deleteTransacciones()
    setRes(respuesta)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Gestión Financiera</Text>
        <Text style={styles.subtitle}>Noralba Montenegro</Text>
      </View>
      <Text style={styles.header}>Mi Cuaderno</Text>
      <View style={styles.cardResume}>
        <View style={{ borderRadius: 50, paddingHorizontal: 20, backgroundColor: "#fff" }}>
          <Text style={{ fontSize: 24, color: totalMontos < 0 ? "red" : "black", fontWeight: "bold" }}>$ {totalMontos ? totalMontos.toLocaleString("en-US") : 0}</Text>
          <Text>Estado de Cuenta</Text>
        </View>
        <TouchableOpacity onPress={() => setIsModalVisible(!isModalVisible)}>
          <MaterialCommunityIcons name="application-cog-outline" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
      </View>
      <ListarTransacciones transacciones={transacciones} />
      <MyModalOpcionesCuaderno isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <View style={styles.styleModal}>
          <View style={{flexDirection:"column", alignItems:"center"}}>
            <View style={{alignItems:"center", marginTop:20}}>
              <Text style={styles.textModal}>Guardar el Cuaderno en un PDF</Text>
              <TouchableOpacity onPress={() => { crearPDF({ transacciones: transacciones, totalEgresos: totalEgresos, totalIngresos: totalIngresos, totalMonto: totalMontos, setIsCreatingPdf: setIsCreatingPdf }), setIsCreatingPdf(true) }}>
                {isCreatingPdf ? <ActivityIndicator /> : <Text style={{ backgroundColor: "#2196F3", color: "#fff", paddingHorizontal: 20, paddingVertical: 10, fontWeight:"bold" }}>PDF</Text>}
              </TouchableOpacity>
            </View>
            <View style={{alignItems:"center", marginTop:20}}>
              <Text style={styles.textModal}>Borrar los Registros del Cuaderno</Text>
              <TouchableOpacity onPress={() => { borrarTablaTransacciones(), setModalConfirmation(true) }}>
                {!res===undefined ? <ActivityIndicator /> : <Text style={{ backgroundColor: "#2196F3", color: "#fff", paddingHorizontal: 20, paddingVertical: 10, fontWeight:"bold" }}>BORRAR</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </MyModalOpcionesCuaderno>
      <MyModalMessageConfirmation
        modalVisible={modalConfirmation}
        setModalVisible={setModalConfirmation}
        res={res}
        message="Afirmativo"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerCell: {
    padding: 8,
    alignItems: 'flex-start',
    backgroundColor: '#f1f8ff',
  },
  cell: {
    padding: 8,
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  headerContainer: {
    backgroundColor: '#6200EE', // Material 3 color: Morado suave
    padding: 16,
    borderBottomLeftRadius: 24,  // Bordes más redondeados
    borderBottomRightRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40
  },
  title: {
    fontSize: 26,  // Un tamaño más grande
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#FFFFFF',
  },
  styleModal: {
    flex: 1,
  },
  textModal: {
    color: "#fff",
    fontSize: 24
  },
  cardResume: {
    bottom: 24,
    height: 50,
    marginHorizontal: 16,
    borderRadius: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: "center",
    borderColor: '#dadada',
    flexDirection: "row",
    paddingHorizontal: 15

  }
});
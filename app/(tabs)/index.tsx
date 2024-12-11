import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function Index() {


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Gestión Financiera</Text>
          <Text style={styles.subtitle}>Noralba Montenegro</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.header}>¡Hola! ¿Qué deseas hacer?</Text>
          <View style={styles.containerButtons}>
            <Link asChild href="/ingresos">
            <TouchableOpacity>
              <View style={styles.containerText}>
                <View style={styles.button}>
                  <MaterialCommunityIcons name="hand-heart" size={30} color={"#6200EE"} />
                </View>
                <Text style={styles.buttonText}>Registrar un Ingreso</Text>
              </View>
            </TouchableOpacity>
            </Link>
            <Link asChild href="/egresos">
            <TouchableOpacity>
              <View style={styles.containerText}>
                <View style={styles.button}>
                  <MaterialCommunityIcons name="bank-transfer-out" size={36} color={"#6200EE"} />
                </View>
                <Text style={styles.buttonText}>Registrar un Egreso</Text>
              </View>
            </TouchableOpacity>
            </Link>
          </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  bodyContainer: {
    flex: 1,
    justifyContent:"center"
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 40,
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
  button: {
    backgroundColor: "#fff",
    height: 80,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: "center",
    borderWidth: 0.5,
    borderColor: '#dadada',
    elevation:8,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent:"space-around",
  },
  containerText: {
    flexDirection: "column",
  },
});
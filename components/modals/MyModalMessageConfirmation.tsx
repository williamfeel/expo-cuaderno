import { Link } from "expo-router";
import { ActivityIndicator, Alert, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";


interface Props {
  modalVisible: boolean,
  setModalVisible: (visible: boolean) => void,
  res: "Ok" | "Error" | undefined,
  message?: string

}


export default function MyModalMessageConfirmation({ modalVisible, setModalVisible, res, message }: Props) {




  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        {!res ? <ActivityIndicator size="small" color="#0000ff" /> :
          <View style={styles.modalView}>
            {res === "Ok" ?
              <Text style={styles.modalText}>{message ? "¡Listo! Todo quedó borrado perfectamente. ✅" : "¡Yuju! Tu transacción ha sido guardada en el Cuaderno.  ¿Un cafecito para celebrar? ☕"}</Text>
              : <Text style={[styles.modalText, { color: "red" }]}>{message ? "Atención. ¡No se ha podido borrar el Cuaderno. Comuniquese con William!" : "Atención. ¡No se ha podido guardar la transacción. Por favor verificalo en el cauderno!"}</Text>
            }
            <Link asChild href={"/(tabs)/cuaderno"}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Aceptar</Text>
              </TouchableOpacity>
            </Link>
          </View>
        }
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 26,
    marginHorizontal: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24
  },
});



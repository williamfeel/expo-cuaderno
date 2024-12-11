import { SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";


interface Props {
  tipoActual: [boolean, boolean, boolean];
  setTipoActual : (value: SetStateAction<[boolean, boolean, boolean]>) => void;
  tipo: 'Préstamo' | 'Devolución' | 'Otro';
}

export default function MyButtonMovimiento({ tipoActual, setTipoActual, tipo }:Props) {

  const colorButtonTipoIngreso = (tipo: number) => {

    const copiaTipoActual: [boolean, boolean, boolean] = [...tipoActual]
    if (tipo === 1) {
      copiaTipoActual[0] = true
      copiaTipoActual[1] = false
      copiaTipoActual[2] = false
    }
    if (tipo === 2) {
      copiaTipoActual[0] = false
      copiaTipoActual[1] = true
      copiaTipoActual[2] = false
    }
    if (tipo === 3) {
      copiaTipoActual[0] = false
      copiaTipoActual[1] = false
      copiaTipoActual[2] = true
    }
    setTipoActual(copiaTipoActual)
  }

  const foco = (tipo === "Préstamo") ? 1 : (tipo === "Devolución") ? 2 : 3

  return (
    <TouchableOpacity onPress={() => colorButtonTipoIngreso(foco)} style={[styles.buttonOpcions, tipoActual[foco-1] ? { backgroundColor: "#2196F3" } : { backgroundColor: "#fff" }]}>
      <Text style={[styles.textInputFecha, tipoActual[foco-1] ? { color: "#fff" } : { color: "#000" }]}>{tipo}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  
  buttonOpcions: {
    paddingVertical: 5,
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: "#999",
  },
  inputFecha: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
    borderColor: "#999",
    height: 44,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center"
  },
  textInputFecha: {
    fontSize: 20,
    paddingLeft: 10
  },
  
});
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Formik } from 'formik';
import FormikInputValue from "@/components/FormikInputValue";
import { DateTimePickerAndroid, DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ingresosSchema } from "@/validations/ingresosSchema";
import { DatabaseContext } from "@/components/context/DatabaseProvider";
import MyButtonMovimiento from "@/components/buttons/MyButtonMovimiento";
import { Transaccion } from "@/interfaces/interfaces";
import MyModalMessageConfirmation from "@/components/modals/MyModalMessageConfirmation";
import { ActivityIndicator } from "react-native";

const useDatabase = () => useContext(DatabaseContext)


export default function Egresos() {


  const [date, setDate] = useState<Date>(new Date())
  const [activaMessage, setActivaMessage] = useState(false)
  const [tipoActual, setTipoActual] = useState<[boolean, boolean, boolean]>([false, false, false])
  const [modalVisible, setModalVisible] = useState(false);
  const [res, setRes] = useState<"Ok" | "Error">()
  const [isLoadingAdd, setIsLoadingAdd] = useState(false)

  const { addTransaccion } = useDatabase()

  useEffect(() => {
    if (res === "Ok" || res === "Error") {
      setIsLoadingAdd(false)
    }

  }, [res])


  const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate ? selectedDate : new Date();
    setDate(currentDate);
  };
  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onChange,
      mode: currentMode,
      is24Hour: false,
    });
  };

  const fechaStr = () => {

    const strggg = date.toLocaleDateString("es-ES", {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    return strggg
  }

  return (
    <View style={styles.container}>
      <MyModalMessageConfirmation
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        res={res} />
      <Text style={styles.header}>Mis Cuentas con Rodrigo</Text>
      <Text style={styles.label}>Seleccione el tipo de egreso</Text>
      <View style={styles.row}>
        <MyButtonMovimiento tipoActual={tipoActual} setTipoActual={setTipoActual} tipo="Préstamo" />
        <MyButtonMovimiento tipoActual={tipoActual} setTipoActual={setTipoActual} tipo="Devolución" />
        <MyButtonMovimiento tipoActual={tipoActual} setTipoActual={setTipoActual} tipo="Otro" />
      </View>
      <Formik
        validationSchema={ingresosSchema}
        initialValues={{
          monto: "",
          descripcion: "",
          fecha: new Date(),
        }}
        onSubmit={async (values, { resetForm }) =>  {

          values.fecha = date
          const fecha = values.fecha.toISOString().split('T')[0];
          const indexTipo = tipoActual.indexOf(true)
          const montoStr = values.monto.replace(/,/g, "");
          const montoNum = (-1) * (parseFloat(montoStr))

          const newValues: Transaccion = {
            fecha: fecha,
            descripcion: values.descripcion,
            monto: montoNum,
            tipo: indexTipo === 0 ? "Préstamo" : indexTipo === 1 ? "Devolución" : "Otro",
            movimiento: "Egreso"
          }
          const respuesta = await addTransaccion(newValues)
          setRes(respuesta)
          resetForm()
        }}
      >
        {({ errors, handleSubmit, values }) => (
          <View>
            <View style={styles.inputsContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.labelInput}>Fecha</Text>
                <MaterialCommunityIcons name="calendar" size={24} color={"#365D6C"} />
              </View>
              <TouchableOpacity onPress={() => showMode("date")} >
                <FormikInputValue
                  name="fecha"
                  value={fechaStr()}
                  editable={false}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputsContainer}>
              <Text style={styles.labelInput}>Descripción</Text>
              <FormikInputValue
                name="descripcion"
                inputMode="text"
              />
            </View>
            <View style={styles.inputsContainer}>
              <Text style={styles.labelInput}>Monto</Text>
              <FormikInputValue
                isNumber={true}
                name="monto"
                inputMode="numeric"
              />
              {
                activaMessage && (<Text style={styles.textError}>{errors.monto}</Text>)
              }
            </View>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <TouchableOpacity
                disabled={isLoadingAdd}
                onPress={async () => {
                  try {
                    const indexTipo = tipoActual.indexOf(true)
                    const vale = await ingresosSchema.validate(values)
                    if (vale || (indexTipo !== -1)) { handleSubmit(), setModalVisible(true), setIsLoadingAdd(true) }

                  } catch (error) {
                    setActivaMessage(true)
                  }
                }}
                style={styles.buttonSubmit}>
                <Text style={{ fontSize: 24, color: "#fff", marginHorizontal: 30, marginVertical: 5 }}>{isLoadingAdd ? <ActivityIndicator size="large" color="#fff" />: "Guardar"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  label: { fontSize: 18, marginTop: 16, marginBottom: 8, textAlign: "center", color: "#365D6C", fontWeight: "bold" },
  row: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  transaction: { fontSize: 16, marginVertical: 4 },

  inputsContainer: {
    marginTop: 20
  },
  buttonSubmit: {
    marginTop: 32,
    backgroundColor: "#6200EE",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    borderColor: "#999",
  },
  buttonOpcions: {
    paddingVertical: 5,
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: "#999",
  },
  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
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
  labelInput: {
    fontWeight: "bold",
    color: "#365D6C",
    fontSize: 18
  },
  inputIcon: {
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: "#999",
    fontSize: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  textError: {
    fontWeight: "bold",
    color: "#bb2124"
  },
});
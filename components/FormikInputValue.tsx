import { useState } from "react";
import { StyleSheet, TextInputProps, TextInput } from "react-native";
import { useField } from "formik";


interface Props extends TextInputProps {
  name: string
  isNumber?: boolean
}

export default function FormikInputValue({ name, isNumber=false, ...props}: Props) {

  const [field, meta, helpers] = useField(name)
  

  
  const validar = (valor: string) => {

    if(isNumber){
    const numero = valor.replace(/[^\d.]/g, '');
    const partes = numero.split('.');
    if (partes.length > 2) partes.pop();
    partes[0] = partes[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    const newValor = partes.join('.');
    helpers.setValue(newValor)
    }else{
      helpers.setValue(valor)
    }
  }

  return (
    <TextInput
      style={styles.input}
      value={field.value}
      onChangeText={value => validar(value)}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: { 
    borderWidth: 1, 
    paddingHorizontal: 20, 
    borderRadius: 5, 
    borderColor: "#999",
    fontSize: 20,
    backgroundColor: "#fff",
  },
})
import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import MyButtonTab from "@/components/buttons/MyButtonTab";
import { useState } from "react";

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6200EE",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: (props)=>(<MyButtonTab title="Mis Registros" iconName="finance" {...props}/>)
        }}
      />
      <Tabs.Screen
        name="cuaderno"
        options={{
          tabBarButton: (props)=>(<MyButtonTab title="Mi Cuaderno" iconName="notebook-outline" {...props}/>)
        }} />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "#6200EE",
    bottom: 20,
    height: "8%",
    marginHorizontal: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: "center",
    borderWidth: 0.5,
    borderColor: '#dadada'
  }
})

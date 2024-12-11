import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SQLiteProvider } from 'expo-sqlite';
import DatabaseProvider from "@/components/context/DatabaseProvider";
import { initializeDatabase } from "@/database/initializeDatabase";

export default function RootLayout() {

  return (
    <SQLiteProvider databaseName="mi_bd.db" onInit={initializeDatabase}>
      <StatusBar style="dark" />
      <DatabaseProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </DatabaseProvider>
    </SQLiteProvider>
  )
}

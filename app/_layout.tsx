import "../global.css";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { runMigrations } from "../src/database/database";

export default function RootLayout() {
  useEffect(() => { void runMigrations(); }, []);
  return (
    <Stack screenOptions={{ headerTintColor: "#4338ca", headerTitleStyle: { fontWeight: "700" } }}>
      <Stack.Screen name="index" options={{ title: "Minhas séries" }} />
      <Stack.Screen name="form" options={{ title: "Série" }} />
      <Stack.Screen name="detalhe" options={{ title: "Detalhes" }} />
    </Stack>
  );
}

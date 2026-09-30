import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import { getSeries } from "../src/database/serieRepository";
import type { Serie, SerieFilter } from "../src/types/serie";

const filters: { value: SerieFilter; label: string }[] = [
  { value: "todas", label: "Todas" }, { value: "assistindo", label: "Assistindo" }, { value: "concluidas", label: "Concluídas" },
];

export default function Index() {
  const router = useRouter();
  const [filter, setFilter] = useState<SerieFilter>("todas");
  const [series, setSeries] = useState<Serie[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try { setSeries(await getSeries(filter)); } finally { setLoading(false); }
  }, [filter]);
  useFocusEffect(useCallback(() => { void load(); }, [load]));

  return (
    <View className="flex-1 bg-slate-50 px-5 pt-5">
      <View className="mb-5 flex-row rounded-xl bg-white p-1 shadow-sm">
        {filters.map((item) => <Pressable key={item.value} onPress={() => setFilter(item.value)} className={`flex-1 items-center rounded-lg px-2 py-3 ${filter === item.value ? "bg-indigo-600" : "bg-transparent"}`}>
          <Text className={`text-xs font-bold ${filter === item.value ? "text-white" : "text-slate-500"}`}>{item.label}</Text>
        </Pressable>)}
      </View>
      {loading ? <ActivityIndicator className="mt-10" color="#4f46e5" /> : <FlatList
        data={series} keyExtractor={(item) => String(item.id)} contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={<View className="items-center px-6 pt-16"><Text className="text-lg font-bold text-slate-700">Nenhuma série encontrada</Text><Text className="mt-2 text-center text-slate-500">Cadastre sua primeira série para começar.</Text></View>}
        renderItem={({ item }) => <Pressable onPress={() => router.push(`/detalhe?id=${item.id}`)} className={`mb-3 rounded-2xl border p-4 shadow-sm ${item.concluida ? "border-emerald-200 bg-emerald-50" : "border-indigo-100 bg-white"}`}>
          <View className="flex-row items-center justify-between"><Text className="flex-1 text-lg font-bold text-slate-800">{item.titulo}</Text><Text className="text-xl text-amber-500">{item.nota ? "★".repeat(item.nota) : "☆"}</Text></View>
          <Text className="mt-1 text-slate-500">{item.plataforma} · {item.temporadas} {item.temporadas === 1 ? "temporada" : "temporadas"}</Text>
          <Text className={`mt-3 text-xs font-bold ${item.concluida ? "text-emerald-700" : "text-indigo-600"}`}>{item.concluida ? "CONCLUÍDA" : "ASSISTINDO"} · {item.nota ? `Nota ${item.nota}/5` : "Sem nota"}</Text>
        </Pressable>}
      />} 
      <Pressable onPress={() => router.push("/form")} className="absolute bottom-6 left-5 right-5 items-center rounded-2xl bg-indigo-600 py-4 shadow-lg"><Text className="font-bold text-white">+ Nova série</Text></Pressable>
    </View>
  );
}

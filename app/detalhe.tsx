import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { deleteSerie, getSerieById, toggleSerieConcluida } from "../src/database/serieRepository";
import type { Serie } from "../src/types/serie";

export default function Detalhe() {
  const router = useRouter(); const { id } = useLocalSearchParams<{ id: string }>(); const serieId = Number(id); const [serie, setSerie] = useState<Serie | null>(null);
  const load = useCallback(async () => setSerie(await getSerieById(serieId)), [serieId]); useEffect(() => { void load(); }, [load]);
  if (!serie) return <View className="flex-1 items-center justify-center bg-slate-50"><Text className="text-slate-500">Série não encontrada.</Text></View>;
  const remove = () => Alert.alert("Excluir série", "Tem certeza que deseja excluir esta série?", [{ text: "Cancelar", style: "cancel" }, { text: "Excluir", style: "destructive", onPress: () => { void deleteSerie(serie.id).then(() => router.replace("/")); } }]);
  return <View className="flex-1 bg-slate-50 px-5 pt-8"><View className="rounded-2xl bg-white p-6 shadow-sm"><Text className="text-3xl font-bold text-slate-800">{serie.titulo}</Text><Text className="mt-2 text-lg text-slate-500">{serie.plataforma}</Text><View className="mt-8 gap-4"><Text className="text-slate-700">Temporadas assistidas: <Text className="font-bold">{serie.temporadas}</Text></Text><Text className="text-slate-700">Nota: <Text className="font-bold">{serie.nota ? `${serie.nota}/5` : "Sem nota"}</Text></Text><Text className="text-slate-700">Status: <Text className="font-bold">{serie.concluida ? "Concluída" : "Assistindo"}</Text></Text><Text className="text-xs text-slate-400">Cadastrada em {new Date(serie.createdAt).toLocaleDateString("pt-BR")}</Text></View></View><Pressable onPress={() => void toggleSerieConcluida(serie.id).then(load)} className="mt-5 items-center rounded-xl bg-emerald-600 py-4"><Text className="font-bold text-white">{serie.concluida ? "Voltar para assistindo" : "Marcar como concluída"}</Text></Pressable><Pressable onPress={() => router.push(`/form?id=${serie.id}`)} className="mt-3 items-center rounded-xl bg-indigo-600 py-4"><Text className="font-bold text-white">Editar</Text></Pressable><Pressable onPress={remove} className="mt-3 items-center rounded-xl border border-red-200 py-4"><Text className="font-bold text-red-600">Excluir</Text></Pressable></View>;
}

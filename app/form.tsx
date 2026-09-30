import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { createSerie, getSerieById, updateSerie } from "../src/database/serieRepository";

export default function Form() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const editingId = id ? Number(id) : null;
  const [titulo, setTitulo] = useState(""); const [plataforma, setPlataforma] = useState(""); const [temporadas, setTemporadas] = useState(""); const [nota, setNota] = useState<number | null>(null);
  useEffect(() => { if (editingId) void getSerieById(editingId).then((serie) => { if (serie) { setTitulo(serie.titulo); setPlataforma(serie.plataforma); setTemporadas(String(serie.temporadas)); setNota(serie.nota); } }); }, [editingId]);
  async function save() {
    const seasons = Number(temporadas);
    if (!titulo.trim() || !plataforma.trim()) return Alert.alert("Atenção", "Título e plataforma são obrigatórios.");
    if (!temporadas.trim() || !Number.isInteger(seasons) || seasons < 0) return Alert.alert("Atenção", "Temporadas deve ser um número inteiro maior ou igual a zero.");
    const input = { titulo: titulo.trim(), plataforma: plataforma.trim(), temporadas: seasons, nota };
    if (editingId) await updateSerie(editingId, input); else await createSerie(input);
    router.back();
  }
  return <ScrollView className="flex-1 bg-slate-50 px-5 pt-6" keyboardShouldPersistTaps="handled"><Text className="mb-2 font-bold text-slate-700">Título</Text><TextInput value={titulo} onChangeText={setTitulo} placeholder="Ex.: Dark" className="mb-5 rounded-xl bg-white px-4 py-4 text-slate-800" /><Text className="mb-2 font-bold text-slate-700">Plataforma</Text><TextInput value={plataforma} onChangeText={setPlataforma} placeholder="Ex.: Netflix" className="mb-5 rounded-xl bg-white px-4 py-4 text-slate-800" /><Text className="mb-2 font-bold text-slate-700">Temporadas</Text><TextInput value={temporadas} onChangeText={setTemporadas} placeholder="0" keyboardType="numeric" className="mb-5 rounded-xl bg-white px-4 py-4 text-slate-800" /><Text className="mb-2 font-bold text-slate-700">Nota (opcional)</Text><View className="mb-8 flex-row gap-2">{[1, 2, 3, 4, 5].map((value) => <Pressable key={value} onPress={() => setNota(nota === value ? null : value)} className="rounded-xl bg-white px-3 py-3"><Text className={`text-3xl ${nota && value <= nota ? "text-amber-400" : "text-slate-300"}`}>★</Text></Pressable>)}</View><Pressable onPress={() => void save()} className="mb-10 items-center rounded-2xl bg-indigo-600 py-4"><Text className="font-bold text-white">{editingId ? "Salvar alterações" : "Cadastrar série"}</Text></Pressable></ScrollView>;
}

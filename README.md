# Minhas Séries

Aplicativo mobile em Expo/React Native para cadastrar, editar, filtrar e acompanhar séries, com persistência local em SQLite.

## Como rodar

```bash
npm install
npx expo start
```

O app possui as telas de lista, detalhe e formulário. Os dados permanecem salvos no SQLite mesmo após fechar e reabrir o aplicativo.

## Teste de persistência (Etapa 8)

Para comprovar a persistência: cadastre três séries, conclua uma, edite outra, feche o Expo Go completamente e abra novamente. Confira a lista e teste os filtros “Todas”, “Assistindo” e “Concluídas”.

> Evidência: adicionar aqui os prints ou o link do vídeo gravado durante o teste no dispositivo/emulador.

## Diário do copiloto

### Registro 1 — Etapa 2
**O que eu pedi:** como representar uma série e uma nota opcional.
**O que a IA sugeriu (resumo):** usar `nota: number | null` e separar a entidade dos dados de criação.
**O que eu fiz:** aceitei, porque o banco permite `NULL` e a série nova não precisa receber id ou data da tela.

### Registro 2 — Etapa 3
**O que eu pedi:** como manter uma única conexão SQLite.
**O que a IA sugeriu (resumo):** guardar a Promise de `openDatabaseAsync` em uma variável singleton.
**O que eu fiz:** aceitei e coloquei a migração em uma função separada.

### Registro 3 — Etapa 4
**O que eu pedi:** como filtrar séries concluídas.
**O que a IA sugeriu (resumo):** aplicar `.filter()` depois de buscar todas as séries.
**O que eu fiz:** rejeitei essa sugestão, porque o requisito pede o filtro no SQL; usei `WHERE concluida = 1`.

### Registro 4 — Etapa 5
**O que eu pedi:** por que a lista precisa de `useFocusEffect`.
**O que a IA sugeriu (resumo):** recarregar a lista quando a tela voltar ao foco e envolver a função com `useCallback`.
**O que eu fiz:** aceitei e usei o filtro como dependência do callback.

### Registro 5 — Etapa 6
**O que eu pedi:** como tratar a nota escolhida por estrelas.
**O que a IA sugeriu (resumo):** tocar na mesma estrela deve limpar a nota e enviar `null` ao repositório.
**O que eu fiz:** aceitei, mantendo a nota opcional tanto na criação quanto na edição.

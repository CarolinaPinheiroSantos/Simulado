import { useEffect, useState } from "react";
import axios from "axios";
import { Coluna } from "../Componentes/Coluna";

export function Quadro() {
  const [tarefas, setTarefas] = useState([]);

  const atualizarTarefas = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/tarefa/");
      setTarefas(res.data);
    } catch (err) {
      console.error("Erro ao buscar tarefas:", err);
    }
  };

  useEffect(() => {
    atualizarTarefas();
  }, []);

  const tarefaAfazer = tarefas.filter((t) => t.status === "aFazer");
  const tarefaFazendo = tarefas.filter((t) => t.status === "fazendo");
  const tarefaFeito = tarefas.filter((t) => t.status === "feito");

  return (
    <main style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <Coluna titulo="A fazer" tarefas={tarefaAfazer} atualizarTarefas={atualizarTarefas} />
      <Coluna titulo="Fazendo" tarefas={tarefaFazendo} atualizarTarefas={atualizarTarefas} />
      <Coluna titulo="Feito" tarefas={tarefaFeito} atualizarTarefas={atualizarTarefas} />
    </main>
  );
}

import { Tarefa } from './Tarefa';

export function Coluna({ titulo, tarefas = [], atualizarTarefas }) {
  return (
    <section style={{ flex: 1, padding: "1rem", border: "1px solid #ccc", borderRadius: "5px" }}>
      <h2>{titulo}</h2>
      {tarefas.map((tarefa) => (
        <Tarefa key={tarefa.idTarefa} tarefa={tarefa} atualizarTarefas={atualizarTarefas} />
      ))}
    </section>
  );
}

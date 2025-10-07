import { Tarefa } from './Tarefa';

export function Coluna({ titulo, tarefas = [], atualizarTarefas }) {
  return (
    <section className='coluna'>
      <h2>{titulo}</h2>
      {tarefas.map((tarefa) => (
        <Tarefa key={tarefa.idTarefa} tarefa={tarefa} atualizarTarefas={atualizarTarefas} />
      ))}
    </section>
  );
}

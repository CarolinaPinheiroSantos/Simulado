import axios from "axios";

export function Tarefa({ tarefa, atualizarTarefas }) {
  async function excluirTarefa() {
    if (!window.confirm("Deseja realmente excluir esta tarefa?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/tarefa/${tarefa.idTarefa}/`);
      alert("Tarefa excluída com sucesso!");
      atualizarTarefas();
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert("Não foi possível excluir a tarefa.");
    }
  }

  async function alterarStatus(e) {
    e.preventDefault();
    const novoStatus = e.target.status.value;

    const statusValido = ["feito", "fazendo", "aFazer"].includes(novoStatus);
    if (!statusValido) {
      alert("Status inválido selecionado.");
      return;
    }

    try {
      await axios.patch(`http://127.0.0.1:8000/tarefa/${tarefa.idTarefa}/`, {
        status: novoStatus,
      });
      alert("Status atualizado com sucesso!");
      atualizarTarefas();
    } catch (err) {
      console.error("Erro ao alterar status:", err);
      alert("Não foi possível alterar o status.");
    }
  }

  return (
    <article className="tarefa" aria-label={`Tarefa: ${tarefa.descricao}`}>
      <h3>{tarefa.descricao}</h3>
      <p>
        <strong>Setor:</strong> {tarefa.setor}
      </p>
      <p>
        <strong>Prioridade:</strong> {tarefa.prioridade}
      </p>

      <button
        onClick={excluirTarefa}
        aria-label={`Excluir tarefa ${tarefa.descricao}`}
      >
        Excluir
      </button>

      <form
        onSubmit={alterarStatus}
        style={{ marginTop: "0.5rem" }}
        aria-label="Alterar status da tarefa"
      >
        <label htmlFor={`status-${tarefa.idTarefa}`}>Status:</label>
        <select
          id={`status-${tarefa.idTarefa}`}
          name="status"
          defaultValue={tarefa.status}
          aria-label="Selecionar novo status"
        >
          <option value="aFazer">A Fazer</option>
          <option value="fazendo">Fazendo</option>
          <option value="feito">Feito</option>
        </select>

        <button type="submit" aria-label="Salvar novo status">
          Alterar Status
        </button>
      </form>
    </article>
  );
}

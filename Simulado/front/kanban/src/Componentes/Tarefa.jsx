import axios from "axios";

export function Tarefa({ tarefa, atualizarTarefas }) {
  async function excluirTarefa() {
    if (!window.confirm("Deseja realmente excluir esta tarefa?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/tarefa/${tarefa.idTarefa}/`);
      atualizarTarefas();
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert("Não foi possível excluir a tarefa.");
    }
  }

  async function alterarStatus(e) {
    e.preventDefault();
    const novoStatus = e.target.status.value;
    try {
      await axios.patch(`http://127.0.0.1:8000/tarefa/${tarefa.idTarefa}/`, {
        status: novoStatus,
      });
      atualizarTarefas();
    } catch (err) {
      console.error("Erro ao alterar status:", err);
      alert("Não foi possível alterar o status.");
    }
  }

  return (
    <article style={{ border: "1px solid #aaa", margin: "0.5rem 0", padding: "0.5rem", borderRadius: "5px" }}>
      <h3>{tarefa.descricao}</h3>
      <p><strong>Setor:</strong> {tarefa.setor}</p>
      <p><strong>Prioridade:</strong> {tarefa.prioridade}</p>

      <button onClick={excluirTarefa}>Excluir</button>

      <form onSubmit={alterarStatus} style={{ marginTop: "0.5rem" }}>
        <label>Status:</label>
        <select name="status" defaultValue={tarefa.status}>
          <option value="aFazer">A fazer</option>
          <option value="fazendo">Fazendo</option>
          <option value="feito">Feito</option>
        </select>
        <button type="submit">Alterar Status</button>
      </form>
    </article>
  );
}

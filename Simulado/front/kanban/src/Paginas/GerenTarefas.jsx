import { BrowserRouter } from "react-router-dom";
import { Quadro } from "../Componentes/Quadro";

export function GenTarefas() {
  return (
    <BrowserRouter>
      <div>
        <h1>Kanban de Tarefas</h1>
        <Quadro />
      </div>
    </BrowserRouter>
  );
}

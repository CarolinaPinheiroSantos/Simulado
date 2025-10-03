import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import axios from "axios";

const schemaCadTarefa = z.object({
  descricao: z.string().min(1, "Preencha a descrição"),
  setor: z.string().min(1, "Preencha o setor"),
  prioridade: z.enum(["baixa", "media", "alta"]),
  data: z.string().min(1, "Selecione uma data"),
  status: z.enum(["feito", "fazendo", "aFazer"]),
  usuario: z.number().min(1, "Selecione um usuário"),
});

export function CadTarefa() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/usuarios/");
        setUsuarios(res.data);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
        alert("Não foi possível carregar a lista de usuários.");
      }
    }
    fetchUsuarios();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schemaCadTarefa),
  });

  async function enviarTarefa(data) {
    try {
      await axios.post("http://127.0.0.1:8000/tarefa/", data);
      alert("Tarefa cadastrada com sucesso!");
      reset();
    } catch (error) {
      console.error("Erro ao cadastrar tarefa:", error.response?.data || error);
      alert("Houve um erro ao cadastrar a tarefa.");
    }
  }

  return (
    <form onSubmit={handleSubmit(enviarTarefa)} className="formulario">
      <h2>Cadastro de Tarefa</h2>

      <label>Descrição:</label>
      <textarea {...register("descricao")} />
      {errors.descricao && <p>{errors.descricao.message}</p>}

      <label>Setor:</label>
      <input type="text" {...register("setor")} />
      {errors.setor && <p>{errors.setor.message}</p>}

      <label>Prioridade:</label>
      <select {...register("prioridade")}>
        <option value="">Selecione</option>
        <option value="baixa">Baixa</option>
        <option value="media">Média</option>
        <option value="alta">Alta</option>
      </select>
      {errors.prioridade && <p>{errors.prioridade.message}</p>}

      <label>Data:</label>
      <input type="date" {...register("data")} />
      {errors.data && <p>{errors.data.message}</p>}

      <label>Status:</label>
      <select {...register("status")}>
        <option value="">Selecione</option>
        <option value="feito">Feito</option>
        <option value="fazendo">Fazendo</option>
        <option value="aFazer">A Fazer</option>
      </select>
      {errors.status && <p>{errors.status.message}</p>}

      <label>Usuário:</label>
      <select {...register("usuario", { valueAsNumber: true })}>
        <option value="">Selecione</option>
        {(usuarios || []).map((u) => (
          <option key={u.idUsuario} value={u.idUsuario}>
            {u.nome}
          </option>
        ))}
      </select>
      {errors.usuario && <p>{errors.usuario.message}</p>}

      <button type="submit">Cadastrar Tarefa</button>
    </form>
  );
}

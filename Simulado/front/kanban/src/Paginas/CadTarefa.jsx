import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import axios from "axios";

const schemaCadTarefa = z.object({
  descricao: z
    .string()
    .trim()
    .min(3, "A descrição deve ter pelo menos 3 caracteres")
    .max(200, "Máximo de 200 caracteres")
    .refine((val) => /[a-zA-Z]/.test(val), "A descrição deve conter letras"),
  setor: z
    .string()
    .trim()
    .min(2, "O setor deve ter pelo menos 2 caracteres")
    .max(50, "Máximo de 50 caracteres")
    .refine((val) => /[a-zA-Z]/.test(val), "O setor deve conter letras"),
  prioridade: z.enum(["baixa", "media", "alta"], {
    errorMap: () => ({ message: "Selecione uma prioridade" }),
  }),
  data: z.string().min(1, "Selecione uma data"),
  status: z.enum(["feito", "fazendo", "aFazer"], {
    errorMap: () => ({ message: "Selecione um status" }),
  }),
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
      const tarefaLimpa = {
        ...data,
        descricao: data.descricao.trim(),
        setor: data.setor.trim(),
      };
      await axios.post("http://127.0.0.1:8000/tarefa/", tarefaLimpa);
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

      <label htmlFor="descricao">Descrição:</label>
      <textarea
        id="descricao"
        aria-invalid={!!errors.descricao}
        aria-label="Descrição da tarefa"
        placeholder="Digite descrição da tarefa..."
        {...register("descricao")}
      />
      {errors.descricao && <p>{errors.descricao.message}</p>}

      <label htmlFor="setor">Setor:</label>
      <input
        id="setor"
        type="text"
        aria-invalid={!!errors.setor}
        aria-label="Setor responsável pela tarefa"
        placeholder="Ex: DS, Compras, automotivo..."
        {...register("setor")}
      />
      {errors.setor && <p>{errors.setor.message}</p>}

      <label>Prioridade:</label>
      <select {...register("prioridade")} aria-label="Nível de prioridade">
        <option value="">Selecione a prioridade</option>
        <option value="baixa">Baixa</option>
        <option value="media">Média</option>
        <option value="alta">Alta</option>
      </select>
      {errors.prioridade && <p>{errors.prioridade.message}</p>}

      <label>Data:</label>
      <input
        type="date"
        aria-label="Data de conclusão"
        {...register("data")}
      />
      {errors.data && <p>{errors.data.message}</p>}

      <label>Status:</label>
      <select {...register("status")} aria-label="Status da tarefa">
        <option value="">Selecione o status</option>
        <option value="feito">Feito</option>
        <option value="fazendo">Fazendo</option>
        <option value="aFazer">A Fazer</option>
      </select>
      {errors.status && <p>{errors.status.message}</p>}

      <label>Usuário:</label>
      <select {...register("usuario", { valueAsNumber: true })} aria-label="Usuário responsável">
        <option value="">Selecione o usuário</option>
        {usuarios.map((u) => (
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

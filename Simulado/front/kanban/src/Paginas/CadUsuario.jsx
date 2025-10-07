import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const schemaCadUsuario = z.object({
  nome: z
    .string()
    .trim()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(30, "O campo permite até 30 caracteres")
    .refine((val) => /[a-zA-ZÀ-ÿ]/.test(val), "O nome deve conter letras"),
  email: z
    .string()
    .trim()
    .min(1, "Preencha o campo email, por favor")
    .max(50, "O campo permite até 50 caracteres")
    .email("Insira um email válido"),
});

export function CadUsuario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schemaCadUsuario) });

  async function obterDados(data) {
    const usuarioLimpo = {
      nome: data.nome.trim(),
      email: data.email.trim(),
    };

    try {
      await axios.post("http://127.0.0.1:8000/usuarios/", usuarioLimpo);
      alert("Usuário cadastrado com sucesso!!");
      reset();
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      if (error.response?.status === 400) {
        alert("Este e-mail já está cadastrado. Tente outro.");
      } else {
        alert("Houve um erro durante o cadastro.");
      }
    }
  }

  return (
    <form className="formulario" onSubmit={handleSubmit(obterDados)}>
      <h2>Cadastro de Usuário</h2>

      <label htmlFor="nome">Nome:</label>
      <input
        id="nome"
        type="text"
        placeholder="Ex: José da Silva"
        aria-label="Nome completo do usuário"
        aria-invalid={!!errors.nome}
        {...register("nome")}
      />
      {errors.nome && <p>{errors.nome.message}</p>}

      <label htmlFor="email">E-mail:</label>
      <input
        id="email"
        type="email"
        placeholder="Ex: email@dominio.com.br"
        aria-label="Endereço de e-mail"
        aria-invalid={!!errors.email}
        {...register("email")}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">Cadastrar</button>
    </form>
  );
}

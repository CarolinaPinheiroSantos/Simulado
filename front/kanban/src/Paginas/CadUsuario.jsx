import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
 
const schemaCadUsuario = z.object({
    nome: z.string()
        .min(1,'Preencha o campo nome, por favor')
        .max(30, 'O campo permite até 30 caracteres'),
   
    email: z.string()
        .min(1, 'Preencha o campo email, por favor')
        .max(50, 'O campo permite até 50 caracteres')
        .email('Insira um email válido'),
    });
 
 
export function CadUsuario(){
    const {
    register,
    handleSubmit,
    formState: { errors }, 
    reset
} = useForm({ resolver: zodResolver(schemaCadUsuario) });
 
    async function obterDados(data) {
        console.log("dados inseridos", data)
 
 
        try{
            await axios.post('http://127.0.0.1:8000/usuarios/', data);
            alert("Usuário cadastrado com sucesso!!");
            reset();
 
        }catch(error){
            alert("Houve um erro durante o cadastro, qualquer problema chama o Paulo");
            console.error("Deu ruim hein", error)
        }
       
    }    
    return(
        <form className="formulario"onSubmit={handleSubmit(obterDados)}>
            <h2>Cadastro de Usuário</h2>
            <label>Nome:</label>
            <input type="text" placeholder="Jose da Silva" {...register('nome')}/>
            {errors.nome && <p>{errors.nome.message}</p>}
 
            <label>E-mail:</label>
            <input type='email' placeholder="email@dominio.com.br" {...register('email')}/>
            {errors.email && <p>{errors.email.message}</p>}
 
            <button type="submit">Cadastrar</button>
        </form>
    )
}
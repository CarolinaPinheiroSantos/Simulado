import {Routes, Route} from 'react-router-dom'
import { CadUsuario } from '../../Paginas/CadUsuario.jsx'
import { CadTarefa } from '../../Paginas/CadTarefa.jsx'
import { Quadro } from '../../Componentes/Quadro.jsx'
import { Inicial } from '../../Paginas/Inicial'
import { GenTarefas } from '../../Paginas/GerenTarefas.jsx'



export function Rotas(){
    return(
        <Routes>
            <Route path='/' element={<Inicial/>}>
                <Route index element={<Quadro/>}/>
                <Route path="cadUsuario/" element={<CadUsuario/>}/>
                <Route path="cadTarefa/" element={<CadTarefa/>}/>
                <Route path="genTarefas/" element={<GenTarefas/>}/>
            </Route>
            
        </Routes>
    )
}
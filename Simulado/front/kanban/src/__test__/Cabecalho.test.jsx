import "@testing-library/jest-dom";
import {render, screen} from '@testing-library/react';
import {Cabecalho} from '../Componentes/Cabecalho';
import {describe, expect} from 'vitest'

describe("Componente cabeçalho", () =>{
    it("renderizar o tiutlo", ), ()=>{
        render(<Cabecalho/>);
        expect(screen.getByText("Gerenciamento de tarefas")).toBeInTheDocument();
    }
})
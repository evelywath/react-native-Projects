import { createContext } from "react";

const contextoInicial = {
    lista: [],
    salvar: (obj) => {},
    editar: (obj) => {},
    apagar: (obj) => {}
}


const Contexto = createContext(contextoInicial);

export {Contexto};
import React from "react";
import listaVazia from "../assets/icones/listavazia.svg";

export const Listagem = () => {
  return (
    <div className="container-listagem">
      <img src={listaVazia} alt="Nenhuma tarefa encontrada" />
      <p>Você ainda não possui tarefas cadastradas!</p>
    </div>
  );
};

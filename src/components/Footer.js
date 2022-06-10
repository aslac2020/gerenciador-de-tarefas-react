import React from "react";
import btnadd from "../assets/icones/btnadd.svg";

export const Footer = () => {
  return (
    <div className="container-footer">
      <button>
        <img src={btnadd} alt="Adicionar tarefas" />
        Adicionar tarefa
      </button>
      <span>© Copyright {new Date().getFullYear()} Devaria. Todos os direitos reservados.</span>
    </div>
  );
};

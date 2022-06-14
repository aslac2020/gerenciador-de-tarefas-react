import React from "react";
import btnadd from "../assets/icones/btnadd.svg";

export const Footer = props => {

const { showModal } = props;

  return (
    <div className="container-footer">
      <button>
        <img src={btnadd} alt="Adicionar tarefas" onClick={showModal} />
        Adicionar tarefa
      </button>
      <span>© Copyright {new Date().getFullYear()} Devaria. Todos os direitos reservados.</span>
    </div>
  );
};

import React from "react";
import notCheck from "../assets/icones/not-check.svg";
import checked from "../assets/icones/checked.svg";

export const Item = (props) => {
  const { tarefa } = props;

  return (
    <div className="container-item">
      <img src={notCheck} alt="Selecionar Tarefa" />
      <div>
        <p>{tarefa?.name}</p>
        <span>Previsão de conclusão em: {tarefa.dataEstimatedTask}</span>
      </div>
    </div>
  );
};

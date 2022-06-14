import React from "react";
import notCheck from "../assets/icones/not-check.svg";
import checked from "../assets/icones/checked.svg";
const moment = require('moment');

export const Item = (props) => {
  const { tarefa, selectTask } = props;
  const {dataEstimatedTask, name, dataConclusionTask} = tarefa;

  const getDataText = (dtConclusionTask, dtEstimatedTask) => {
    if(dtConclusionTask){
        // eslint-disable-next-line no-undef
        return `Concluída em: ${moment(dtConclusionTask).format('DD/MM/yyyy')}`
    }else {
        // eslint-disable-next-line no-undef
        return `Previsão de conclusão em: ${moment(dtEstimatedTask).format('DD/MM/yyyy')}`
    }
  }

  return (
    <div className={"container-item " + (dataConclusionTask ? "" : "ativo")} onClick={() => dataConclusionTask ? null : selectTask(tarefa) }>
      <img 
      src={dataConclusionTask ? checked : notCheck} 
      alt={dataConclusionTask? "tarefa concluida" : "selecione a tarefa"} />
      <div>
        <p className={dataConclusionTask ? "concluida": ""}>{name}</p>
        <span>{getDataText(dataConclusionTask,dataEstimatedTask)}</span>
      </div>
    </div>
  );
};

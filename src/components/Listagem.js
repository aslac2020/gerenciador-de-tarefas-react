import React, {useState} from "react";
import listaVazia from "../assets/icones/listavazia.svg";
import { Item } from "./Item"
import { Modal } from "react-bootstrap";
import { executeRequisicao } from "../services/api";
const moment = require('moment');

export const Listagem = (props) => {
  const { tarefas, getTasksWithFilter } = props;
  
  const [ showModal, setShowModal ] = useState(false);

  const [erro, setErro] = useState("");
  const [idTask, setIdTask] = useState(null);
  const [nameTask, setNameTask] = useState("");
  const [dataEstimatedTask, setDataEstimatedTask] = useState("");
  const [dataConclusionTask, setDataConclusionTask] = useState("");

  const updateTask = async () => {
    try {

      const dateNow = new Date();
      const dateFormated = moment(dateNow).format('yyyy-MM-DD');

      if (!nameTask || !dataEstimatedTask) {
        setErro("Favor informar nome e data de previsão");
        return;
      }

      if(dataEstimatedTask < dateFormated) {
        setErro("Data prevista não pode ser menor que o mês atual");
        return
      }

      const body = {
        name: nameTask,
        dataEstimatedTask: dataEstimatedTask,
        dataConclusionTask: dataConclusionTask
      };
      await executeRequisicao("tasks/"+idTask, "PUT", body);
      await getTasksWithFilter();
      setNameTask("");
      setDataEstimatedTask("");
      setDataConclusionTask("");
      setIdTask("");
      setErro("");
      setShowModal(false);
    } catch (e) {
      console.error(e);
      if (e?.response?.data?.erro) {
        setErro(e.response.data.erro);
      } else {
        setErro(
          "Não foi possivel atualizar a tarefa, fale com o administrador"
        );
      }
    }
  };

  const deleteTask = async () => {
    try {

      if (!idTask) {
        setErro("Favor informar a tarefa a ser excluida");
        return;
      }

      await executeRequisicao('tasks/'+idTask, "delete");
      await getTasksWithFilter();
      setNameTask("");
      setDataEstimatedTask("");
      setDataConclusionTask("");
      setIdTask(null);
      setErro("");
      setShowModal(false);
    } catch (e) {
      console.error(e);
      if (e?.response?.data?.erro) {
        setErro(e.response.data.erro);
      } else {
        setErro(
          "Não foi possivel excluir a tarefa, fale com o administrador"
        );
      }
    }
  };

  const selectTask = task => {
      setIdTask(task.id);
      setNameTask(task.name);
      setDataEstimatedTask(moment(task.dataEstimatedTask).format('yyyy-MM-DD'));
      setDataConclusionTask(task.dataConclusionTask);
      setErro('');
      setShowModal(true);
  }

  return (
    <>
    <div className="container-listagem">
      {tarefas && tarefas.length > 0 ? 
        tarefas?.map(tarefa => <Item tarefa={tarefa} key={tarefa.id} selectTask={selectTask} />)       
       : 
        <>
          <img src={listaVazia} alt="Nenhuma tarefa encontrada" />
          <p>Você ainda não possui tarefas cadastradas!</p>
        </>
      }
    </div>
    <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="container-modal"
      >
        <Modal.Body>
          <p>Alterar uma tarefa</p>
          {erro && <p className="error">{erro}</p>}
          <input
            type="text"
            name="nome"
            placeholder="Nome da tarefa"
            className="col-12"
            value={nameTask}
            onChange={(event) => setNameTask(event.target.value)}
          />
          <input
            type="text"
            name="dateEstimated"
            placeholder="Data de previsão de conclusão"
            className="col-12"
            value={dataEstimatedTask}
            onChange={(event) => setDataEstimatedTask(event.target.value)}
            onFocus={(event) => (event.target.type = "date")}
            onBlur={(event) =>
              dataEstimatedTask
                ? (event.target.type = "date")
                : (event.target.type = "text")
            }
          />
          <input
            type="text"
            name="dateConcluded"
            placeholder="Data de conclusão"
            className="col-12"
            value={dataConclusionTask}
            onChange={(event) => setDataConclusionTask(event.target.value)}
            onFocus={(event) => (event.target.type = "date")}
            onBlur={(event) =>
              dataConclusionTask
                ? (event.target.type = "date")
                : (event.target.type = "text")
            }
          />
          <Modal.Footer>
            <div className="buttons col-12">
              <button onClick={updateTask}>Alterar</button>
              <span onClick={deleteTask}>Excluir Tarefa</span>
            </div>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Filters } from "../components/Filters";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Listagem } from "../components/Listagem";
import { executeRequisicao } from "../services/api";
const moment = require('moment');

export const Home = (props) => {
  const [tarefas, setTarefas] = useState([]);

  //STATE FILTROS
  const [periodoDe, setPeriodoDe] = useState("");
  const [periodoAte, setPeriodoAte] = useState("");
  const [status, setStatus] = useState(0);

  //STATE EXIBICÃO MODAL
  const [showModal, setShowModal] = useState(false);

  //STATES MODAL
  const [erro, setErro] = useState("");
  const [nameTask, setNameTask] = useState("");
  const [dateEstimatedTask, setDateEstimatedTask] = useState("");

  const getTasksWithFilter = async () => {
    try {
      let filters = "?status=" + status;

      if (periodoDe) {
        filters += "&periodoDe=" + periodoDe;
      }

      if (periodoAte) {
        filters += "&periodoAte=" + periodoAte;
      }

      const result = await executeRequisicao("tasks" + filters, "GET");
      if (result && result.data) {
        setTarefas(result.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const saveTask = async () => {
    try {

      const dateNow = new Date();
      const dateFormated = moment(dateNow).format('yyyy-MM-DD');

      if (!nameTask || !dateEstimatedTask) {
        setErro("Favor informar nome e data de previsão");
        return;
      }

      if(dateEstimatedTask < dateFormated) {
        setErro("Data prevista não pode ser menor que o mês atual");
        return
      }

      const body = {
        name: nameTask,
        dataEstimatedTask: dateEstimatedTask,
      };
      await executeRequisicao("tasks", "POST", body);
      await getTasksWithFilter();
      setNameTask("");
      setDateEstimatedTask("");
      setShowModal(false);
    } catch (e) {
      console.error(e);
      if (e?.response?.data?.erro) {
        setErro(e.response.data.erro);
      } else {
        setErro(
          "Não foi possivel cadastrar a tarefa, fale com o administrador"
        );
      }
    }
  };

  useEffect(() => {
    getTasksWithFilter();
  }, [status, periodoDe, periodoAte]);

  const closeApp = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("usuarioNome");
    localStorage.removeItem("usuarioEmail");
    props.setAccessToken("");
  };

  return (
    <>
      <Header closeApp={closeApp} 
      showModal={() => setShowModal(true)} />
      <Filters
        periodoDe={periodoDe}
        periodoAte={periodoAte}
        status={status}
        setPeriodoDe={setPeriodoDe}
        setPeriodoAte={setPeriodoAte}
        setStatus={setStatus}
      />
      <Listagem tarefas={tarefas} getTasksWithFilter={getTasksWithFilter}/>
      <Footer showModal={() => setShowModal(true)} />
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="container-modal"
      >
        <Modal.Body>
          <p>Adicionar uma tarefa</p>
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
            value={dateEstimatedTask}
            onChange={(event) => setDateEstimatedTask(event.target.value)}
            onFocus={(event) => (event.target.type = "date")}
            onBlur={(event) =>
              dateEstimatedTask
                ? (event.target.type = "date")
                : (event.target.type = "text")
            }
          />
          <Modal.Footer>
            <div className="buttons col-12">
              <button onClick={saveTask}>Salvar</button>
              <span
                onClick={() => {
                  setShowModal(false);
                  setNameTask("");
                  setErro("");
                  setDateEstimatedTask("");
                }}
              >
                Cancelar
              </span>
            </div>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

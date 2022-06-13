import React, {useState} from "react";
import { Filters } from "../components/Filters";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Listagem } from "../components/Listagem";

export const Home = (props) => {

  const [tarefas, setTarefas] = useState([
    {
        id: '12121121',
        name: 'Tarefa Mock 1',
        dataEstimatedTask: '2022-07-03',
        dataConclusionTask: null,
    },
    {
      id: '1asasasa',
      name: 'Tarefa Mock 2',
      dataEstimatedTask: '2022-07-01',
      dataConclusionTask: '2022-06-30',
    }
  ])

  const closeApp = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("usuarioNome");
    localStorage.removeItem("usuarioEmail");
    props.setAccessToken("");
  };

  return (
    <>
      <Header closeApp={closeApp} />
      <Filters/>
      <Listagem tarefas={tarefas} />
      <Footer />
    </>
  );
};

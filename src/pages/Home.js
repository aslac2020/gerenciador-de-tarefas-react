import React, {useEffect, useState} from "react";
import { Filters } from "../components/Filters";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Listagem } from "../components/Listagem";
import { executeRequisicao } from '../services/api'

export const Home = (props) => {

  const [tarefas, setTarefas] = useState([]);
  const [periodoDe, setPeriodoDe] = useState('');
  const [periodoAte, setPeriodoAte] = useState('');
  const [status, setStatus] = useState(0);

  const getTasksWithFilter = async () => {
    try {

      let filters = '?status='+status;

      if(periodoDe){
        filters+= '&periodoDe='+periodoDe;
      }

      if(periodoAte){
        filters+= '&periodoAte='+periodoAte;
      }
   
      const result = await executeRequisicao('tasks'+filters, 'GET');
      if(result && result.data){
        setTarefas(result.data)
      }
      
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getTasksWithFilter()
  }, [status, periodoDe, periodoAte])

  const closeApp = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("usuarioNome");
    localStorage.removeItem("usuarioEmail");
    props.setAccessToken("");
  };

  return (
    <>
      <Header closeApp={closeApp} />
      <Filters
      periodoDe={periodoDe}
      periodoAte={periodoAte}
      status={status}
      setPeriodoDe={setPeriodoDe}
      setPeriodoAte={setPeriodoAte}
      setStatus={setStatus}
      />
      <Listagem tarefas={tarefas} />
      <Footer />
    </>
  );
};

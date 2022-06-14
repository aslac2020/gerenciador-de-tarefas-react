import React, { useState } from "react";
import filtro from "../assets/icones/filtro.svg";

export const Filters = props => {

  const { periodoDe, periodoAte, status, setPeriodoDe,  setPeriodoAte, setStatus } = props

  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="container-filters">
      <div className="title">
        <span>Tarefas</span>
        <img src={filtro} alt="Filtrar Tarefas" onClick={()=> setShowFilters(!showFilters)} />
        <div className="form">
          <div>
            <label>Data prevista de conclusão de:</label>
            <input type="date" value={periodoDe} onChange={event => setPeriodoDe(event.target.value)} />
          </div>
          <div>
            <label>até:</label>
            <input type="date" value={periodoAte} onChange={event => setPeriodoAte(event.target.value)}/>
          </div>
          <div>
            <label>Status:</label>
            <select
            value={status} onChange={event => setStatus(event.target.value)}
            >
              <option value={0}>Todas</option>
              <option value={1}>Ativas</option>
              <option value={2}>Concluidas</option>
            </select>
          </div>
        </div>
      </div>
      {showFilters === true && (
        <div className="filtersMobile">
          <div>
            <label>Período de:</label>
            <input type="date"  value={periodoDe} onChange={event => setPeriodoDe(event.target.value)} />
          </div>
          <div>
            <label>Período até:</label>
            <input type="date" value={periodoAte} onChange={event => setPeriodoAte(event.target.value)} />
          </div>
          <div>
            <label>Status:</label>
            <select value={status} onChange={event => setStatus(event.target.value)} >
              <option value={0}>Todas</option>
              <option value={1}>Ativas</option>
              <option value={2}>Concluidas</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

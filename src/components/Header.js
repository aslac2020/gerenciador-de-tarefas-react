import React from "react";
import logo from "../assets/icones/devaria-logo.svg";
import exit from "../assets/icones/exit.svg";
import exitDesktop from "../assets/icones/exitdesktop.svg";

export const Header = (props) => {
  const nameUser = localStorage.getItem("usuarioNome");
  const firstName = nameUser?.split(" ")[0] || "";

  return (
    <div className="container-header">
      <img className="logo" src={logo} alt="Logo Devaria" />
      <button><span>+</span>Adicionar tarefa</button>
      <div className="mobile">
        <span>Olá, {firstName}</span>
        <img className="iconeSair" src={exit} alt="Icone de Sair do App" onClick={props.closeApp} />
      </div>
      <div className="desktop">
        <span>Olá, {firstName}</span>
        <img className="iconeSair" src={exitDesktop} alt="Icone de Sair do App" onClick={props.closeApp} />
      </div>
    </div>
  );
};

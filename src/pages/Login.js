import React, { useState } from "react";
import logo from "../assets/icones/devaria-logo.svg";
import mail from "../assets/icones/mail.svg";
import lock from "../assets/icones/lock.svg";
import { Input } from "../components/Input";

export const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const executeLogin = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("login", login);
    console.log("password", password);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="container-login">
      <img className="logo" src={logo} alt="Logo Devaria" />
      <form>
        <Input
          srcImg={mail}
          altImg="Icone email"
          inputType="text"
          inputName="login"
          inputPlaceholder="Informe seu email"
          value={login}
          setValue={setLogin}
        />

        <Input
          srcImg={lock}
          altImg="Icone senha"
          inputType="password"
          inputName="senha"
          inputPlaceholder="Informe sua senha"
          value={password}
          setValue={setPassword}
        />
        <button onClick={executeLogin} disabled={isLoading}>
          {isLoading === true ? "...carregando" : "Entrar"}
        </button>
      </form>
    </div>
  );
};

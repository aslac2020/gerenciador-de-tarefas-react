import React, { useState } from "react";
import logo from "../assets/icones/devaria-logo.svg";
import mail from "../assets/icones/mail.svg";
import lock from "../assets/icones/lock.svg";
import { Input } from "../components/Input";
import { executeRequisicao } from "../services/api";

export const Login = props => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [msgErro, setMsgErro] = useState("");
  const [isLoading, setLoading] = useState(false);

  const executeLogin = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      setMsgErro('');

      const body = {
        login,
        password,
      };

      const result = await executeRequisicao("login", "POST", body);
      if(result?.data?.token){
        localStorage.setItem('accessToken', result.data.token);
        localStorage.setItem('usuarioNome', result.data.name);
        localStorage.setItem('usuarioEmail', result.data.email);
        props.setAccessToken(result.data.token)
      }

    } catch (e) {
      if(e?.response?.data?.erro){
        setMsgErro(e.response.data.erro);
      }else {
        setMsgErro('Não foi possivel efetuar o login, fale com o administrador')
      }
    }
    setLoading(false);
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
        {msgErro && <p>{msgErro}</p>}
        <button onClick={executeLogin} disabled={isLoading}>
          {isLoading === true ? "...carregando" : "Entrar"}
        </button>
      </form>
    </div>
  );
};

import React from "react";
import { Filters } from "../components/Filters";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Listagem } from "../components/Listagem";

export const Home = (props) => {

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
      <Listagem />
      <Footer />
    </>
  );
};

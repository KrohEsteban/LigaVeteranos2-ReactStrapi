import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css' ;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Home from "./Pages/Home.js";
import Fechas from "./Pages/Fechas.js";
import Tablas from "./Pages/Tablas.js";
import Goleadores from "./Pages/Goleadores.js";
import Menu from "./Components/Menu.js";
import Sanciones from "./Pages/Sanciones.js";
import FooterEsteban from "./Components/FooterEsteban/FooterEsteban.js";
import Container from 'react-bootstrap/Container';


const client = new ApolloClient({
  uri: "http://localhost:1337/graphql/",
  cache: new InMemoryCache()
});


function App() {
  return (
    <BrowserRouter> 
      <ApolloProvider  client={client}>
        <Menu/>
        <Container fluid>
        <Routes>

          
          <Route path="/Fechas" element={<Fechas/>} />
          <Route path="/TablasDePuntuaciones" element={<Tablas/>} />
          <Route path="/Goleadores" element={<Goleadores/>} />
          <Route path="/Suspendidos" element={<Sanciones/>} />
          <Route path ="/" element={<Home/>} /> 
          <Route path="*" element={<h1>Error 404</h1> } />
  
        </Routes>
        </Container>
        <FooterEsteban/>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;

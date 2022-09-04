import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function Menu() {

    return (
        <>
          <Navbar  collapseOnSelect expand="lg" className="fondonav" variant="dark">
            <Container>
                <Navbar.Brand href="/">Liga de Veteranos</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav  >
                        <Nav.Link href="/Fechas">Fechas</Nav.Link>
                        <Nav.Link href="/TablasDePuntuaciones">Puntuaciones</Nav.Link>
                        <Nav.Link href="/Goleadores">Goleadores</Nav.Link>
                        <Nav.Link href="/Suspendidos">Suspendidos</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
          </Navbar>
         
        </>
    )};

    
    

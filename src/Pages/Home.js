import React from "react";
import { Container, Image } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ImagenLigaDeVeteranos from '../Imagenes/ImagenLigaDeVeteranos.jpg'




export default function Home() {

    return (
        <>
        
    
        <Container>
            <Col>
                <Row className="d-flex align-items-center justify-content-center mb-5 mt-1">
                     <Image className="imagenmax" src={ImagenLigaDeVeteranos} alt="Imagen de la liga de veteranos de La Pampa" />
                </Row>
                <Row xs="12" className="text-center"><h1>Liga de Veteranos</h1></Row>
                <Row className="text-center mb-5"><h2>La Pampa</h2></Row>
                <Row className="text-center">
                <p class="text-center">La Liga de veteranos es una asociación creada para la organización de torneos de fútbol amateur con el objetivo de generar esparcimiento y salud.</p>
                <p class="text-center">Actualmente la Liga de Veteranos, compuesta aproximadamente por 1200 personas, entrena en el Complejo Horacio del Campo de Toay.</p>
                <p class="text-center fw-semibold">"Los clubes trabajan para que los chicos no estén en la calle, y nosotros trabajamos para que los adultos no vayamos a parar a un hospital."</p>
                <p><a class="linkfacebook" href="https://www.facebook.com/Liga-de-veteranos-de-f%C3%BAtbol-de-Santa-Rosa-La-Pampa-103912491579484/">Encontranos en Facebook: Liga de veteranos de fútbol de Santa Rosa La Pampa.</a></p>
                </Row>
            </Col>
           
                
            
            

            
            

        </Container>


        </>
    )};
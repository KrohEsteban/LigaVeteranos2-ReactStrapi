import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { CATEGORIA, PARTIDOS } from "../Components/DataServer";
import { Waypoint } from 'react-waypoint';
import { useQuery } from "@apollo/client";
import { ButtonGroup, ButtonToolbar } from "react-bootstrap";



export default function Fechas() {

    const { data, loading, error, fetchMore } = useQuery(PARTIDOS);

    const { data: datacategoria, loading: loadingcategoria, error: errorcategoria } = useQuery(CATEGORIA);

    const [categoriaactual, setCategoriaactual] = useState("Todos");
    const [fechaactual, setFechaactual] = useState("Todas");

    //contador para ver si no encuentra ningun partido dentro del arreglo con la categoria que eligio
    let haypartidos=0; 

    
    //sige la app cuando el dato regrese y sin error
    if ((loading)||(loadingcategoria)){
        return "Loading...";
    }else if((error)||(errorcategoria)){
        return (
            <>
                <p>{error.message}</p><p>{errorcategoria.message}</p>
            </>
        
        )
    }else{   
        
        
    // recolectamos las fechas para mostrar 
    let fech= new Set(); // si se repite no lo agrega al arreglo
    data.partidos.data.forEach((item)=>{
        fech.add(item.attributes.Fecha)
    })
    const fechas=[...fech]; // asignamos el set a un arreglo para poder mapear

    // ordena el arreglo
    fechas.sort(function(a, b) {
        return a - b;
      });

    function ajustarcategoria(nuevacategoria){

        
        if(nuevacategoria==="Todos"){
            setCategoriaactual("Todos");
        }else{
        
            setCategoriaactual(nuevacategoria);
        }
        
        
    }

    function ajustarfecha(nuevafecha){

        
        if(nuevafecha==="Todas"){
            setFechaactual("Todas");
        }else{
        
            setFechaactual(nuevafecha);
        }
        
        
    }
    
    
    
    return (
        <div className="mb-5">

        <div className="p-5">
            <h1 className="text-center">Proximas Fechas</h1>
        </div>
        
        <Container>
            <Row>
                <Col xs="12" lg="auto" className=" d-flex align-items-center justify-content-center"><h2>Filtar por categoría:</h2></Col>
                <Col className="d-flex align-items-center justify-content-center">
                <ButtonToolbar size="lg" className="mb-2">
                    <ButtonGroup size="lg" className="buttonfecha">
                        <Button className="text-nowrap boton" onClick={()=>ajustarcategoria("Todos")} >Mostrar todos</Button>
               
                        {datacategoria.categorias.data.map((item)=>{

                            return(
                                
                                <Button className="boton" key={item.id} onClick={()=>ajustarcategoria(item.attributes.Nombre)} >{item.attributes.Nombre}</Button> 
                                
                            )
                        })}
                        </ButtonGroup>
                    </ButtonToolbar>
                </Col>
                
                
                
            </Row>
            
        

        
        </Container>

        <Container>
            <Row>
                <Col xs="12" lg="auto" className=" d-flex align-items-center justify-content-center"><h2>Filtar por fecha:</h2></Col>
                <Col className="d-flex align-items-center justify-content-center">
                <ButtonToolbar size="lg" className="mb-2">
                    <ButtonGroup size="lg" className="buttonfecha">
                        <Button className="text-nowrap boton" onClick={()=>ajustarfecha("Todas")} >Mostrar todos</Button>
               
                        {fechas.map((item)=>{

                            return(
                                
                                <Button className="boton" key={item} onClick={()=>ajustarfecha(item)} >{item}</Button> 
                                
                            )
                        })}
                        </ButtonGroup>
                    </ButtonToolbar>
                </Col>
                
                
                
            </Row>
            
        

        
        </Container>
        
             
        {data.partidos.data.map((item,i)=>{
            let hayfecha;
            let hayhora;
            let dia;
            let mes;
            let anio;
            let hora;
            
            if (item.attributes.Dia === null){
                hayfecha = false;
            }else{
                hayfecha=true;
                dia =item.attributes.Dia.slice(8, 10);
                mes =item.attributes.Dia.slice(5, 7);
                anio =item.attributes.Dia.slice(2, 4);
               
            }
            
            if (item.attributes.Hora=== null){
                hayhora= false;
            }else{
                hayhora=true;
                 hora = item.attributes.Hora.slice(0, 5);
            }
            
            
            if(((item.attributes.categoria.data.attributes.Nombre===categoriaactual)||(categoriaactual==="Todos"))&&((item.attributes.Fecha===fechaactual)||(fechaactual==="Todas"))){
            
            
                if ((item.attributes.Equipo1.Resultado===null)&&(item.attributes.Equipo1.Resultado===null)){
                
                return(
                    
                    <Container key={item.id} className="card cardbordertop p-3 mt-5 largletra">
                    
                    

                    <Row >
                        <Col xs="12" className="text-center"> <h5 >Fecha {item.attributes.Fecha}</h5> <h5>{hayfecha? dia +"/"+mes+"/"+anio : "Día a confirmar"} - {hayhora? hora: "Hora a confirmar"}</h5></Col>
                        <Col xs="12" className="d-flex align-items-center justify-content-center"> <h5>Cancha: {(item.attributes.Cancha===null)? "A Confirmar" : item.attributes.Cancha}</h5></Col>
                        <Col xs="12" className="d-flex align-items-center justify-content-center"> <h5>Categoría: {item.attributes.categoria.data.attributes.Nombre}</h5></Col>
                        <Col xs="12" className="bordebottom"></Col>
                    </Row> 
                    <Row >  
                        
                        <Col xs="12" sm="5" className=" d-flex align-items-center justify-content-center"><h5>{item.attributes.Equipo1.equipo.data.attributes.Nombre}</h5> </Col>
                        <Col xs="12" sm="2" className=" d-flex align-items-center justify-content-center"><h3> VS </h3></Col>
                        <Col xs="12" sm="5" className=" d-flex align-items-center justify-content-center"><h5>{item.attributes.Equipo2.equipo.data.attributes.Nombre}</h5></Col>
                        
                    
                    </Row>
                    
                    </Container>
                  
                ) 


                }else{

                    return(
                        
                        <Container key={item.id} className="card cardbordertop p-3 mt-5 largletra">
                        
                       
                    
                        <Row >
                            <Col xs="12" className="text-center"> <h5 >Fecha {item.attributes.Fecha}</h5> <h5>{hayfecha? dia +"/"+mes+"/"+anio : "Día a confirmar"} - {hayhora? hora: "Hora a confirmar"}</h5></Col>
                            <Col xs="12"  className="d-flex align-items-center justify-content-center"> <h5>Cancha: {item.attributes.Cancha}</h5></Col>
                            <Col xs="12" className="d-flex align-items-center justify-content-center"> <h5>Categoría: {item.attributes.categoria.data.attributes.Nombre}</h5></Col>
                            <Col xs="12" className="bordebottom"></Col>
                        </Row> 
                        <Row >  
                            
                            <Col xs="12" sm={{span: 3, order: 1}} className=" d-flex align-items-center justify-content-center"><h5>{item.attributes.Equipo1.equipo.data.attributes.Nombre}</h5></Col> 
                            <Col xs="12" sm={{span: 1, order:'first'}} className=" d-flex align-items-center justify-content-center"><h5>{item.attributes.Equipo1.Resultado}</h5></Col>
                            <Col xs="4" sm={{span: 1, order: 7}} className=" d-flex align-items-center justify-content-center"><h5>-</h5></Col>
                            <Col xs="4" sm={{span: 2, order: 2}} className=" d-flex align-items-center justify-content-center"><h3> VS </h3></Col>
                            <Col xs="4" sm={{span: 1, order: 4}} className=" d-flex align-items-center justify-content-center"><h5>-</h5></Col>
                            <Col xs="12" sm={{span: 1, order: 5}} className=" d-flex align-items-center justify-content-center"><h5>{item.attributes.Equipo2.Resultado}</h5></Col>
                            <Col xs="12" sm={{span: 3, order: 3}} className=" d-flex align-items-center justify-content-center"><h5>{item.attributes.Equipo2.equipo.data.attributes.Nombre}</h5></Col>
                            
                        
                        </Row>
                        
                        </Container>
                
                    ) 

                }
            
            }else{
                //sumamos si no hay partidos para mostrar
                haypartidos++;
                return 
            }
            
          
            
        })}

        {/*muestra el cartel si el contador es igual al largo del arreglo*/}
            
        {haypartidos===data.partidos.data.length &&
        
        <h5 className="text-center p-5">No hay partidos en esta categoría</h5>

        }    

        
        
      
        </div>
    )}
};
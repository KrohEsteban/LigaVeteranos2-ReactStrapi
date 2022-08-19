import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { CATEGORIA, PARTIDOS } from "../Components/DataServer";
import { Waypoint } from 'react-waypoint';
import { useQuery } from "@apollo/client";



export default function Fechas() {

    const { data, loading, error, fetchMore } = useQuery(PARTIDOS,{
        variables: { start: 0 },
      });

    const { data: datacategoria, loading: loadingcategoria, error: errorcategoria } = useQuery(CATEGORIA);

    const [categoriaactual, setCategoriaactual] = useState("Todos");

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


    function ajustar(nuevacategoria){

        
        if(nuevacategoria==="Todos"){
            setCategoriaactual("Todos");
        }else{
        
            setCategoriaactual(nuevacategoria);
        }
        
        
    }
    
    
    
    return (
        <div className="mb-5">

        <div className="p-5">
            <h1 className="text-center">Proximas Fechas</h1>
        </div>
        
        <Container>
            <Row>
                <Col xs="12" lg="auto" className="pb-4"><h2>Filtar por categoría:</h2></Col>
                
                <Col className="d-flex align-items-center justify-content-center">
                    <Button variant="success" className="text-nowrap" onClick={()=>ajustar("Todos")} >Mostrar todos</Button> {' '}
                </Col>
                {datacategoria.categorias.data.map((item)=>{

                    return(
                        <Col key={item.id} className="d-flex align-items-center justify-content-center">
                            <Button variant="success" className="m-1" onClick={()=>ajustar(item.attributes.Nombre)} >{item.attributes.Nombre}</Button> {' '}
                        </Col>
                        
                    )
                })}

               
                
                
            </Row>
            
        

        
        </Container>
        
             
        {data.partidos.data.map((item,i)=>{

            let dia =item.attributes.Dia.slice(8, 10);
            let mes =item.attributes.Dia.slice(5, 7);
            let anio =item.attributes.Dia.slice(2, 4);
            let hora = item.attributes.Hora.slice(0, 5);
            
            
            if((item.attributes.categoria.data.attributes.Nombre===categoriaactual)||(categoriaactual==="Todos")){
            
            
                if ((item.attributes.Equipo1.Resultado===null)&&(item.attributes.Equipo1.Resultado===null)){
                
                return(
                    
                    <Container key={item.id} className="card cardbordertop p-3 mt-5 largletra">
                    
                    {(data.partidos.data.length-1) === i &&
                        <Waypoint onEnter={
                            ()=> {
                            
                                fetchMore({
                                    variables:{start:data.partidos.data.length},
                                    updateQuery:(prevResult, {fetchMoreResult} )=>{
                               
                                        fetchMoreResult.partidos.data= [...prevResult.partidos.data, ...fetchMoreResult.partidos.data];
                                        return fetchMoreResult;
                                    }
                                })
                            }
                        }/>
                       
                    }

                    <Row >
                        <Col xs="12" className="text-center"> <h5 >Fecha {item.attributes.Fecha}</h5> <h5>{dia}/{mes}/{anio} - {hora}</h5></Col>
                        <Col xs="12" className="d-flex align-items-center justify-content-center"> <h5>Cancha: {item.attributes.Cancha}</h5></Col>
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
                        
                        {(data.partidos.data.length-1) === i &&
                            <Waypoint onEnter={
                                ()=> {
                                
                                    fetchMore({
                                        variables:{start:data.partidos.data.length},
                                        updateQuery:(prevResult, {fetchMoreResult} )=>{
                                    
                                            fetchMoreResult.partidos.data= [...prevResult.partidos.data, ...fetchMoreResult.partidos.data];
                                            return fetchMoreResult;
                                        }
                                    })
                                }
                            }/>
                        
                        }
                    
                        <Row >
                            <Col xs="12" className="text-center"> <h5 >Fecha {item.attributes.Fecha}</h5> <h5>{dia}/{mes}/{anio} - {hora}</h5></Col>
                            <Col xs="12"  className="d-flex align-items-center justify-content-center"> <h5>Cancha: {item.attributes.Cancha}</h5></Col>
                            <Col xs="12" className="d-flex align-items-center justify-content-center"> <h5>Categoría: {item.attributes.categoria.data.attributes.Nombre}</h5></Col>
                            <Col xs="12" className="bordebottom"></Col>
                        </Row> 
                        <Row >  
                            
                            <Col xs="5" sm={{span: 3, order: 1}} className=" d-flex align-items-center justify-content-center"><h5>{item.attributes.Equipo1.equipo.data.attributes.Nombre}</h5></Col>
                            <Col xs="2" sm={{span: 1, order: 7}} className=" d-flex align-items-center justify-content-center"><h5>-</h5></Col>
                            <Col xs="5" sm={{span: 1, order:'first'}} className=" d-flex align-items-center justify-content-center"><h5>{5 + item.attributes.Equipo1.Resultado}</h5></Col>
                        
                            <Col xs="12" sm={{span: 2, order: 2}} className=" d-flex align-items-center justify-content-center"><h3> VS </h3></Col>
                            <Col xs="5" sm={{span: 3, order: 3}} className=" d-flex align-items-center justify-content-center"><h5>{item.attributes.Equipo2.equipo.data.attributes.Nombre}</h5></Col>
                            <Col xs="2" sm={{span: 1, order: 4}} className=" d-flex align-items-center justify-content-center"><h5>-</h5></Col>
                            <Col xs="5" sm={{span: 1, order: 5}} className=" d-flex align-items-center justify-content-center"><h5>{item.attributes.Equipo2.Resultado}</h5></Col>
                        
                        </Row>
                        
                        </Container>
                
                    ) 

                }
            
            }else{
                //sumamos si no hay partidos para mostrar
                haypartidos++;
                return (
                
                        <React.Fragment key={item.id}>
                
                        {(data.partidos.data.length-1) === i &&
                            <Waypoint  onEnter={
                                ()=> {
                                
                                    fetchMore({
                                        variables:{start:data.partidos.data.length},
                                        updateQuery:(prevResult, {fetchMoreResult} )=>{
                                            fetchMoreResult.partidos.data= [...prevResult.partidos.data, ...fetchMoreResult.partidos.data];
                                            return fetchMoreResult;
                                        }
                                    })
                                }
                            }/>
                        
                        }
                    </React.Fragment>
                );
            }
            
          
            
        })}

        {/*muestra el cartel si el contador es igual al largo del arreglo*/}
            
        {haypartidos===data.partidos.data.length &&
        
        <h5 className="text-center p-5">No hay partidos en esta categoría</h5>

        }    

        
        
      
        </div>
    )}
};
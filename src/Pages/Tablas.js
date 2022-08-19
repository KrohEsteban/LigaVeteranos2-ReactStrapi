import React from "react";
import Table from 'react-bootstrap/Table';
import { useQuery, gql } from "@apollo/client";
import { Container } from "react-bootstrap";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';



export default function Tablas() {
    
    // pedimos datos del servidor
    const EQUIPO = gql`
    query {
        equipos {
            data {
                id,
                attributes{
                    Nombre,
                    Puntos,
                    PartidosJugados,
                    PartidosGanados,
                    PartidosEmpatados,
                    PartidosPerdidos,
                    GolesAFavor,
                    GolesEnContra,
                    DiferenciaDeGoles,
                    categoria{
                        data{
                            attributes{
                                Nombre
                            }
                        }
                    }
                    
                }       
            
            }
        }
    }
    `;

    const { data, loading, error } = useQuery(EQUIPO);
    

    //sige la app cuando el dato regrese y sin error
    if (loading) return "Loading...";
    if (error) return <p>{error.message}</p>
      

    // recolectamos las categorias para mostrar varios cuadros
    let cat= new Set(); // si se repite no lo agrega al arreglo
    data.equipos.data.forEach((item)=>{
        cat.add(item.attributes.categoria.data.attributes.Nombre)
    })
    const categorias=[...cat]; // asignamos el set a un arreglo para poder mapear

    

    //funcion para mostrar los datos en tabla y ordenados

    function tabla(categoria){

        let puntos=[];
        let cont=0;

        
        //ordena y guarda en goleadores solo a los que tienen goles
        data.equipos.data.forEach((item) => {
        
            if((item.attributes.categoria.data.attributes.Nombre === categoria)){
                
                    puntos[cont]=item;
                    
                }
        
                cont=cont+1;
            })

        
    
        // recorre la matriz para mostrar los goleadores
    
        return( puntos.map((item)=>{
            
            return(
                <tr key={item.id}>
                    <td>{item.attributes.Nombre}</td>
                    <td>{item.attributes.Puntos}</td>
                    <td>{item.attributes.PartidosJugados}</td>
                    <td>{item.attributes.PartidosGanados}</td>                    
                    <td>{item.attributes.PartidosEmpatados}</td>                    
                    <td>{item.attributes.PartidosPerdidos}</td>                          
                    <td>{item.attributes.GolesAFavor}</td>                            
                    <td>{item.attributes.GolesEnContra}</td>
                    <td>{item.attributes.DiferenciaDeGoles}</td>
                </tr>
            )
        }))
           
    }

    return (
        <>

        <Container>
        
        <div className="p-5">
            <h1 className="text-center">Tablas de Puntuaciones</h1>
        </div>
        
        
        {categorias.map((item)=>{
              
            return(
                <div className="divisiontablas" key={item}>
                    <h2 >Tabla de categoria {item}</h2>
                    <Table striped bordered hover >
                        <thead >
                            <tr >
                            <th>Equipo</th>
                            <th>Puntos</th>
                            <OverlayTrigger placement="top" overlay={<Tooltip id={'tooltip-top'}>Partidos Jugados</Tooltip>}>
                            <th>PJ</th>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip id={'tooltip-top'}>Partidos Ganados</Tooltip>}>
                            <th>PG</th>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip id={'tooltip-top'}>Partidos Empatados</Tooltip>}>
                            <th>PE</th>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip id={'tooltip-top'}>Partidos Perdidos</Tooltip>}>
                            <th>PP</th>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip id={'tooltip-top'}>Goles a Favor</Tooltip>}>
                            <th>GF</th>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip id={'tooltip-top'}>Goles en Contra</Tooltip>}>
                            <th>GC</th>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip id={'tooltip-top'}>Diferencia de Goles</Tooltip>}>
                            <th>DG</th>
                            </OverlayTrigger>
                            </tr>
                        </thead>
                        <tbody >
                            {tabla(item)}
                        </tbody>
                    </Table>
                </div>
            )
        })}
        
        </Container>
        </>
    )
};

import React from "react";
import Table from 'react-bootstrap/Table';
import { useQuery, gql } from "@apollo/client";
import { Container } from "react-bootstrap";



export default function Goleadores() {

    // pedimos datos del servidor
    const JUGADOR = gql`
    query {
        jugadores {
            data {
                id,
                attributes{
                    Nombre,
                    Apellido,
                    Goles,
                    equipo{
                        data{
                            attributes{
                                Nombre, 
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
            
            }
        }
    }
    `;
    
    const { data, loading, error } = useQuery(JUGADOR);
    

    //sige la app cuando el dato regrese y sin error
    if (loading) return "Loading...";
    if (error) return <p>{error.message}</p>
      

    // recolectamos las categorias para mostrar varios cuadros
    let cat= new Set(); // si se repite no lo agrega al arreglo
    data.jugadores.data.forEach((item)=>{
        cat.add(item.attributes.equipo.data.attributes.categoria.data.attributes.Nombre)
    })
    const categorias=[...cat]; // asignamos el set a un arreglo para poder mapear

   

    //funcion para mostrar los datos en tabla y ordenados

    function tabla(categoria){

        let goleadores=[];
        let cont=0;
        let primero;
        let ultimo;
        
        //ordena y guarda en goleadores solo a los que tienen goles
        data.jugadores.data.forEach((item) => {
        
            if((item.attributes.Goles !== null)&&(item.attributes.equipo.data.attributes.categoria.data.attributes.Nombre === categoria)){
                if (cont=== 0){
                    primero=item;
                    ultimo=item;
                    goleadores[cont]=item;
                }else if (item.attributes.Goles >= primero.attributes.Goles){
                    goleadores.unshift(item); // manda al goleador al primer lugar desplazando el resto
                    primero= item;
                    
                }else if (item.attributes.Goles <= ultimo.attributes.Goles){
                    goleadores[cont]=item;
                    ultimo= item;
                }
        
                cont=cont+1;
            }

        })
    
        // recorre la matriz para mostrar los goleadores
    
        return( goleadores.map((item)=>{
            
            return(
                <tr key={item.id}>
                    <td>{item.attributes.Nombre} {item.attributes.Apellido}</td>
                    <td>{item.attributes.equipo.data.attributes.Nombre}</td>
                    <td>{item.attributes.Goles}</td>
                </tr>
            )
        }))
           
    }

    return (
        <>

        <Container>
        <div className="p-5">
            <h1 className="text-center">Tabla de goleadores</h1>
        </div>
       
        
        {categorias.map((item)=>{
              
            return(
                <div className="divisiontablas" key={item}>
                    <h2 >Tabla de categoria {item}</h2>
                    <Table striped bordered hover >
                        <thead >
                            <tr >
                            <th>Nombre</th>
                            <th>Equipo</th>
                            <th>Goles</th>
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
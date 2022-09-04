import { gql } from "@apollo/client";



    
export const CATEGORIA = gql`
    query {
        categorias {
            data {
                id,
                attributes{
                    Nombre
                }
            }   
        }    
    }              
    `;
    




// pedimos los Partidos
      
    export const PARTIDOS = gql`
    query {
        partidos(sort: "Dia:desc", pagination: { start: 0, limit: 5000 }) {
            data {
                id,
                attributes{
                    Dia,
                    Hora,
                    Fecha,
                    Cancha,
                    categoria{
                        data{
                            attributes{
                                Nombre
                            }
                        }
                    }
                    Equipo1{
                        Resultado
                        equipo{
                            data{
                                attributes{
                                    Nombre
                                }
                            }
                        }
                    }
                    Equipo2{
                        Resultado
                        equipo{
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
    `; 
    


    
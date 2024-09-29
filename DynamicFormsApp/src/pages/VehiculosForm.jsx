import React, {useEffect, useState} from 'react';


const VehiculosTable = () => {
    const [vehiculos, setVehiculos] = useState([]);

    useEffect(() => {
        //Función para obtener los vehículos desde la API
        const fetchVehiculos = () => {
            //Realizamos la solicitud fetch al endpoint
            fetch('https://localhost:7233/api/Vehiculo/GetAllVehiculos')
            .then(response => {
                //Verificamos si la respuesta fue exitosa
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                //Convertimos la respuesta a formato JSON
                return response.json();
            })
            .then(data => setVehiculos(data)) //Guardamos los datos en el estado
            .catch(error => console.error('Error al intentar traer vehiculos :', error))
        };

        fetchVehiculos();//Llamamos a la función para obtener los vehículos
    }, []); //El array vacío significa que esto solo se ejecutara una vez al montar el componente

return(
    <Table style={{width: '100%', borderCollapse: 'collapse'}}> 

    </Table>
)
}

// import React, {useState, useEffect} from "react";
// import axios from "axios";



// const vehiculosTable = () => {
//     const [vehiculos, setVehiculos] = useState([]);

    
//     useEffect(() => {
//         axios.get("https://localhost:7233/api/Vehiculo/GetAllVehiculos")
//         .then(response => {
//             setVehiculos(response.data);
//         })
//         .catch(error => {
//             console.error("Error al intentar traer vehículos", error);
//         })
//     },[])



//     return (
//         <div style={{margin: '20px'}}>
//             <table border="1" cellPadding="10" cellSpacing="0" style={{width: '100%', borderCollapse: 'collapse'}} >
//                 <thead>
//                     <tr style={{backgroundColor: '#f2f2f2'}}>
//                         <th>ID VEHICULO</th>
//                         <th>MARCA</th>
//                         <th>MODELO</th>
//                         <th>AÑO</th>
//                         <th>DISPONIBLE</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {vehiculos.map((vehiculo) => (
//                         <tr key={vehiculo.idVehiculo}>
//                             <td>{vehiculo.idVehiculo}</td>
//                             <td>{vehiculo.marca}</td>
//                             <td>{vehiculo.modelo}</td>
//                             <td>{vehiculo.anio}</td>
//                             <td>{vehiculo.disponible ? 'Sí' : 'No'}</td>
//                         </tr>
//                     ) )

//                     }
//                 </tbody>
//             </table>

//         </div>
//     );
  

// }
// import React, {useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper
// } from "@mui/material";

// const VehiculosTable = () => {
//     const [vehiculos, setVehiculos] = useState([]);

//     //Funcion para obtener los datos del endpoint
//     useEffect(() => {

//             const fetchVehiculos = async () => {
//                 try{
//                     const response = await axios.get("https://localhost:7233/api/Vehiculo/GetAllVehiculos");
//                     setVehiculos(response.data); //Guardamos los datos en el estado
//                     console.log("valores de vehiculos",vehiculos)
//                 }catch(error){
//                     console.error("Error al traer los datos", error)
//                 }
//             };
//         fetchVehiculos();//Aqui llamamos a la funcion para obtener los datos
//     }, [])

//     //[] vacio: Indica que el efecto solo se ejecutara una vez, despues de que
//     //el componente se monte por primera vez(es decir, la primera vez que el componente aparece en pantalla).
//     //El efecto no se ejecutara nuevamente a menos que el componente se desmonte y vuelva a montarse

//     return (
//         <TableContainer component={Paper} sx={{marginTop: 4}}>
//             <Table >
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>ID Vehículo</TableCell>
//                         <TableCell>Marca</TableCell>
//                         <TableCell>Modelo</TableCell>
//                         <TableCell>Año</TableCell>
//                         <TableCell>Disponible</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {vehiculos.map((vehiculo) => (
//                         <TableRow key={vehiculo.idVehiculo}>
//                             <TableCell>{vehiculo.idVehiculo}</TableCell>
//                             <TableCell>{vehiculo.marca}</TableCell>
//                             <TableCell>{vehiculo.modelo}</TableCell>
//                             <TableCell>{vehiculo.anio}</TableCell>
//                             <TableCell>{vehiculo.disponible ? 'Si' : 'No' }</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     )
// }

// export default VehiculosTable;
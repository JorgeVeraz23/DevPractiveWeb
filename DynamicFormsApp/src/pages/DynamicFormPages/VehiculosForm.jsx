import {useState, useEffect} from 'react';
import axios from 'axios'
import styles from '../../styles/styles.module.css'

const VehiculosTable = () => {
    
    const [vehiculos , setVehiculos] = useState([])
    
    const [formVehiculo, setFormVehiculo] = useState({
        idVehiculo: 0,
        marca: '',
        modelo: '',
        anio: '',
        disponible: false,
    });


    //Limpia el formulario después de crear o actualizar
    const resetForm = () => {
        setFormVehiculo({
            idVehiculo: 0,
            marca: '',
            modelo: '',
            anio: '',
            disponible: false,
        })
    }



    useEffect(() => {
        fetchVehiculos();
    }, []);

    const fetchVehiculos = async () => {
        try{
            const response = await axios.get("https://localhost:7233/api/Vehiculo/GetAllVehiculos")
            setVehiculos(response.data);
        }catch(error){
            console.error("Hubo un error al intentar traer los datos", error)
        }
    }

    const obtenerVehiculoPorId = async (idVehiculo) => {
        try{
            const response = await axios.get(`https://localhost:7233/api/Vehiculo/ObtenerVehiculoPorId?id=${idVehiculo}`)
            setFormVehiculo(response.data);//Precarga los datos de vehiculos en el formulario
        }catch(error){
            console.error(`Hubo un error al intentar obtener el vehiculo con ID ${idVehiculo}`)
        }
    }

    const crearVehiculo = async () => {
        try{
            const response = await axios.post("https://localhost:7233/api/Vehiculo/CrearVehiculo", formVehiculo)
            console.log("Vehiculo creado", response.data)
            fetchVehiculos();//Actualizo la lista de vehiculos
            resetForm();//Limpia el formulario
        }catch(error){
            console.error("Hubo un error al intentar crear el vehiculo",error)
        }
    };

    const actualizarVehiculo = async () => {
        try{
            const response = await axios.put("https://localhost:7233/api/Vehiculo/ActualizarVehiculo", formVehiculo);
            console.log("vehiculo actualizado",response.data)
            fetchVehiculos();
            resetForm();
        }catch(error){
            console.error("Hubo un error al intentar actualizar el vehiculo", error)
        }
    }

    //Funcion para eliminar un vehiculo
    const eliminarVehiculo = async (idVehiculo) => {
        try{
            const response = await axios.delete(`https://localhost:7233/api/Vehiculo/EliminarVehiculo?idVehiculo=${idVehiculo}`)
            fetchVehiculos();
        }catch(error){
            console.error(`Hubo un error al intentar eliminar un vehiculo con el id ${idVehiculo}`)
        }
    }

    //Manejo de cambios en los campos del formulario
    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormVehiculo({
            ...formVehiculo,
            [name]: type === 'checkbox' ? checked : value
        });
    }

    return(
        <div className={styles.container}>
            <h2 className={styles.title}>Tabla de Vehiculos</h2>
            <table className={styles.table}> 
                <thead>
                    <tr>
                        <th className={styles.thTd}>ID</th>
                        <th>MARCA</th>
                        <th>MODELO</th>
                        <th>ANIO</th>
                        <th>DISPONIBLE</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {vehiculos.map((vehiculo) => (
                        <tr key={vehiculo.idVehiculo}>
                            <td>{vehiculo.idVehiculo}</td>
                            <td>{vehiculo.marca}</td>
                            <td>{vehiculo.modelo}</td>
                            <td>{vehiculo.anio}</td>
                            <td>{vehiculo.disponible ? 'si' : 'no'}</td>
                            <td>
                                <button onClick={() => obtenerVehiculoPorId(vehiculo.idVehiculo)}>Editar</button>
                                <button onClick={() => eliminarVehiculo(vehiculo.idVehiculo)} >Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>{formVehiculo.idVehiculo ? 'Editar Vehículo' : 'Crear Vehiculo'}</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                formVehiculo.idVehiculo ? actualizarVehiculo() : crearVehiculo();
            }}>
                <input 
                    type='text'
                    name='marca'
                    placeholder='Marca'
                    value={formVehiculo.marca}
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='modelo'
                    placeholder='Modelo'
                    value={formVehiculo.modelo}
                    onChange={handleChange}
                />
                <input 
                    type='number'
                    name='anio'
                    placeholder='Año'
                    value={formVehiculo.anio}
                    onChange={handleChange}
                />
                <label>
                    Disponible:
                    <input 
                        type='checkbox'
                        name='disponible'
                        checked={formVehiculo.idVehiculo}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <button type='submit' className={styles.button}>{formVehiculo.idVehiculo ? 'Actualizar' : 'Crear'}</button>
                    <button type='button' onClick={resetForm} className={styles.button} >Cancelar</button>
                </label>

            </form>
        </div>

        
        
    )
}

export default VehiculosTable;


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
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Button, CardActions, CardContent, Card,Grid2, Typography, Grid } from '@mui/material';


const VehiculosCards = () => {
    const [vehiculos, setVehiculos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get("https://localhost:7233/api/Vehiculo/GetAllVehiculos");
                setVehiculos(response.data);
            }catch(error){
                console.error("Error al obtener los vehiculos", error);
            }
        }
        
        fetchData(); //Llamada a la funcion para obtener los datos
    }, []);



    return (
        <Grid2 container spacing={{ xs: 2, md: 3 }} sx={{marginTop: 4}} columns={{ xs: 4, sm: 8, md: 12 }}>
            {vehiculos.map((vehiculo) => (
                <Grid2 item size={{ xs: 2, sm: 4, md: 4 }}  key={vehiculo.idVehiculo}>
                    <Card>
                        <CardContent>
                            <Typography variant='h5' component="div">
                                {vehiculo.marca} {vehiculo.modelo}
                            </Typography>
                            <Typography color="textSecondary">
                                Año: {vehiculo.anio}
                            </Typography>
                            <Typography color='textSecondary'>
                                Disponible: {vehiculo.disponible ? "Sí" : "No"}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size='small' variant='outlined'>
                            Ver más
                            </Button>
                        </CardActions>
                    </Card>
                </Grid2>
            ))}

        </Grid2>
    );
}


export default VehiculosCards;
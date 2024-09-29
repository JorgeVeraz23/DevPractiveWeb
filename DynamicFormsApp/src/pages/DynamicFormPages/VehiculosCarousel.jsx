import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { Card, CardContent, Typography, Button } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const VehiculosCarousel = () => {
  const [vehiculos, setVehiculos] = useState([]);

  // Función para obtener los datos del endpoint
  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await axios.get("https://localhost:7233/api/Vehiculo/GetAllVehiculos");
        setVehiculos(response.data);
        console.log("xddd",vehiculos);
      } catch (error) {
        console.error('Error al obtener los vehículos:', error);
      }
    };

    fetchVehiculos();
  }, []);

  console.log("kmo",vehiculos)
  // Configuración del carrusel
  const settings = {
    dots: true,         // Mostrar puntos de navegación
    infinite: true,     // Hacer que el carrusel sea infinito
    speed: 500,         // Velocidad de transición
    slidesToShow: 3,    // Mostrar 3 tarjetas a la vez
    slidesToScroll: 1,  // Desplazar una tarjeta por vez
    responsive: [
      {
        breakpoint: 1024, // En pantallas medianas
        settings: {
          slidesToShow: 2,  // Mostrar 2 tarjetas
        }
      },
      {
        breakpoint: 600, // En pantallas pequeñas
        settings: {
          slidesToShow: 1,  // Mostrar 1 tarjeta
        }
      }
    ]
  };



  //Verificamos que vehiculos sea un arary no vacio antes de renderizar el carrusel
  if(vehiculos.length === 0){
    return <p>Cargando Vehiculos</p>
  }

return (
    <div style={{ margin: '0 auto', maxWidth: '1200px', overflow: 'hidden' }}>
      <Slider {...settings}>
        {vehiculos.map((vehiculo) => (
          <div key={vehiculo.idVehiculo} style={{ padding: '0 10px' }}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {vehiculo.marca} {vehiculo.modelo}
                </Typography>
                <Typography color="textSecondary">
                  Año: {vehiculo.anio}
                </Typography>
                <Typography color="textSecondary">
                  Disponible: {vehiculo.disponible ? 'Sí' : 'No'}
                </Typography>
              </CardContent>
              <Button variant="contained" color="primary" style={{ margin: '10px' }}>
                Ver detalles
              </Button>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
);

};

export default VehiculosCarousel;

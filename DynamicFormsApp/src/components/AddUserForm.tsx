// components/AddUserForm.tsx
import React, { useState } from 'react';
import { Box, Button, TextField, Grid, Typography } from '@mui/material';
import { UserDto } from '../data/Interface/UserInterface';

interface AddUserFormProps {
  addUser: (newUser: UserDto) => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ addUser }) => {
  const [newUser, setNewUser] = useState<UserDto>({ nombre: '', edad: 0 });

  // Función para manejar el cambio en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value, // Actualiza el campo de nombre o edad
    });
  };

  // Función para manejar la adición del usuario
  const handleAddUser = () => {
    if (newUser.nombre && newUser.edad) {
      addUser(newUser); // Enviar los datos del nuevo usuario al backend
      setNewUser({ nombre: '', edad: 0 }); // Resetear el formulario después de agregar
    } else {
      alert("Por favor, completa todos los campos");
    }
  };

  return (
    <Box mt={4} mb={4}>
      <Typography variant="h5" gutterBottom>
        Agregar Nuevo Usuario
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre"
            variant="outlined"
            name="nombre"
            value={newUser.nombre}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Edad"
            variant="outlined"
            name="edad"
            type="number"
            value={newUser.edad}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleAddUser}>
          Agregar Usuario
        </Button>
      </Box>
    </Box>
  );
};

export default React.memo(AddUserForm);

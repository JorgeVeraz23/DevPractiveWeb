import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from '../data/Interface/UserInterface';

interface UserListProps {
  users: User[];
  onDelete: (id: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onDelete }) => {
  if (users.length === 0) return <p>No hay usuarios.</p>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {/* Cabecera en el lado derecho */}
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Edad</TableCell>
            <TableCell align="center">Acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              {/* Mostrar datos horizontalmente */}
              <TableCell align="center">{user.nombre}</TableCell>
              <TableCell align="center">{user.edad}</TableCell>
              <TableCell align="center">
                <IconButton aria-label="delete" onClick={() => onDelete(user.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(UserList);

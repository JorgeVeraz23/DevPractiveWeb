// components/UserManagement.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { useUsers } from '../../pages/../hooks/useUsers';
import UserList from '../../components/UserList';
import UseFilters from '../../components/UseFilters';
import AddUserForm from '../../components/AddUserForm';
import { Box, Typography } from '@mui/material';

const UserManagement: React.FC = () => {
  const { users, loading, error, deleteUser, addUser } = useUsers();
  const [filter, setFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'age'>('name');

  // useMemo para filtrar y ordenar la lista de usuarios
  const filteredAndSortedUsers = useMemo(() => {
    return users
      .filter((user) => 
        user?.nombre?.toLowerCase().includes(filter.toLowerCase() || '')
      )
      .sort((a, b) => 
        sortBy === 'name' ? a.nombre.localeCompare(b.nombre) : a.edad - b.edad
      );
  }, [filter, sortBy, users]);

  if (loading) return <Typography>Cargando usuarios...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Gestión de Usuarios
      </Typography>

      {/* Componente de filtros */}
      <UseFilters
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Formulario para agregar usuario */}
      <AddUserForm addUser={addUser} />

      {/* Lista de usuarios */}
      <UserList users={filteredAndSortedUsers} onDelete={deleteUser} />
    </Box>
  );
};

export default UserManagement;

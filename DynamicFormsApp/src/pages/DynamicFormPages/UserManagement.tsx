// components/UserManagement.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { useUsers } from '../../pages/../hooks/useUsers';
import UserList from '../../components/UserList';
import UserFilters from '../../components/UseFilters';
import AddUserForm from '../../components/AddUserForm';
import { UserDto } from 'data/Interface/UserInterface';

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

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Gestión de Usuarios</h1>

      {/* Componente de filtros */}
      <UserFilters
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Formulario para agregar usuario */}
      <AddUserForm addUser={addUser} />  {/* Pasar la función addUser como prop */}

      {/* Lista de usuarios */}
      <UserList users={filteredAndSortedUsers} onDelete={deleteUser} />
    </div>
  );
};

export default UserManagement;

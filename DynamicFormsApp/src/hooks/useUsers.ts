// hooks/useUsers.ts
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { UserDto, User } from 'data/Interface/UserInterface';
import { Http } from '@mui/icons-material';

const API_URL = 'https://localhost:7233/api/UsuarioNewExample'; // Actualiza esto con tu URL correcta

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener usuarios del API
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<User[]>(`${API_URL}/GetAllNewUsers`);
      setUsers(response.data);
    } catch (err) {
      setError('Error al obtener usuarios');
    } finally {
      setLoading(false);
    }
  }, []);

  // Agregar usuario
  const addUser = useCallback(async (newUser: UserDto) => {
    try {
        console.log("xd",newUser)
      const response = await axios.post<User>(`${API_URL}/CreateNewUser`, newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]);
    } catch (err) {
      setError('Error al agregar usuario');
    }
  }, []);

  // Eliminar usuario por ID
  const deleteUser = useCallback(async (id: number) => {
    try {
      const response = await axios.delete(`${API_URL}/DeleteNewUser?id=${id}`);
      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      }
    } catch (err) {
      setError('Error al eliminar usuario');
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, fetchUsers, addUser, deleteUser };
};


[Http]

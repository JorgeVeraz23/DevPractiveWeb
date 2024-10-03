import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { UserDto, User } from 'data/Interface/UserInterface';

const API_URL = 'https://localhost:7233/api/UsuarioNewExample';

// Estructura del DTO de respuesta del backend
interface MessageInfoDTO {
  message: string;
  detail: User | null;
  success: boolean;
  status: number;
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>(`${API_URL}/GetAllNewUsers`);
      setUsers(response.data);
    } catch (err) {
      setError('Error al obtener usuarios');
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (newUser: UserDto): Promise<void> => {
    try {
      const response = await axios.post<MessageInfoDTO>(`${API_URL}/CreateNewUser`, newUser);

      if (response.data.status === 201 && response.data.detail) {
        // Extraer el usuario del campo "detail" en la respuesta del backend
        const addedUser = response.data.detail;
        // Actualizar el estado de los usuarios con el nuevo usuario
        setUsers((prevUsers) => [...prevUsers, addedUser]);
      } else {
        setError('Error al agregar usuario: ' + response.data.message);
      }
    } catch (err) {
      setError('Error al agregar usuario');
      throw err;
    }
  };

  const deleteUser = useCallback(async (id: number) => {
    try {
      await axios.delete(`${API_URL}/DeleteNewUser?id=${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      setError('Error al eliminar usuario');
    }
  }, []);

  return { users, loading, error, addUser, deleteUser };
};

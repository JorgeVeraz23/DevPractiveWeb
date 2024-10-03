import React from 'react';
import { List } from '@mui/material';
import UserItem from './UserItem';
import { User } from "../data/Interface/UserInterface";

interface UserListProps {
  users: User[];
  onDelete: (id: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onDelete }) => {
  if (users.length === 0) return <p>No hay usuarios.</p>;

  return (
    <List>
      {users.map((user) => (
        <UserItem key={user.id} user={user} onDelete={onDelete} />
      ))}
    </List>
  );
};

export default React.memo(UserList);

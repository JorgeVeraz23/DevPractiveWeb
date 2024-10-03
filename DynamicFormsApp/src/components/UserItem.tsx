import React from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from "../data/Interface/UserInterface";

interface UserItemProps {
  user: User;
  onDelete: (id: number) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onDelete }) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(user.id)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={`${user.nombre} - ${user.edad} años`} />
    </ListItem>
  );
};

export default React.memo(UserItem);

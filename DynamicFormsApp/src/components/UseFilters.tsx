import React from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';

interface UserFiltersProps {
  filter: string;
  setFilter: (filter: string) => void;
  sortBy: 'name' | 'age';
  setSortBy: (sortBy: 'name' | 'age') => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  filter,
  setFilter,
  sortBy,
  setSortBy,
}) => {
  return (
    <Box mb={4}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <TextField
            label="Filtrar por nombre"
            variant="outlined"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            variant="contained"
            fullWidth
            color={sortBy === 'name' ? 'primary' : 'default'}
            onClick={() => setSortBy('name')}
          >
            Ordenar por nombre
          </Button>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            variant="contained"
            fullWidth
            color={sortBy === 'age' ? 'primary' : 'default'}
            onClick={() => setSortBy('age')}
          >
            Ordenar por edad
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default React.memo(UserFilters);

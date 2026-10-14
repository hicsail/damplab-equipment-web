import { useState, useEffect, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { fetchEquipment } from './api';
import type { EquipmentItem } from './types';
import Header from './components/Header';
import SearchFilterBar from './components/SearchFilterBar';
import EquipmentGrid from './components/EquipmentGrid';
import LoadingState from './components/LoadingState';
import Footer from './components/Footer';

function App() {
  const [items, setItems] = useState<EquipmentItem[]>([]);
  const [filtered, setFiltered] = useState<EquipmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    fetchEquipment()
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleFiltered = useCallback((result: EquipmentItem[]) => {
    setFiltered(result);
    setSearchActive(result.length !== items.length);
  }, [items.length]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="error" variant="h6">
            Unable to load equipment list
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        </Box>
      ) : (
        <>
          <SearchFilterBar items={items} onFiltered={handleFiltered} />
          <EquipmentGrid items={filtered} totalCount={items.length} searchActive={searchActive} />
        </>
      )}

      <Footer />
    </Box>
  );
}

export default App;

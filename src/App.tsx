import { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { fetchEquipment } from './api';
import type { EquipmentItem } from './types';
import Header from './components/Header';
import SearchFilterBar from './components/SearchFilterBar';
import EquipmentGrid from './components/EquipmentGrid';
import LoadingState from './components/LoadingState';
import Footer from './components/Footer';

function App() {
  const [items, setItems] = useState<EquipmentItem[]>([]);
  const [searched, setSearched] = useState<EquipmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    fetchEquipment()
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSearched = useCallback((result: EquipmentItem[]) => {
    setSearched(result);
  }, []);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    items.forEach((item) => item.tags?.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [items]);

  const filtered = useMemo(() => {
    if (!selectedTag) return searched;
    return searched.filter((item) => item.tags?.includes(selectedTag));
  }, [searched, selectedTag]);

  const searchActive = filtered.length !== items.length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Header />
        {!loading && !error && (
          <Box sx={{ bgcolor: 'background.paper', px: 3, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ maxWidth: 1200, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <SearchFilterBar items={items} onFiltered={handleSearched} />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, alignItems: 'center' }}>
                <Chip
                  label="All"
                  size="small"
                  color={selectedTag === null ? 'primary' : 'default'}
                  variant={selectedTag === null ? 'filled' : 'outlined'}
                  onClick={() => setSelectedTag(null)}
                />
                {allTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    color={selectedTag === tag ? 'primary' : 'default'}
                    variant={selectedTag === tag ? 'filled' : 'outlined'}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>

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
        <EquipmentGrid items={filtered} totalCount={items.length} searchActive={searchActive} />
      )}

      <Footer />
    </Box>
  );
}

export default App;

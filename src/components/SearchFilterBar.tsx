import { useState, useMemo, useEffect } from 'react';
import { Box, TextField, Chip, Typography, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { EquipmentItem } from '../types';

interface Props {
  items: EquipmentItem[];
  onFiltered: (filtered: EquipmentItem[]) => void;
}

export default function SearchFilterBar({ items, onFiltered }: Props) {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    items.forEach((item) => item.tags?.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [items]);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return items.filter((item) => {
      const matchesTag = !selectedTag || item.tags?.includes(selectedTag);
      const matchesSearch =
        !query ||
        item.name?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.tags?.some((t) => t.toLowerCase().includes(query)) ||
        item.modelNumber?.toLowerCase().includes(query) ||
        item.location?.toLowerCase().includes(query);
      return matchesTag && matchesSearch;
    });
  }, [search, selectedTag, items]);

  useEffect(() => {
    onFiltered(filtered);
  }, [filtered, onFiltered]);

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        px: 3,
        py: 2,
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search equipment by name, description, model, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            },
          }}
          sx={{ mb: 1.5 }}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 0.5, fontSize: '0.8rem' }}>
            Filter:
          </Typography>
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
  );
}

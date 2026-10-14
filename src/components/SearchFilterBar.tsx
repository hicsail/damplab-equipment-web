import { useState, useMemo, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { EquipmentItem } from '../types';

interface Props {
  items: EquipmentItem[];
  onFiltered: (filtered: EquipmentItem[]) => void;
}

export default function SearchFilterBar({ items, onFiltered }: Props) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    if (!query) return items;
    return items.filter((item) =>
      item.name?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query) ||
      item.tags?.some((t) => t.toLowerCase().includes(query)) ||
      item.modelNumber?.toLowerCase().includes(query) ||
      item.location?.toLowerCase().includes(query)
    );
  }, [search, items]);

  useEffect(() => {
    onFiltered(filtered);
  }, [filtered, onFiltered]);

  return (
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
    />
  );
}

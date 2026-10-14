import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import EquipmentCard from './EquipmentCard';
import type { EquipmentItem } from '../types';
import { colors } from '../theme';

interface Props {
  items: EquipmentItem[];
  totalCount: number;
  searchActive: boolean;
}

export default function EquipmentGrid({ items, totalCount, searchActive }: Props) {
  const grouped = useMemo(() => {
    const groups = new Map<string, EquipmentItem[]>();
    items.forEach((item) => {
      const category = item.tags?.[0] || 'General Equipment';
      if (!groups.has(category)) groups.set(category, []);
      groups.get(category)!.push(item);
    });
    // Sort groups alphabetically
    return new Map([...groups.entries()].sort(([a], [b]) => a.localeCompare(b)));
  }, [items]);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 3 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {searchActive
          ? `${items.length} item${items.length !== 1 ? 's' : ''} matching your search`
          : `Showing all ${totalCount} items`}
      </Typography>

      {items.length === 0 ? (
        <EmptyState />
      ) : (
        Array.from(grouped.entries()).map(([category, categoryItems]) => (
          <Box key={category} sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                color: colors.tertiary,
                fontWeight: 600,
                fontSize: '1.1rem',
                pb: 1,
                mb: 2,
                borderBottom: '2px solid',
                borderColor: 'primary.main',
              }}
            >
              {category}
              <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({categoryItems.length})
              </Typography>
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                gap: 2,
              }}
            >
              {categoryItems.map((item, index) => (
                <EquipmentCard key={`${item.name}-${index}`} item={item} />
              ))}
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
}

function EmptyState() {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
        No equipment found
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Try adjusting your search or filter criteria.
      </Typography>
    </Box>
  );
}

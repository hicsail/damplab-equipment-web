import { useState } from 'react';
import { Card, CardContent, Typography, Chip, Box, Collapse } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import type { EquipmentItem } from '../types';
import { getCategories } from '../utils';

interface Props {
  item: EquipmentItem;
}

function formatDimensions(item: EquipmentItem): string | null {
  const parts: string[] = [];
  let unit = '';
  if (item.dimensionL?.value) {
    parts.push(String(item.dimensionL.value));
    unit = item.dimensionL.unit;
  }
  if (item.dimensionW?.value) {
    parts.push(String(item.dimensionW.value));
    unit = item.dimensionW.unit || unit;
  }
  if (item.dimensionH?.value) {
    parts.push(String(item.dimensionH.value));
    unit = item.dimensionH.unit || unit;
  }
  if (parts.length === 0) return null;
  return `${parts.join(' × ')} ${unit}`.trim();
}

export default function EquipmentCard({ item }: Props) {
  const [expanded, setExpanded] = useState(false);
  const dimensions = formatDimensions(item);
  const hasLongDescription = item.description && item.description.length > 150;

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: 3 },
      }}
    >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.3, wordBreak: 'break-word' }}>
          {item.name}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {getCategories(item).map((cat) => (
            <Chip
              key={cat}
              label={cat}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.7rem', height: 22, borderColor: '#ccc', color: 'text.secondary' }}
            />
          ))}
        </Box>

        {item.description && (
          <Box>
            <Collapse in={expanded} collapsedSize={hasLongDescription ? 60 : undefined}>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                {item.description}
              </Typography>
            </Collapse>
            {hasLongDescription && (
              <Typography
                variant="caption"
                color="primary"
                sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? 'Show less' : 'Read more'}
              </Typography>
            )}
          </Box>
        )}

        <Box sx={{ mt: 'auto', pt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {item.modelNumber && (
            <Typography variant="caption" color="text.secondary">
              <strong>Model:</strong> {item.modelNumber}
            </Typography>
          )}

          {item.location && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOnOutlinedIcon sx={{ fontSize: 14 }} />
              {item.location}
            </Typography>
          )}

          {dimensions && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <StraightenOutlinedIcon sx={{ fontSize: 14 }} />
              {dimensions}
            </Typography>
          )}

          {item.bookable && (
            <Chip
              label="Available for Booking"
              size="small"
              color="primary"
              sx={{ mt: 0.5, fontSize: '0.7rem', height: 22, alignSelf: 'flex-start' }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

import { Box, Skeleton } from '@mui/material';

export default function LoadingState() {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 3 }}>
      <Skeleton variant="text" width={200} sx={{ mb: 2 }} />
      <Skeleton variant="text" width={180} height={32} sx={{ mb: 2 }} />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 2,
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} variant="rounded" height={200} />
        ))}
      </Box>
    </Box>
  );
}

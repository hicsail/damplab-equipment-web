import { Box, Skeleton, Grid } from '@mui/material';

export default function LoadingState() {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 3 }}>
      <Skeleton variant="text" width={200} sx={{ mb: 2 }} />
      <Skeleton variant="text" width={180} height={32} sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
            <Skeleton variant="rounded" height={200} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

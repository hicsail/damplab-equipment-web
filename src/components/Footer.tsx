import { Box, Typography, Link } from '@mui/material';
import { colors } from '../theme';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 4,
        px: 3,
        bgcolor: colors.tertiary,
        color: 'rgba(255,255,255,0.75)',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        <Link href="https://www.damplab.org" target="_blank" rel="noopener" color="inherit" underline="hover" sx={{ fontWeight: 600, color: 'white' }}>
          DAMP Lab
        </Link>
        {' '}&middot; Biological Design Center &middot; Boston University
      </Typography>
      <Typography variant="caption">
        610 Commonwealth Avenue, Boston, MA 02215
      </Typography>
    </Box>
  );
}

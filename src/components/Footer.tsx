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
        bgcolor: colors.headerBg,
        color: 'rgba(255,255,255,0.6)',
        textAlign: 'center',
      }}
    >
      <Link href="https://www.damplab.org" target="_blank" rel="noopener" sx={{ display: 'inline-block', mb: 1.5 }}>
        <Box
          component="img"
          src="/bu-damplab-logo.avif"
          alt="BU Biological Design Center - DAMP Lab"
          sx={{ height: 30, opacity: 0.5 }}
        />
      </Link>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        <Link href="https://www.damplab.org" target="_blank" rel="noopener" color="inherit" underline="hover" sx={{ fontWeight: 600, color: 'white' }}>
          www.damplab.org
        </Link>
      </Typography>
      <Typography variant="caption">
        610 Commonwealth Avenue, Boston, MA 02215
      </Typography>
    </Box>
  );
}

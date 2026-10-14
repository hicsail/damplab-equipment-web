import { Box, Typography, Link } from '@mui/material';
import { colors } from '../theme';

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        background: colors.tertiary,
        color: 'white',
        py: { xs: 3, md: 5 },
        px: 3,
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Link href="https://www.damplab.org" target="_blank" rel="noopener" sx={{ display: 'block', mb: 1 }}>
          <Box
            component="img"
            src="/damp-full-white.svg"
            alt="DAMP Lab"
            sx={{ height: { xs: 36, md: 48 } }}
          />
        </Link>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', md: '2rem' }, textAlign: 'center' }}
        >
          Equipment Catalogue
        </Typography>
        <Typography
          variant="body2"
          sx={{ opacity: 0.75, textAlign: 'center', fontSize: { xs: '0.8rem', md: '0.9rem' } }}
        >
          Design, Automation, Manufacturing, and Prototyping Laboratory &middot; Boston University
        </Typography>
      </Box>
    </Box>
  );
}

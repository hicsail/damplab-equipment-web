import { Box, Typography, Link } from '@mui/material';
import { colors } from '../theme';

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        background: colors.headerBg,
        color: 'white',
        py: 1.5,
        px: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link href="https://www.damplab.org" target="_blank" rel="noopener" sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src={`${import.meta.env.BASE_URL}bu-damplab-logo.avif`}
            alt="BU Biological Design Center - DAMP Lab"
            sx={{ height: { xs: 32, md: 40 } }}
          />
        </Link>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: '0.85rem', md: '1rem' },
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'white',
          }}
        >
          Equipment
        </Typography>
      </Box>
    </Box>
  );
}

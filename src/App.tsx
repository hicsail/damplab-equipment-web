import { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { fetchEquipment } from './api';
import { EquipmentItem } from './types';

function App() {
  const [items, setItems] = useState<EquipmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEquipment()
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Typography sx={{ p: 4 }}>Loading equipment...</Typography>;
  if (error) return <Typography sx={{ p: 4 }} color="error">Error: {error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4">
        Equipment Catalogue — {items.length} items loaded
      </Typography>
    </Container>
  );
}

export default App;

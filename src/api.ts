import type { EquipmentItem } from './types';

const API_URL = import.meta.env.VITE_API_URL as string;

const QUERY = `{
  publicInventoryItems {
    name
    type
    tags
    description
    location
    modelNumber
    bookable
    dimensionL { value unit }
    dimensionW { value unit }
    dimensionH { value unit }
  }
}`;

export async function fetchEquipment(): Promise<EquipmentItem[]> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: QUERY }),
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message || 'GraphQL error');
  }

  return json.data.publicInventoryItems;
}

import type { EquipmentItem } from './types';

/** Display-friendly label for a type value. */
const TYPE_LABELS: Record<string, string> = {
  EQUIPMENT: 'Equipment',
  INSTRUMENT: 'Instrument',
  MACHINE: 'Machine',
  CONSUMABLE: 'Consumable',
  ROBOT: 'Robot',
  HOOD: 'Hood',
  STORAGE: 'Storage',
  OTHER: 'Other',
};

/** Get the primary category for an item: first tag if available, otherwise the type. */
export function getCategory(item: EquipmentItem): string {
  if (item.tags && item.tags.length > 0) return item.tags[0];
  return TYPE_LABELS[item.type] || item.type || 'Other';
}

/** Get all categories for an item (all tags, or type as fallback). */
export function getCategories(item: EquipmentItem): string[] {
  if (item.tags && item.tags.length > 0) return item.tags;
  return [TYPE_LABELS[item.type] || item.type || 'Other'];
}

/** Collect all unique categories across items, sorted. */
export function getAllCategories(items: EquipmentItem[]): string[] {
  const set = new Set<string>();
  items.forEach((item) => getCategories(item).forEach((c) => set.add(c)));
  return Array.from(set).sort();
}

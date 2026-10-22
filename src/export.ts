import * as XLSX from 'xlsx';
import type { EquipmentItem } from './types';
import { getCategories } from './utils';

function formatDimensions(item: EquipmentItem): string {
  const parts: string[] = [];
  let unit = '';
  if (item.dimensionL?.value) { parts.push(String(item.dimensionL.value)); unit = item.dimensionL.unit; }
  if (item.dimensionW?.value) { parts.push(String(item.dimensionW.value)); unit = item.dimensionW.unit || unit; }
  if (item.dimensionH?.value) { parts.push(String(item.dimensionH.value)); unit = item.dimensionH.unit || unit; }
  if (parts.length === 0) return '';
  return `${parts.join(' × ')} ${unit}`.trim();
}

function toRows(items: EquipmentItem[]) {
  return items.map((item) => ({
    Name: item.name || '',
    Category: getCategories(item).join(', '),
    Description: item.description || '',
    'Model Number': item.modelNumber || '',
    Location: item.location || '',
    Bookable: item.bookable ? 'Yes' : 'No',
    Dimensions: formatDimensions(item),
  }));
}

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportXls(items: EquipmentItem[]) {
  const ws = XLSX.utils.json_to_sheet(toRows(items));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Equipment');
  const buf = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
  download(new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'damplab-equipment.xlsx');
}

export function exportCsv(items: EquipmentItem[]) {
  const ws = XLSX.utils.json_to_sheet(toRows(items));
  const csv = XLSX.utils.sheet_to_csv(ws);
  download(new Blob([csv], { type: 'text/csv' }), 'damplab-equipment.csv');
}

export function exportJson(items: EquipmentItem[]) {
  const json = JSON.stringify(toRows(items), null, 2);
  download(new Blob([json], { type: 'application/json' }), 'damplab-equipment.json');
}

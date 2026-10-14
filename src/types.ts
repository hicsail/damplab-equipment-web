export interface Dimension {
  value: number;
  unit: string;
}

export interface EquipmentItem {
  name: string;
  type: string;
  tags: string[];
  description: string;
  location: string;
  modelNumber: string;
  bookable: boolean;
  dimensionL: Dimension | null;
  dimensionW: Dimension | null;
  dimensionH: Dimension | null;
}

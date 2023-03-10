import {DomainEntity} from "./Types";

export interface KitThreadTableData {
  kit_uuid: string;
  table_columns: KitThreadTableColumn[];
  table_rows: KitThreadTableRow[];
}

export interface KitThreadTableColumn {
  kits_palettes: KitPaletteShort[];
}

export interface KitThreadTableRow extends DomainEntity  {
  uuid: string;
  order_number: number;
  quantity: number | null;
  kits_threads_variants: KitsThreadVariantShort[];
}

export interface KitsThreadVariantShort extends DomainEntity {
  uuid: string;
  kit_palette: KitPaletteShort;
  thread: ThreadShort;
}

export interface KitPaletteShort extends DomainEntity  {
  uuid: string;
  order_number: number;
  palette: PaletteShort;
}

export interface ThreadShort extends DomainEntity  {
  uuid: string;
  name: string;
  color: string;
  code: string;
}

export interface PaletteShort extends DomainEntity  {
  uuid: string;
  name: string;
}




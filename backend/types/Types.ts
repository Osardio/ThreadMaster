export interface DomainEntity {
  uuid: string
}

/*export interface NamedDomainEntity extends DomainEntity {
  uuid: string,
  name: string | null
}*/

export interface Kit extends DomainEntity {
  uuid: string
  manufacturer_uuid: string | null
  series_uuid: string | null
  code: string | null
  name_en: string | null
  name_ru: string | null
  design_width: number | null
  design_length: number | null
  stitches_count: number | null
  charms: string | null
  comment: string | null
  colors_count: number | null
  beads_available: boolean | null
  created_at: Date | null
  updated_at: Date | null
}

export interface KitPalette extends DomainEntity {
  uuid: string
  kit_uuid: string
  palette_uuid: string
  order_number: number
  created_at: Date | null
  updated_at: Date | null
}

export interface KitThread extends DomainEntity {
  uuid: string
  kit_uuid: string
  order_number: number
  quantity: number | null
  created_at: Date | null
  updated_at: Date | null
}

export interface KitThreadVariant extends DomainEntity {
  uuid: string
  kits_threads_uuid: string
  thread_uuid: string
  kit_palette_uuid: string
  created_at: Date | null
  updated_at: Date | null
}

export interface Canvas extends DomainEntity {
  uuid: string
  canvas_name_uuid: string | null
  canvas_color_uuid: string | null
  canvas_size_uuid: string | null
  kit_uuid: string
  created_at: Date | null
  updated_at: Date | null
}

export interface CanvasColor extends DomainEntity {
  uuid: string
  name: string | null
  created_at: Date | null
  updated_at: Date | null
}

export interface CanvasName extends DomainEntity {
  uuid: string
  name: string | null
  created_at: Date | null
  updated_at: Date | null
}

export interface CanvasSize extends DomainEntity  {
  uuid: string
  size: number | null
  created_at: Date | null
  updated_at: Date | null
}

export interface File extends DomainEntity {
  uuid: string
  kit_uuid: string
  name: string | null
  data: string | null
  file_type: file_type
  created_at: Date | null
  updated_at: Date | null
}

export const file_type = {
  FRONT: 'FRONT',
  THUMBNAIL: 'THUMBNAIL',
  OTHER: 'OTHER'
};

export type file_type = (typeof file_type)[keyof typeof file_type]

export interface Manufacturer extends DomainEntity {
  uuid: string
  name: string
  created_at: Date | null
  updated_at: Date | null
}

export interface Series extends DomainEntity {
  uuid: string
  manufacturer_uuid: string | null
  name: string | null
  created_at: Date | null
  updated_at: Date | null
}

export interface Thread extends DomainEntity {
  uuid: string
  palette_uuid: string
  name: string | null
  code: string
  color: string | null
  created_at: Date | null
  updated_at: Date | null
}

export interface Palette extends DomainEntity {
  uuid: string
  name: string
  created_at: Date | null
  updated_at: Date | null
}


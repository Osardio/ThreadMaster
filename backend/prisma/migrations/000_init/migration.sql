-- noinspection SqlNoDataSourceInspectionForFile

-- CreateTable
CREATE TABLE "canvas_colors" (
    "uuid" UUID NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "archived_at" TIMESTAMPTZ(6),

    CONSTRAINT "canvas_colors_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "canvas_names" (
    "uuid" UUID NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "archived_at" TIMESTAMPTZ(6),

    CONSTRAINT "canvas_names_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "canvas_sizes" (
    "uuid" UUID NOT NULL,
    "size" INTEGER,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "archived_at" TIMESTAMPTZ(6),

    CONSTRAINT "canvas_sizes_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "canvases" (
    "uuid" UUID NOT NULL,
    "canvas_name_uuid" UUID,
    "canvas_color_uuid" UUID,
    "canvas_size_uuid" UUID,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "archived_at" TIMESTAMPTZ(6),

    CONSTRAINT "canvases_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "files" (
    "uuid" UUID NOT NULL,
    "entity_uuid" UUID,
    "name" VARCHAR,
    "data" VARCHAR,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "archived_at" TIMESTAMPTZ(6),

    CONSTRAINT "files_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "kits" (
    "uuid" UUID NOT NULL,
    "manufacturer_uuid" UUID,
    "series_uuid" UUID,
    "canvas_uuid" UUID,
    "code" VARCHAR,
    "name_en" VARCHAR,
    "name_ru" VARCHAR,
    "design_width" INTEGER,
    "design_length" INTEGER,
    "design_size" INTEGER,
    "sharms" VARCHAR,
    "colors_count" INTEGER,
    "beads_available" BOOLEAN,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "archived_at" TIMESTAMPTZ(6),

    CONSTRAINT "kits_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "kits_palettes" (
    "uuid" UUID NOT NULL,
    "kit_uuid" UUID,
    "palette_uuid" UUID,
    "order_number" INTEGER,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "archived_at" TIMESTAMPTZ(6),

    CONSTRAINT "kits_palettes_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "kits_threads" (
    "uuid" UUID NOT NULL,
    "kit_uuid" UUID,
    "quantity" INTEGER,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "archived_at" TIMESTAMPTZ(6),

    CONSTRAINT "kits_threads_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "kits_threads_colors" (
    "uuid" UUID NOT NULL,
    "kit_thread_uuid" UUID,
    "palette_color_uuid" UUID,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "archived_at" TIMESTAMPTZ(6),

    CONSTRAINT "kits_threads_colors_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "manufacturers" (
    "uuid" UUID NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "archived_at" TIMESTAMPTZ(6),

    CONSTRAINT "manufacturers_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "palettes" (
    "uuid" UUID NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "archived_at" TIMESTAMPTZ(6),

    CONSTRAINT "palettes_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "palettes_colors" (
    "uuid" UUID NOT NULL,
    "palette_uuid" UUID,
    "name" VARCHAR,
    "number" VARCHAR,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "archived_at" TIMESTAMPTZ(6),

    CONSTRAINT "palettes_colors_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "series" (
    "uuid" UUID NOT NULL,
    "manufacturer_uuid" UUID,
    "name" VARCHAR,

    CONSTRAINT "series_pkey" PRIMARY KEY ("uuid")
);


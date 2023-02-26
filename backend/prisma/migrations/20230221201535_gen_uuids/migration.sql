-- AlterTable
ALTER TABLE "canvas_colors" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "canvas_names" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "canvas_sizes" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "canvases" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "files" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "kits" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "kits_palettes" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "kits_threads" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "kits_threads_colors" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "manufacturers" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "palettes" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "palettes_colors" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "series" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();

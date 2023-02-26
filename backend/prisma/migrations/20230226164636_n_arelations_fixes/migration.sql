/*
  Warnings:

  - You are about to drop the column `archived_at` on the `canvas_colors` table. All the data in the column will be lost.
  - You are about to drop the column `archived_at` on the `canvas_names` table. All the data in the column will be lost.
  - You are about to drop the column `archived_at` on the `canvas_sizes` table. All the data in the column will be lost.
  - You are about to drop the column `archived_at` on the `canvases` table. All the data in the column will be lost.
  - You are about to drop the column `archived_at` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `entity_uuid` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `archived_at` on the `kits` table. All the data in the column will be lost.
  - You are about to drop the column `canvas_uuid` on the `kits` table. All the data in the column will be lost.
  - You are about to drop the column `design_size` on the `kits` table. All the data in the column will be lost.
  - You are about to drop the column `archived_at` on the `kits_palettes` table. All the data in the column will be lost.
  - You are about to drop the column `archived_at` on the `kits_threads` table. All the data in the column will be lost.
  - You are about to drop the column `archived_at` on the `manufacturers` table. All the data in the column will be lost.
  - You are about to drop the column `archived_at` on the `palettes` table. All the data in the column will be lost.
  - You are about to drop the column `archived_at` on the `series` table. All the data in the column will be lost.
  - You are about to drop the `kits_threads_colors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `palettes_colors` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[kit_uuid]` on the table `canvases` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kit_uuid` to the `canvases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kit_uuid` to the `files` table without a default value. This is not possible if the table is not empty.
  - Made the column `kit_uuid` on table `kits_palettes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `palette_uuid` on table `kits_palettes` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `order_number` to the `kits_threads` table without a default value. This is not possible if the table is not empty.
  - Made the column `kit_uuid` on table `kits_threads` required. This step will fail if there are existing NULL values in that column.
  - Made the column `manufacturer_uuid` on table `series` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "canvas_colors" DROP COLUMN "archived_at";

-- AlterTable
ALTER TABLE "canvas_names" DROP COLUMN "archived_at";

-- AlterTable
ALTER TABLE "canvas_sizes" DROP COLUMN "archived_at";

-- AlterTable
ALTER TABLE "canvases" DROP COLUMN "archived_at",
ADD COLUMN     "kit_uuid" UUID NOT NULL;

-- AlterTable
ALTER TABLE "files" DROP COLUMN "archived_at",
DROP COLUMN "entity_uuid",
ADD COLUMN     "kit_uuid" UUID NOT NULL;

-- AlterTable
ALTER TABLE "kits" DROP COLUMN "archived_at",
DROP COLUMN "canvas_uuid",
DROP COLUMN "design_size",
ADD COLUMN     "stitches_count" INTEGER;

-- AlterTable
ALTER TABLE "kits_palettes" DROP COLUMN "archived_at",
ALTER COLUMN "kit_uuid" SET NOT NULL,
ALTER COLUMN "palette_uuid" SET NOT NULL;

-- AlterTable
ALTER TABLE "kits_threads" DROP COLUMN "archived_at",
ADD COLUMN     "order_number" INTEGER NOT NULL,
ALTER COLUMN "kit_uuid" SET NOT NULL;

-- AlterTable
ALTER TABLE "manufacturers" DROP COLUMN "archived_at";

-- AlterTable
ALTER TABLE "palettes" DROP COLUMN "archived_at";

-- AlterTable
ALTER TABLE "series" DROP COLUMN "archived_at",
ALTER COLUMN "manufacturer_uuid" SET NOT NULL;

-- DropTable
DROP TABLE "kits_threads_colors";

-- DropTable
DROP TABLE "palettes_colors";

-- CreateTable
CREATE TABLE "kits_threads_variants" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "kits_threads_uuid" UUID NOT NULL,
    "thread_uuid" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "kits_threads_variants_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "threads" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "palette_uuid" UUID NOT NULL,
    "name" VARCHAR,
    "number" VARCHAR,
    "color" VARCHAR,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "threads_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "canvases_kit_uuid_key" ON "canvases"("kit_uuid");

-- AddForeignKey
ALTER TABLE "canvases" ADD CONSTRAINT "canvases_canvas_name_uuid_fkey" FOREIGN KEY ("canvas_name_uuid") REFERENCES "canvas_names"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canvases" ADD CONSTRAINT "canvases_canvas_color_uuid_fkey" FOREIGN KEY ("canvas_color_uuid") REFERENCES "canvas_colors"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canvases" ADD CONSTRAINT "canvases_canvas_size_uuid_fkey" FOREIGN KEY ("canvas_size_uuid") REFERENCES "canvas_sizes"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canvases" ADD CONSTRAINT "canvases_kit_uuid_fkey" FOREIGN KEY ("kit_uuid") REFERENCES "kits"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_kit_uuid_fkey" FOREIGN KEY ("kit_uuid") REFERENCES "kits"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "series" ADD CONSTRAINT "series_manufacturer_uuid_fkey" FOREIGN KEY ("manufacturer_uuid") REFERENCES "manufacturers"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kits" ADD CONSTRAINT "kits_manufacturer_uuid_fkey" FOREIGN KEY ("manufacturer_uuid") REFERENCES "manufacturers"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kits" ADD CONSTRAINT "kits_series_uuid_fkey" FOREIGN KEY ("series_uuid") REFERENCES "series"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kits_palettes" ADD CONSTRAINT "kits_palettes_kit_uuid_fkey" FOREIGN KEY ("kit_uuid") REFERENCES "kits"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kits_palettes" ADD CONSTRAINT "kits_palettes_palette_uuid_fkey" FOREIGN KEY ("palette_uuid") REFERENCES "palettes"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kits_threads" ADD CONSTRAINT "kits_threads_kit_uuid_fkey" FOREIGN KEY ("kit_uuid") REFERENCES "kits"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kits_threads_variants" ADD CONSTRAINT "kits_threads_variants_kits_threads_uuid_fkey" FOREIGN KEY ("kits_threads_uuid") REFERENCES "kits_threads"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kits_threads_variants" ADD CONSTRAINT "kits_threads_variants_thread_uuid_fkey" FOREIGN KEY ("thread_uuid") REFERENCES "threads"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_palette_uuid_fkey" FOREIGN KEY ("palette_uuid") REFERENCES "palettes"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

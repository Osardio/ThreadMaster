/*
  Warnings:

  - You are about to drop the column `sharms` on the `kits` table. All the data in the column will be lost.
  - Added the required column `kit_palette_uuid` to the `kits_threads_variants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "kits" DROP COLUMN "sharms",
ADD COLUMN     "charms" VARCHAR;

-- AlterTable
ALTER TABLE "kits_threads_variants" ADD COLUMN     "kit_palette_uuid" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "kits_threads_variants" ADD CONSTRAINT "kits_threads_variants_kit_palette_uuid_fkey" FOREIGN KEY ("kit_palette_uuid") REFERENCES "kits_palettes"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

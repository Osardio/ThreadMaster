-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_kit_uuid_fkey";

-- DropForeignKey
ALTER TABLE "kits_palettes" DROP CONSTRAINT "kits_palettes_kit_uuid_fkey";

-- DropForeignKey
ALTER TABLE "kits_palettes" DROP CONSTRAINT "kits_palettes_palette_uuid_fkey";

-- DropForeignKey
ALTER TABLE "kits_threads" DROP CONSTRAINT "kits_threads_kit_uuid_fkey";

-- DropForeignKey
ALTER TABLE "kits_threads_variants" DROP CONSTRAINT "kits_threads_variants_kit_palette_uuid_fkey";

-- DropForeignKey
ALTER TABLE "kits_threads_variants" DROP CONSTRAINT "kits_threads_variants_kits_threads_uuid_fkey";

-- DropForeignKey
ALTER TABLE "kits_threads_variants" DROP CONSTRAINT "kits_threads_variants_thread_uuid_fkey";

-- DropForeignKey
ALTER TABLE "series" DROP CONSTRAINT "series_manufacturer_uuid_fkey";

-- DropForeignKey
ALTER TABLE "threads" DROP CONSTRAINT "threads_palette_uuid_fkey";

-- AlterTable
ALTER TABLE "series" ALTER COLUMN "manufacturer_uuid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_kit_uuid_fkey" FOREIGN KEY ("kit_uuid") REFERENCES "kits"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "series" ADD CONSTRAINT "series_manufacturer_uuid_fkey" FOREIGN KEY ("manufacturer_uuid") REFERENCES "manufacturers"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kits_palettes" ADD CONSTRAINT "kits_palettes_kit_uuid_fkey" FOREIGN KEY ("kit_uuid") REFERENCES "kits"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kits_palettes" ADD CONSTRAINT "kits_palettes_palette_uuid_fkey" FOREIGN KEY ("palette_uuid") REFERENCES "palettes"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kits_threads" ADD CONSTRAINT "kits_threads_kit_uuid_fkey" FOREIGN KEY ("kit_uuid") REFERENCES "kits"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kits_threads_variants" ADD CONSTRAINT "kits_threads_variants_kits_threads_uuid_fkey" FOREIGN KEY ("kits_threads_uuid") REFERENCES "kits_threads"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kits_threads_variants" ADD CONSTRAINT "kits_threads_variants_thread_uuid_fkey" FOREIGN KEY ("thread_uuid") REFERENCES "threads"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kits_threads_variants" ADD CONSTRAINT "kits_threads_variants_kit_palette_uuid_fkey" FOREIGN KEY ("kit_palette_uuid") REFERENCES "kits_palettes"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_palette_uuid_fkey" FOREIGN KEY ("palette_uuid") REFERENCES "palettes"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

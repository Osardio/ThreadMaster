-- DropForeignKey
ALTER TABLE "canvases" DROP CONSTRAINT "canvases_kit_uuid_fkey";

-- AddForeignKey
ALTER TABLE "canvases" ADD CONSTRAINT "canvases_kit_uuid_fkey" FOREIGN KEY ("kit_uuid") REFERENCES "kits"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

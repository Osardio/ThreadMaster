-- CreateEnum
CREATE TYPE "file_type" AS ENUM ('FRONT', 'THUMBNAIL', 'OTHER');

-- AlterTable
ALTER TABLE "files" ADD COLUMN     "file_type" "file_type" NOT NULL DEFAULT 'OTHER';

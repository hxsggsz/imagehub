/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Folders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[backgroundImage]` on the table `Folders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[backgroundImageKey]` on the table `Folders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `backgroundImageKey` to the `Folders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Folders" ADD COLUMN     "backgroundImageKey" STRING NOT NULL;

-- AlterTable
ALTER TABLE "Images" ADD COLUMN     "name" STRING NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Folders_name_key" ON "Folders"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Folders_backgroundImage_key" ON "Folders"("backgroundImage");

-- CreateIndex
CREATE UNIQUE INDEX "Folders_backgroundImageKey_key" ON "Folders"("backgroundImageKey");

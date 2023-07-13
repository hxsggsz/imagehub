/*
  Warnings:

  - Added the required column `imageKey` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Images" ADD COLUMN     "imageKey" STRING NOT NULL;

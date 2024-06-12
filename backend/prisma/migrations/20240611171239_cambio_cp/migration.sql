/*
  Warnings:

  - You are about to drop the column `postalCode` on the `User` table. All the data in the column will be lost.
  - Added the required column `cp` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `postalCode`,
    ADD COLUMN `cp` VARCHAR(191) NOT NULL;

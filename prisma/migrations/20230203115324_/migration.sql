/*
  Warnings:

  - Made the column `email` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Profile` MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL,
    MODIFY `role` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Project` MODIFY `color` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Task` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `status` VARCHAR(191) NOT NULL;

/*
  Warnings:

  - You are about to drop the column `funnelId` on the `Stage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Stage" DROP CONSTRAINT "Stage_funnelId_fkey";

-- AlterTable
ALTER TABLE "Stage" DROP COLUMN "funnelId";

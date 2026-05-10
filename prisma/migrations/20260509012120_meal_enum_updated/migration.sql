/*
  Warnings:

  - The values [ACTIVE,INACTIVE,ARCHIVED] on the enum `MealStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MealStatus_new" AS ENUM ('TRUE', 'FALSE');
ALTER TABLE "public"."meal" ALTER COLUMN "isAvailable" DROP DEFAULT;
ALTER TABLE "meal" ALTER COLUMN "isAvailable" TYPE "MealStatus_new" USING ("isAvailable"::text::"MealStatus_new");
ALTER TYPE "MealStatus" RENAME TO "MealStatus_old";
ALTER TYPE "MealStatus_new" RENAME TO "MealStatus";
DROP TYPE "public"."MealStatus_old";
ALTER TABLE "meal" ALTER COLUMN "isAvailable" SET DEFAULT 'TRUE';
COMMIT;

-- AlterTable
ALTER TABLE "meal" ALTER COLUMN "isAvailable" SET DEFAULT 'TRUE';

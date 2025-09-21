-- DropForeignKey
ALTER TABLE "public"."Issue" DROP CONSTRAINT "Issue_meetingId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Issue" ADD CONSTRAINT "Issue_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "public"."Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

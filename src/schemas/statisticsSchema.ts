import { z } from "zod";

export const statisticsSchema = z.object({
  totalHours: z.number(),
  totalAttendanceRecords: z.number(),
  totalProposedCampaigns: z.number(),
  totalApplications: z.number(),
  applicationsPending: z.number(),
  applicationsApproved: z.number(),
  applicationsRejected: z.number(),
  applicationsWithdrawn: z.number(),
  applicationsCancelled: z.number(),
});

export type Statistics = z.infer<typeof statisticsSchema>;


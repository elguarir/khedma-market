import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { randomUUID } from "crypto";
import { env } from "@/env";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  region: env.AWS_REGION,
  signatureVersion: "v4",
});

export const fileRouter = createTRPCRouter({
  generateUrl: protectedProcedure
    .input(z.object({ filename: z.string(), filetype: z.string() }))
    .mutation(async ({ input }) => {
      const { filename, filetype } = input;
      const fileId = randomUUID();
      const key = `${fileId}/${filename}`;

      const params = {
        Bucket: env.AWS_BUCKET_NAME,
        Key: key,
        Expires: 120,
        ContentType: filetype,
      };

      const url = s3.getSignedUrl("putObject", params);
      return { url, key };
    }),
});

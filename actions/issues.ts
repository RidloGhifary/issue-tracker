"use server";

import { z } from "zod";

import db from "@/lib/db";
import { createIssuesSchema } from "@/schemas";

export async function createIssue(values: z.infer<typeof createIssuesSchema>) {
  const validatedRequest = createIssuesSchema.safeParse(values);

  if (!validatedRequest.success) {
    return { error: "Please input correct field!" };
  }

  await db.issue.create({
    data: {
      title: values.title,
      description: values.description,
    },
  });

  return { success: "Success creating!" };
}

export async function getAllIssues() {
  const datas = await db.issue.findMany();
  return datas;
}

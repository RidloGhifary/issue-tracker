import db from "@/lib/db";

export async function getAllIssues() {
  try {
    const issues = await db.issue.findMany();

    return issues;
  } catch {
    return null;
  }
}

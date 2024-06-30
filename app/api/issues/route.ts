import { NextRequest, NextResponse } from "next/server";

import { createIssuesSchema } from "@/schemas";
import db from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validatedRequest = createIssuesSchema.safeParse(body);

  if (!validatedRequest.success) {
    return NextResponse.json(
      {
        error: validatedRequest.error,
      },
      { status: 400 }
    );
  }

  await db.issue.create({
    data: {
      title: validatedRequest.data.title,
      description: validatedRequest.data.description,
    },
  });

  return NextResponse.json({ success: true }, { status: 200 });
}

export async function GET() {
  const datas = await db.issue.findMany();

  return NextResponse.json({ success: true, data: datas }, { status: 200 });
}

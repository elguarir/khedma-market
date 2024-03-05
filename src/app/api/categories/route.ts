import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const categories = await db.category.findMany({
    where: { parentId: null },
    include: {
      subCategories: {
        include: { subCategories: true },
      },
    },
  });
  return NextResponse.json({ categories });
}

import { db } from "app/db"
import { blog } from "app/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET(request: Request){
    const url = new URL(request.url)
    const id = Number(url.pathname.split("/").pop())

    const result = await db.select().from(blog).where(eq(blog.id, id))
    return NextResponse.json(result)
}
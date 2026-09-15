import { z } from "zod";
import { db } from "@/db";
import { inquiries } from "@/db/schema";

export const dynamic = "force-dynamic";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Invalid email address").max(120),
  company: z.string().trim().max(120).optional().default(""),
  country: z.string().trim().max(80).optional().default(""),
  inquiryType: z.enum(["export", "import", "partnership", "general"]).default("general"),
  product: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10, "Message is too short").max(4000),
  website: z.string().optional().default(""),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots that fill the hidden field are silently accepted & dropped.
  const raw = body as Record<string, unknown>;
  if (typeof raw.website === "string" && raw.website.length > 0) {
    return Response.json({ ok: true, ref: "AE-RCVD" });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Please review the highlighted fields and try again." },
      { status: 422 }
    );
  }

  const { website: _honeypot, ...data } = parsed.data;

  try {
    const [row] = await db
      .insert(inquiries)
      .values({
        name: data.name,
        email: data.email,
        company: data.company || null,
        country: data.country || null,
        inquiryType: data.inquiryType,
        product: data.product || null,
        message: data.message,
      })
      .returning({ id: inquiries.id });

    const ref = `AE-${new Date().getFullYear()}-${String(row.id).padStart(4, "0")}`;
    return Response.json({ ok: true, ref });
  } catch (err) {
    console.error("[inquiry] failed to store inquiry", err);
    return Response.json(
      { ok: false, error: "We could not save your inquiry right now. Please email us directly." },
      { status: 500 }
    );
  }
}

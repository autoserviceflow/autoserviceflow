// FILE LOCATION: app/api/leads/route.js
// Receives lead form submission → saves to Supabase → triggers email notifications

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // service role key — NOT the anon key
);

export async function POST(request) {
  try {
    const body = await request.json();
    const { full_name, company_name, email, country, message } = body;

    // ── Validate required fields ──────────────────────────────────────────────
    if (!full_name || !company_name || !email) {
      return Response.json(
        { error: "Missing required fields: full_name, company_name, email" },
        { status: 400 }
      );
    }

    // ── Insert into Supabase leads table ──────────────────────────────────────
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          full_name,
          company_name,
          email,
          country: country || null,
          specific_requirements: message || null,
          source: "contact_form",
          status: "new",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return Response.json({ error: "Failed to save lead" }, { status: 500 });
    }

    // ── Trigger email notifications ───────────────────────────────────────────
    // Fire and forget — don't block the response waiting for email
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/notify-lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name, company_name, email, country, message }),
    }).catch((err) => console.error("Email notification failed:", err));

    return Response.json({ success: true, id: data.id }, { status: 200 });
  } catch (err) {
    console.error("Leads API error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
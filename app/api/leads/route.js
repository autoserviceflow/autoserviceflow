// FILE LOCATION: app/api/leads/route.js
// DEBUG VERSION — skips Supabase, only tests email notification

export async function POST(request) {
  try {
    const body = await request.json();
    const { full_name, company_name, email, country, message } = body;

    // Validate required fields
    if (!full_name || !company_name || !email) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Lead received:", { full_name, company_name, email });

    // Call notify-lead directly
    const notifyRes = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/notify-lead`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name, company_name, email, country, message }),
      }
    );

    const notifyData = await notifyRes.json();
    console.log("Notify result:", notifyData);

    return Response.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error("Leads API error:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
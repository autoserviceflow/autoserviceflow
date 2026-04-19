// FILE LOCATION: app/api/notify-lead/route.js
// Sends two emails via Resend:
//   Email A → you (hello@autoserviceflow.com) — new lead alert
//   Email B → the lead — auto-reply confirmation

export async function POST(request) {
  try {
    const body = await request.json();
    const { full_name, company_name, email, country, message } = body;

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const FROM_EMAIL = "hello@autoserviceflow.com";
    const OWNER_EMAIL = "hello@autoserviceflow.com";

    // ── EMAIL A — Alert to you ────────────────────────────────────────────────
    const alertEmail = {
      from: `AutoServiceFlow <${FROM_EMAIL}>`,
      to: [OWNER_EMAIL],
      subject: `New Lead — ${company_name}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#0f172a;">
          <div style="background:#0F2D52;padding:1.5rem 2rem;border-radius:12px 12px 0 0;">
            <h1 style="color:#fff;font-size:1.1rem;margin:0;font-weight:700;">
              New Lead — AutoServiceFlow
            </h1>
          </div>
          <div style="background:#f8fafc;padding:1.5rem 2rem;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">
            <table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
              <tr>
                <td style="padding:0.6rem 0;color:#64748b;width:140px;vertical-align:top;">Full Name</td>
                <td style="padding:0.6rem 0;font-weight:600;">${full_name}</td>
              </tr>
              <tr style="border-top:1px solid #e2e8f0;">
                <td style="padding:0.6rem 0;color:#64748b;vertical-align:top;">Company</td>
                <td style="padding:0.6rem 0;font-weight:600;">${company_name}</td>
              </tr>
              <tr style="border-top:1px solid #e2e8f0;">
                <td style="padding:0.6rem 0;color:#64748b;vertical-align:top;">Email</td>
                <td style="padding:0.6rem 0;">
                  <a href="mailto:${email}" style="color:#14B8A6;">${email}</a>
                </td>
              </tr>
              <tr style="border-top:1px solid #e2e8f0;">
                <td style="padding:0.6rem 0;color:#64748b;vertical-align:top;">Country</td>
                <td style="padding:0.6rem 0;">${country || "—"}</td>
              </tr>
              <tr style="border-top:1px solid #e2e8f0;">
                <td style="padding:0.6rem 0;color:#64748b;vertical-align:top;">Message</td>
                <td style="padding:0.6rem 0;line-height:1.6;">${message || "—"}</td>
              </tr>
              <tr style="border-top:1px solid #e2e8f0;">
                <td style="padding:0.6rem 0;color:#64748b;vertical-align:top;">Source</td>
                <td style="padding:0.6rem 0;">Contact form — autoserviceflow.com</td>
              </tr>
            </table>
            <div style="margin-top:1.5rem;">
              <a href="mailto:${email}?subject=Re: Your AutoServiceFlow Demo Request"
                style="background:#14B8A6;color:#fff;padding:0.7rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.9rem;display:inline-block;">
                Reply to ${full_name} →
              </a>
            </div>
          </div>
        </div>
      `,
    };

    // ── EMAIL B — Auto-reply to lead ──────────────────────────────────────────
    const autoReply = {
      from: `AutoServiceFlow <${FROM_EMAIL}>`,
      to: [email],
      reply_to: OWNER_EMAIL,
      subject: "Your AutoServiceFlow Demo Request — We Will Be in Touch",
      html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#0f172a;">
          <div style="background:#0F2D52;padding:1.5rem 2rem;border-radius:12px 12px 0 0;">
            <h1 style="color:#fff;font-size:1.1rem;margin:0;font-weight:700;">
              Auto<span style="color:#14B8A6;">Service</span>Flow
            </h1>
          </div>
          <div style="background:#fff;padding:2rem;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">
            <p style="font-size:1rem;font-weight:700;margin:0 0 1rem;">Hi ${full_name},</p>
            <p style="color:#475569;line-height:1.75;margin:0 0 1rem;">
              Thank you for reaching out to AutoServiceFlow. We have received your request
              and will review your requirements carefully.
            </p>
            <p style="color:#475569;line-height:1.75;margin:0 0 1.5rem;">
              You can expect a personalised proposal in your inbox
              <strong style="color:#0f172a;">within 1 business day.</strong>
            </p>
            <div style="background:#f0fdfa;border:1px solid #99f6e4;border-radius:10px;padding:1rem 1.2rem;margin-bottom:1.5rem;">
              <p style="margin:0;font-size:0.88rem;color:#0d9488;font-weight:600;">What happens next:</p>
              <ol style="margin:0.6rem 0 0;padding-left:1.2rem;color:#475569;font-size:0.88rem;line-height:1.75;">
                <li>We review your business type and requirements</li>
                <li>We prepare a customised proposal with pricing</li>
                <li>You receive it by email within 1 business day</li>
              </ol>
            </div>
            <p style="color:#475569;line-height:1.75;margin:0 0 1.5rem;font-size:0.9rem;">
              Have a question in the meantime? Simply reply to this email —
              we're happy to help before the proposal arrives.
            </p>
            <p style="color:#94a3b8;font-size:0.82rem;margin:0;border-top:1px solid #f1f5f9;padding-top:1rem;">
              AutoServiceFlow · hello@autoserviceflow.com · autoserviceflow.com<br/>
              You received this email because you submitted a demo request on our website.
            </p>
          </div>
        </div>
      `,
    };

    // ── Send both emails via Resend ───────────────────────────────────────────
    const sendEmail = async (payload) => {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Resend error: ${err}`);
      }
      return res.json();
    };

    await Promise.all([sendEmail(alertEmail), sendEmail(autoReply)]);

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Notify-lead error:", err);
    // Return 200 anyway — don't surface email errors to user
    return Response.json({ success: true }, { status: 200 });
  }
}
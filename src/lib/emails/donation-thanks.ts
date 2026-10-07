import { Resend } from "resend";

const SITE_URL = "https://collectif-humaniterre.be";
const FROM = "Collectif Humaniterre <dons@collectif-humaniterre.be>";
const REPLY_TO = "info@collectif-humaniterre.be";

type DonationThanks = {
  email: string;
  name?: string | null;
  amountCents: number;
  idempotencyKey?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatAmount(amountCents: number) {
  return new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: amountCents % 100 === 0 ? 0 : 2,
  }).format(amountCents / 100);
}

export function buildDonationThanksEmail({ name, amountCents }: Pick<DonationThanks, "name" | "amountCents">) {
  const firstName = (name ?? "").trim().split(/\s+/)[0] ?? "";
  const greeting = firstName ? `Merci ${firstName} !` : "Merci !";
  const amount = formatAmount(amountCents);
  const subject = "Merci pour votre don à Collectif Humaniterre";

  const text = [
    greeting,
    "",
    `Votre don de ${amount} a bien été reçu.`,
    "Il soutient directement nos missions en Guinée et au Bangladesh : eau potable, alimentation et éducation.",
    "",
    "Grâce à vous, l'aide arrive sur le terrain.",
    "",
    `Découvrir nos projets : ${SITE_URL}/projets`,
    "",
    "Avec toute notre gratitude,",
    "L'équipe du Collectif Humaniterre",
    "",
    "—",
    "Collectif Humaniterre ASBL · BCE BE 1033.490.854",
    "info@collectif-humaniterre.be · collectif-humaniterre.be",
  ].join("\n");

  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#F5F2EA;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Votre don de ${escapeHtml(amount)} a bien été reçu. Merci pour votre soutien.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F5F2EA;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#FFFFFF;border-radius:20px;overflow:hidden;">
        <tr>
          <td style="background:#0E2B1F;padding:28px 36px;font-family:Arial,Helvetica,sans-serif;">
            <div style="font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#C5D86D;">Collectif Humaniterre ASBL</div>
            <div style="margin-top:10px;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.2;color:#F5F2EA;">${escapeHtml(greeting)}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 36px 8px;font-family:Arial,Helvetica,sans-serif;color:#1B2A22;">
            <p style="margin:0 0 20px;font-size:17px;line-height:1.6;">Votre don a bien été reçu.</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F3F6E6;border-radius:14px;">
              <tr>
                <td style="padding:20px 24px;font-family:Arial,Helvetica,sans-serif;">
                  <div style="font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:#4A5A50;">Montant du don</div>
                  <div style="margin-top:6px;font-size:30px;font-weight:bold;color:#0E2B1F;">${escapeHtml(amount)}</div>
                </td>
              </tr>
            </table>
            <p style="margin:24px 0 0;font-size:16px;line-height:1.65;color:#4A5A50;">Il soutient directement nos missions en Guinée et au Bangladesh&nbsp;: eau potable, alimentation et éducation. Grâce à vous, l'aide arrive sur le terrain.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 36px 8px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background:#1F5C3A;border-radius:999px;">
                  <a href="${SITE_URL}/projets" style="display:inline-block;padding:14px 26px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;color:#FFFFFF;text-decoration:none;">Découvrir nos projets</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 36px 32px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#1B2A22;">
            Avec toute notre gratitude,<br>
            <strong>L'équipe du Collectif Humaniterre</strong>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 36px;border-top:1px solid #ECEAE2;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#56635B;">
            Collectif Humaniterre ASBL · BCE BE 1033.490.854<br>
            <a href="mailto:${REPLY_TO}" style="color:#1F5C3A;">${REPLY_TO}</a> · <a href="${SITE_URL}" style="color:#1F5C3A;">collectif-humaniterre.be</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  return { subject, html, text };
}

export async function sendDonationThanks({ email, name, amountCents, idempotencyKey }: DonationThanks) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY manquante : email de remerciement non envoyé.");
    return;
  }
  if (!email || !amountCents) return;

  const { subject, html, text } = buildDonationThanksEmail({ name, amountCents });

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send(
      { from: FROM, to: email, replyTo: REPLY_TO, subject, html, text },
      idempotencyKey ? { idempotencyKey: `donation-thanks/${idempotencyKey}` } : undefined
    );
    if (error) console.error("Resend error", error);
  } catch (err) {
    console.error("Email de remerciement non envoyé", err);
  }
}

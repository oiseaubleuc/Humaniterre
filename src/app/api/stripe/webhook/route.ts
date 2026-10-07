import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendDonationThanks } from "@/lib/emails/donation-thanks";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY manquante");
  }
  return new Stripe(key);
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) {
    return NextResponse.json({ error: "Signature manquante." }, { status: 400 });
  }

  const payload = await request.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(payload, signature, secret);
  } catch (error) {
    console.error("Stripe webhook signature", error);
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object;
    const paid =
      event.type === "checkout.session.async_payment_succeeded" ||
      session.payment_status === "paid";

    if (paid) {
      await sendDonationThanks({
        email: session.customer_details?.email ?? session.customer_email ?? "",
        name: session.metadata?.donor_name,
        amountCents: session.amount_total ?? 0,
        idempotencyKey: session.id,
      });
    }
  }

  return NextResponse.json({ received: true });
}

import { NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY manquante");
  }
  return new Stripe(key);
}

const MIN = 1;
const MAX = 10000;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const amount = Number(body.amount);
  const frequency = body.frequency === "monthly" ? "monthly" : "once";
  const email = String(body.email ?? "").trim();
  const name = String(body.name ?? "").trim().slice(0, 100);

  if (!Number.isInteger(amount) || amount < MIN || amount > MAX) {
    return NextResponse.json(
      { error: "Choisissez un montant entre 1 € et 10 000 €." },
      { status: 400 }
    );
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Indiquez une adresse email valide." }, { status: 400 });
  }

  const appUrl = process.env.APP_URL ?? new URL(request.url).origin;
  const unitAmount = amount * 100; // Stripe travaille en centimes
  const metadata = { frequency, donor_name: name };

  try {
    const session =
      frequency === "monthly"
        ? await getStripe().checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card", "sepa_debit"],
            line_items: [
              {
                quantity: 1,
                price_data: {
                  currency: "eur",
                  unit_amount: unitAmount,
                  recurring: { interval: "month" },
                  product_data: { name: "Don mensuel à Collectif Humaniterre" },
                },
              },
            ],
            customer_email: email,
            metadata,
            subscription_data: { metadata },
            locale: "fr",
            success_url: `${appUrl}/don/merci?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${appUrl}/don#formulaire`,
          })
        : await getStripe().checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card", "bancontact"],
            line_items: [
              {
                quantity: 1,
                price_data: {
                  currency: "eur",
                  unit_amount: unitAmount,
                  product_data: { name: "Don à Collectif Humaniterre" },
                },
              },
            ],
            customer_email: email,
            metadata,
            payment_intent_data: { metadata },
            locale: "fr",
            success_url: `${appUrl}/don/merci?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${appUrl}/don#formulaire`,
          });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error", error);
    return NextResponse.json(
      { error: "Le paiement n'a pas pu démarrer. Réessayez dans un instant." },
      { status: 500 }
    );
  }
}

"use client";

import { useEffect, useState, type FormEvent } from "react";
import styles from "./don.module.css";

const PRESETS = [10, 25, 50, 100];
const MIN = 1;
const MAX = 10000;

export default function DonationForm() {
  const [preset, setPreset] = useState<number | null>(25);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Présélection via /don?amount=50 (utilisé par le bouton de don de l'accueil)
  useEffect(() => {
    const value = Number(new URLSearchParams(window.location.search).get("amount"));
    if (Number.isInteger(value) && value >= MIN && value <= MAX) {
      if (PRESETS.includes(value)) {
        setPreset(value);
      } else {
        setPreset(null);
        setCustom(String(value));
      }
    }
  }, []);

  const amount = preset ?? (parseInt(custom, 10) || 0);
  const amountIsValid = amount >= MIN && amount <= MAX;

  const buttonLabel = amountIsValid ? `Donner ${amount} €` : "Choisissez un montant";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!amountIsValid) {
      setError(`Choisissez un montant entre ${MIN} € et ${MAX.toLocaleString("fr-BE")} €.`);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Indiquez une adresse email valide.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/donations/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          name: name.trim(),
          email: email.trim(),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.url) {
        throw new Error(data.error || "");
      }
      window.location.href = data.url;
    } catch (err) {
      const message = err instanceof Error && err.message ? err.message : "";
      setError(message || "Le paiement n'a pas pu démarrer. Réessayez dans un instant.");
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Choisissez un montant</legend>
        <div className={styles.amounts}>
          {PRESETS.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={preset === value}
              className={preset === value ? styles.amountActive : styles.amount}
              onClick={() => {
                setPreset(value);
                setCustom("");
              }}
            >
              {value} €
            </button>
          ))}
        </div>

        <label className={preset === null ? styles.customActive : styles.custom}>
          <span>Autre montant</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={custom}
            onFocus={() => setPreset(null)}
            onChange={(e) => {
              setPreset(null);
              setCustom(e.target.value.replace(/[^0-9]/g, "").slice(0, 5));
            }}
            aria-label="Autre montant en euros"
          />
          <span aria-hidden="true">€</span>
        </label>
      </fieldset>

      <div className={styles.fields}>
        <label className={styles.field}>
          Prénom et nom
          <input
            type="text"
            autoComplete="name"
            placeholder="Marie Dupont"
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className={styles.field}>
          Email
          <input
            type="email"
            autoComplete="email"
            placeholder="marie@exemple.be"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>

      <button
        type="submit"
        className={styles.submit}
        disabled={!amountIsValid || loading}
        aria-busy={loading}
      >
        {loading ? "Redirection vers le paiement…" : buttonLabel}
        {!loading && (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        )}
      </button>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <p className={styles.secureNote}>Vous serez redirigé vers une page de paiement sécurisée.</p>
    </form>
  );
}

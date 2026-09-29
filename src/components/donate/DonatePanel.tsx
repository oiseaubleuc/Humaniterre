"use client";

import { useState } from "react";
import {
  Building2,
  Check,
  Copy,
  Heart,
  QrCode,
  Smartphone,
} from "lucide-react";
import { vzw } from "@/config/vzwData";

export function DonatePanel() {
  const [copied, setCopied] = useState<"iban" | "reference" | null>(null);
  const payconiqReady = vzw.payconiqUrl.length > 0;

  async function copyValue(value: string, key: "iban" | "reference") {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <article className="rounded-[2rem] border-2 border-[#8b9a56] bg-[#15261e] p-6 sm:p-8">
        <p className="inline-flex items-center gap-2 rounded-full bg-[#8b9a56]/20 px-3 py-1 text-xs font-semibold text-[#d5e09a] ">
          <Heart className="size-3.5" aria-hidden="true" />
          0&nbsp;% de commission
        </p>
        <h2 className="mt-4 font-display text-2xl leading-snug text-[#f3f5e8]">
          Virement bancaire
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#d5dcc0]">
          100&nbsp;% du montant arrive sur le compte de l&apos;ASBL. Aucun
          intermédiaire ne prélève de commission.
        </p>

        <dl className="mt-6 space-y-4 text-sm">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d5e09a]">
              Bénéficiaire
            </dt>
            <dd className="mt-1 flex items-center gap-2 font-medium text-[#f3f5e8]">
              <Building2 className="size-4 text-[#d5e09a]" aria-hidden="true" />
              {vzw.legalName}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d5e09a]">
              IBAN
            </dt>
            <dd className="mt-1 flex flex-wrap items-center gap-3">
              <span className="font-display text-xl tracking-wide text-[#f3f5e8]">
                {vzw.ibanDisplay}
              </span>
              <CopyButton
                copied={copied === "iban"}
                label="Copier l'IBAN"
                copiedLabel="Copié !"
                onClick={() => copyValue(vzw.iban, "iban")}
              />
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d5e09a]">
              BIC
            </dt>
            <dd className="mt-1 text-[#f3f5e8]">{vzw.bic}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d5e09a]">
              Communication
            </dt>
            <dd className="mt-1 flex flex-wrap items-center gap-3">
              <span className="text-[#f3f5e8]">{vzw.donationReference}</span>
              <CopyButton
                copied={copied === "reference"}
                label="Copier"
                copiedLabel="Copié !"
                onClick={() => copyValue(vzw.donationReference, "reference")}
              />
            </dd>
          </div>
        </dl>

        <QrBlock
          src={vzw.epcQrSrc}
          title="QR bancaire EPC"
          text="Scannez ce code avec l'application de votre banque belge. Le montant se saisit dans l'app."
        />
      </article>

      <article className="rounded-[2rem] border border-[#8b9a56]/30 bg-[#15261e] p-6 sm:p-8">
        <p className="inline-flex items-center gap-2 rounded-full bg-[#243528] px-3 py-1 text-xs font-semibold text-[#d5e09a] ">
          <Smartphone className="size-3.5" aria-hidden="true" />
          Payconiq / Bancontact
        </p>
        <h2 className="mt-4 font-display text-2xl leading-snug text-[#f3f5e8]">
          Montant libre
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#d5dcc0]">
          Le montant se choisit sur la page de paiement. Il n&apos;y a pas de
          montant fixe.
        </p>

        {vzw.stripeUrl ? (
          <a
            href={vzw.stripeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#8b9a56] px-5 py-3 text-sm font-semibold text-[#0c1914] transition duration-200 hover:bg-[#a3b56a]"
          >
            Donner le montant de votre choix
          </a>
        ) : null}

        {payconiqReady ? (
          <a
            href={vzw.payconiqUrl}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#243528] px-5 py-3 text-sm font-semibold text-[#f3f5e8] transition duration-200 hover:bg-[#2f3a22] sm:hidden"
          >
            Ouvrir Payconiq
          </a>
        ) : null}

        <QrBlock
          src={vzw.payconiqQrSrc}
          title="QR Payconiq"
          text="Sur ordinateur, scannez le code avec votre téléphone. Sur mobile, le bouton ouvre Payconiq directement."
          pending={!vzw.payconiqQrSrc}
        />
      </article>
    </div>
  );
}

function CopyButton({
  copied,
  label,
  copiedLabel,
  onClick,
}: {
  copied: boolean;
  label: string;
  copiedLabel: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-3 text-sm font-semibold transition duration-200 ${
        copied
          ? "border-[#8b9a56] bg-[#8b9a56] text-[#0c1914]"
          : "border-[#8b9a56]/40 text-[#f3f5e8] hover:border-[#d5e09a] hover:text-[#d5e09a]"
      }`}
    >
      {copied ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <Copy className="size-4" aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}

function QrBlock({
  src,
  title,
  text,
  pending = false,
}: {
  src: string;
  title: string;
  text: string;
  pending?: boolean;
}) {
  return (
    <div className="mt-6 flex gap-4 rounded-2xl bg-[#0c1914]/50 p-4">
      {src ? (
        <img
          src={src}
          alt={title}
          className="size-28 shrink-0 rounded-xl bg-[#f3f5e8] object-contain"
        />
      ) : (
        <div
          className="flex size-28 shrink-0 flex-col items-center justify-center gap-2 rounded-xl bg-[#0c1914] text-center text-[#d5e09a]"
          aria-hidden={pending}
        >
          <QrCode className="size-8" />
          <span className="px-2 text-[11px] font-semibold leading-tight text-[#c5d0b0]">
            {title}
          </span>
        </div>
      )}
      <div>
        <p className="text-sm font-semibold text-[#f3f5e8]">{title}</p>
        <p className="mt-1 text-sm leading-6 text-[#d5dcc0]">{text}</p>
      </div>
    </div>
  );
}

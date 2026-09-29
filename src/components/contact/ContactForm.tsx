"use client";

import { FormEvent, useState } from "react";
import { vzw } from "@/config/vzwData";

export function ContactForm() {
  const [notice, setNotice] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Message de ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);

    window.location.href = `mailto:${vzw.email}?subject=${subject}&body=${body}`;
    setNotice("Votre application mail s'ouvre avec ce message.");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
      <label className="block text-sm font-medium text-[#f3f5e8]">
        Nom
        <input
          name="name"
          required
          autoComplete="name"
          className="mt-1.5 w-full rounded-xl border border-[#8b9a56]/40 bg-[#15261e] px-3 py-3 text-[#f3f5e8] outline-none transition focus:border-[#8b9a56] "
        />
      </label>
      <label className="block text-sm font-medium text-[#f3f5e8]">
        E-mail
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1.5 w-full rounded-xl border border-[#8b9a56]/40 bg-[#15261e] px-3 py-3 text-[#f3f5e8] outline-none transition focus:border-[#8b9a56] "
        />
      </label>
      <label className="block text-sm font-medium text-[#f3f5e8]">
        Message
        <textarea
          name="message"
          required
          rows={6}
          className="mt-1.5 w-full resize-y rounded-xl border border-[#8b9a56]/40 bg-[#15261e] px-3 py-3 text-[#f3f5e8] outline-none transition focus:border-[#8b9a56] "
        />
      </label>
      <button
        type="submit"
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#8b9a56] px-5 py-3 text-sm font-semibold text-[#0c1914] transition duration-200 hover:bg-[#a3b56a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d5e09a]"
      >
        Envoyer
      </button>
      {notice ? (
        <p role="status" className="text-sm text-[#d5e09a]">
          {notice}
        </p>
      ) : null}
    </form>
  );
}

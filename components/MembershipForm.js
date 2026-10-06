"use client";

import { useState } from "react";

export default function MembershipForm({ config }) {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [message, setMessage] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/indmeldelse/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || config.errorMessage);
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err.message || config.errorMessage);
    }
  }

  if (status === "sent") {
    return (
      <div className="form-notice form-notice--ok" role="status">
        {config.successMessage}
      </div>
    );
  }

  return (
    <form className="member-form" onSubmit={onSubmit} noValidate={false}>
      <div className="field">
        <label htmlFor="navn">Navn <span className="req" aria-hidden="true">*</span></label>
        <input id="navn" name="navn" type="text" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="adresse">Adresse <span className="req" aria-hidden="true">*</span></label>
        <input id="adresse" name="adresse" type="text" autoComplete="street-address" required />
      </div>
      <div className="field-row">
        <div className="field field--short">
          <label htmlFor="postnr">Post nr. <span className="req" aria-hidden="true">*</span></label>
          <input id="postnr" name="postnr" type="text" inputMode="numeric" autoComplete="postal-code" required />
        </div>
        <div className="field">
          <label htmlFor="by">By <span className="req" aria-hidden="true">*</span></label>
          <input id="by" name="by" type="text" autoComplete="address-level2" required />
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="telefon">Tlf nr.</label>
          <input id="telefon" name="telefon" type="tel" autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="email">E-mail <span className="req" aria-hidden="true">*</span></label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>

      <fieldset className="field">
        <legend>Jeg ønsker at støtte som: <span className="req" aria-hidden="true">*</span></legend>
        <div className="radio-group">
          {config.membershipTypes.map((t, i) => (
            <label key={t.value} className="radio">
              <input type="radio" name="medlemstype" value={t.value} required defaultChecked={i === 0} />
              <span className="radio__label">{t.label}</span>
              <span className="radio__price">{t.price}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Spam trap: humans don't see or fill this */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Lad dette felt være tomt</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <div className="form-notice form-notice--error" role="alert">
          {message}
        </div>
      )}

      <button className="btn btn-solid" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sender…" : "Send indmeldelse"}
      </button>
      <p className="form-note">Felter markeret med * skal udfyldes.</p>
    </form>
  );
}

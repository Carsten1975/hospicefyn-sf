import nodemailer from "nodemailer";
import { getJson, getSite } from "@/lib/content";

export const runtime = "nodejs";

const REQUIRED = ["navn", "adresse", "postnr", "by", "email", "medlemstype"];

function clean(v) {
  return String(v ?? "").trim().slice(0, 300);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Ugyldig forespørgsel." }, { status: 400 });
  }

  // Spam trap filled in -> pretend success, send nothing
  if (clean(body.website)) {
    return Response.json({ ok: true });
  }

  const data = Object.fromEntries(
    ["navn", "adresse", "postnr", "by", "telefon", "email", "medlemstype"].map((k) => [k, clean(body[k])])
  );

  const missing = REQUIRED.filter((k) => !data[k]);
  if (missing.length) {
    return Response.json({ error: "Udfyld venligst alle felter markeret med *." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return Response.json({ error: "E-mailadressen ser ikke ud til at være gyldig." }, { status: 400 });
  }
  const types = getJson("indmeldelse").membershipTypes;
  const type = types.find((t) => t.value === data.medlemstype);
  if (!type) {
    return Response.json({ error: "Vælg venligst en medlemstype." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("Indmeldelse: SMTP environment variables are not set.");
    return Response.json(
      { error: "Formularen er ikke sat op til at sende e-mail endnu. Skriv venligst til " + getSite().email + "." },
      { status: 500 }
    );
  }

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const to = MAIL_TO || getSite().email;
  const from = MAIL_FROM || SMTP_USER;

  const lines = [
    `Navn: ${data.navn}`,
    `Adresse: ${data.adresse}`,
    `Post nr. og by: ${data.postnr} ${data.by}`,
    `Tlf nr.: ${data.telefon || "-"}`,
    `E-mail: ${data.email}`,
    `Støtter som: ${type.label} (${type.price})`,
  ];

  try {
    await transporter.sendMail({
      from: `"Hjemmesiden – indmeldelse" <${from}>`,
      to,
      replyTo: data.email,
      subject: `Ny indmeldelse: ${data.navn} (${type.label})`,
      text: `Ny indmeldelse fra hjemmesiden:\n\n${lines.join("\n")}\n`,
    });
  } catch (err) {
    console.error("Indmeldelse: could not send mail", err);
    return Response.json({ error: getJson("indmeldelse").errorMessage }, { status: 502 });
  }

  return Response.json({ ok: true });
}

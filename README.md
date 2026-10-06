# hospicefyn-sf.dk – Next.js version

A rebuild of the WordPress site as a small Next.js site, made to be hosted on Vercel.
Same pages and same URLs as before:

| Page | URL |
|---|---|
| Forside | `/` |
| Indmeldelse (with form) | `/indmeldelse/` |
| Organisationen | `/organisationen/` |
| Vedtægter | `/vedtaegter/` |
| Generalforsamling & referater | `/generalforsamling-referater/` |
| Cookiepolitik | `/cookiepolitik/` |

---

## 1. Add your images and PDFs

All images and PDFs live in `public/wp-content/uploads/`, using **exactly the same
folders and file names as on the WordPress site**. Old links to PDFs (in emails,
Google, etc.) therefore keep working.

1. Download the `wp-content/uploads` folder from your current web host (via FTP or
   the host's file manager).
2. Copy its contents into `public/wp-content/uploads/` in this project, and say
   "yes, replace" when asked. The grey "Billede mangler" placeholders are then
   overwritten by the real images.
3. Add the three large background photos to `public/images/` with these names
   (or change the paths under `backgrounds` in `content/site.json`):

   | File | Used for |
   |---|---|
   | `baggrund-lys.jpg` | The candles photo at the top of the front page (and, for now, the top of all other pages) |
   | `baggrund-haender.jpg` | The hands photo behind "Tilskud & støtte" |
   | `baggrund-hospice.jpg` | The hospice building behind "Gør en forskel i dag" |

   If the other pages have their own top photos on the old site, add them to
   `public/images/` too and set each page's path under `backgrounds` in
   `content/site.json`.

4. Check that nothing is missing:

   ```
   npm install
   npm run check-files
   ```

   It lists any file the site links to that is still missing or still a placeholder.

> You can delete everything in the uploads folder the site doesn't use (old image
> sizes like `-300x200.jpg` etc.) to keep the project small, but it does no harm to
> leave them.

---

## 2. Put it on Vercel

1. Create a free account on [github.com](https://github.com) and a new **private**
   repository, e.g. `hospicefyn-sf`.
2. Upload this folder to it (on the repository page: *Add file → Upload files*, drag
   in everything **except** `node_modules` and `.next` if they exist).
3. Log in to [vercel.com](https://vercel.com) with your GitHub account →
   *Add New → Project* → choose the repository → *Deploy*. Vercel detects Next.js
   automatically; no settings need changing.
4. Set up the form's e-mail (section 3), then *Deployments → Redeploy*.
5. Test the site on the `…vercel.app` address Vercel gives you.
6. When you're happy: *Settings → Domains* → add `hospicefyn-sf.dk` and
   `www.hospicefyn-sf.dk`. Vercel shows which DNS records to set at the place you
   bought the domain. **Only change the A / CNAME records for the website – leave the
   MX (e-mail) records alone**, so `sekretariat@hospicefyn-sf.dk` keeps working.

---

## 3. The membership form (Indmeldelse)

When someone submits the form, the site sends an e-mail with their details to the
secretariat. It sends through an ordinary e-mail account (SMTP) – the easiest is to
use the `sekretariat@hospicefyn-sf.dk` mailbox itself.

In Vercel: *Project → Settings → Environment Variables*, add:

| Name | Value | Example |
|---|---|---|
| `SMTP_HOST` | Your mail provider's outgoing server | `send.one.com`, `asmtp.simply.com`, `smtp.office365.com` |
| `SMTP_PORT` | Usually `465` (or `587`) | `465` |
| `SMTP_USER` | The mailbox's login | `sekretariat@hospicefyn-sf.dk` |
| `SMTP_PASS` | The mailbox's password | |
| `MAIL_TO` | *(optional)* Where submissions go. Default: the site e-mail | `sekretariat@hospicefyn-sf.dk` |
| `MAIL_FROM` | *(optional)* Sender address. Default: `SMTP_USER` | |

Your mail provider's help pages list the SMTP server and port ("udgående server").
After adding the variables, redeploy and send a test registration.

The e-mail's *Reply-To* is the new member's address, so you can answer them directly.
Spam is filtered with a hidden "honeypot" field (like the old form).

---

## 4. Updating content (the 4–5 times a year)

All text is in the **`content/`** folder. You can edit the files directly on
github.com (open the file → pencil icon → *Commit changes*). Vercel publishes the
change automatically within about a minute.

| What you want to change | File |
|---|---|
| New newsletter / new notice on the front page, menu, front-page buttons, "tilskud & støtte" boxes, footer | `content/site.json` |
| Add a new notice or minutes to *Generalforsamling & referater* | `content/generalforsamling.json` |
| Board members (names, roles, addresses, phone, photo) | `content/organisationen.json` |
| Membership prices and form texts | `content/indmeldelse.json` |
| Front page welcome text | `content/forside.md` |
| Vedtægter | `content/vedtaegter.md` |
| Cookiepolitik | `content/cookiepolitik.md` |
| Gallery photos | `content/galleri.json` |

### Example: new minutes after the general assembly

1. Upload the PDF to `public/wp-content/uploads/2027/` (on GitHub: open that
   folder → *Add file → Upload files*; you can type `2027/` to create the folder).
2. In `content/generalforsamling.json`, add a line at the top of the list:

   ```json
   { "label": "Referat af generalforsamling 27. april 2027", "file": "/wp-content/uploads/2027/referat-2027.pdf" },
   ```

   Every line except the last one ends with a comma.

### Example: new newsletter

Upload the PDF, then in `content/site.json` change the file path in **three**
places: `newsletter`, the "Nyhedsbrev" item in `menu`, and the "Nyhedsbrev" item in
`frontpageButtons`.

### Markdown (`.md` files) in short

- `**bold text**`
- A line starting with `- ` is a bullet; `1. ` is a numbered list
- `### Heading`
- `[link text](/wp-content/uploads/file.pdf)`
- An empty line starts a new paragraph

### JSON (`.json` files) in short

Text goes in "double quotes", items are separated by commas, and there must be no
comma after the last item in a list. If Vercel's build fails after an edit, it is
almost always a missing or extra comma – Vercel keeps showing the previous version
until it is fixed.

---

## 5. Colors and fonts

All colors are at the top of `app/globals.css` (`--color-accent` is the yellow).
Fonts are Montserrat (headings) and Raleway (text), served from the site itself –
no Google Fonts calls, so no cookie/GDPR banner is needed.

## For developers

```
npm install
npm run dev      # http://localhost:3000
npm run build
```

Next.js (App Router), plain JavaScript and CSS. Content is read from `content/` at
build time; the only server code is `app/api/indmeldelse/route.js` (nodemailer).

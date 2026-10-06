// Lists every image/PDF the site links to, and tells you which ones are
// missing or still a placeholder. Run with:  npm run check-files
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const pub = path.join(root, "public");
const placeholders = JSON.parse(fs.readFileSync(path.join(root, "scripts/placeholders.json"), "utf8"));

// Collect every "/wp-content/uploads/..." path mentioned in the content folder
const refs = new Set();
for (const f of fs.readdirSync(path.join(root, "content"))) {
  const text = fs.readFileSync(path.join(root, "content", f), "utf8");
  for (const m of text.matchAll(/\/(?:wp-content\/uploads|images)\/[^"')\s]+/g)) refs.add(m[0]);
}
refs.add("/wp-content/uploads/2023/07/cropped-favicon-1-270x270.png");

const missing = [];
const placeholder = [];
for (const ref of [...refs].sort()) {
  const file = path.join(pub, decodeURI(ref));
  if (!fs.existsSync(file)) { missing.push(ref); continue; }
  const hash = crypto.createHash("md5").update(fs.readFileSync(file)).digest("hex");
  if (placeholders[ref] === hash) placeholder.push(ref);
}

console.log(`\nFiles referenced by the site: ${refs.size}\n`);
if (missing.length) {
  console.log(`MISSING (${missing.length}) – links to these will show "not found":`);
  missing.forEach((r) => console.log("  public" + r));
}
if (placeholder.length) {
  console.log(`\nSTILL PLACEHOLDER (${placeholder.length}) – replace with the real image:`);
  placeholder.forEach((r) => console.log("  public" + r));
}
if (!missing.length && !placeholder.length) console.log("All files are in place. ✔");
console.log("");

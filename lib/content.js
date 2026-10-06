import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getJson(name) {
  const file = path.join(CONTENT_DIR, `${name}.json`);
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function getSite() {
  return getJson("site");
}

/** Reads content/<name>.md and returns { data, html } */
export function getMarkdown(name) {
  const file = path.join(CONTENT_DIR, `${name}.md`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { data, html: marked.parse(content) };
}

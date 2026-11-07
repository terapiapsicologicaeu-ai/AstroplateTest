// Sync public/data/taxonomy.json with the categories/tags actually used in
// blog posts. Existing values managed from the CMS “Tassonomie” page are kept.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const blogDir = path.resolve(process.cwd(), "src/content/blog");
const taxonomyPath = path.resolve(process.cwd(), "public/data/taxonomy.json");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(md|mdx)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

const categories = new Set();
const tags = new Set();

for (const file of walk(blogDir)) {
  const { data } = matter(fs.readFileSync(file, "utf8"));
  for (const value of data.categories || []) {
    if (typeof value === "string" && value.trim()) categories.add(value.trim());
  }
  for (const value of data.tags || []) {
    if (typeof value === "string" && value.trim()) tags.add(value.trim());
  }
}

let existing = { categories: [], tags: [] };
try {
  existing = JSON.parse(fs.readFileSync(taxonomyPath, "utf8"));
} catch {
  // File missing or invalid: rebuild from content only.
}

for (const value of existing.categories || []) {
  if (typeof value === "string" && value.trim()) categories.add(value.trim());
}
for (const value of existing.tags || []) {
  if (typeof value === "string" && value.trim()) tags.add(value.trim());
}

const output = {
  categories: [...categories].sort((a, b) => a.localeCompare(b, "it")),
  tags: [...tags].sort((a, b) => a.localeCompare(b, "it")),
};

fs.mkdirSync(path.dirname(taxonomyPath), { recursive: true });
fs.writeFileSync(taxonomyPath, `${JSON.stringify(output, null, 2)}\n`);

console.log(
  `Taxonomy synced: ${output.categories.length} categories, ${output.tags.length} tags.`,
);

import fs from "node:fs";
import path from "node:path";
import { parse } from "node-html-parser";

const distDir = path.resolve(process.cwd(), "dist");
const configPath = path.resolve(process.cwd(), "src/config/config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const basePath = (config.site?.base_path || "/").replace(/\/+$/, "");

function walkHtml(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function candidateExists(resolvedPath) {
  const rel = resolvedPath.replace(/^\/+/, "");
  const asFile = path.join(distDir, rel);
  const asIndex = path.join(distDir, rel, "index.html");
  const asHtml = path.join(distDir, rel + ".html");
  return fs.existsSync(asFile) || fs.existsSync(asIndex) || fs.existsSync(asHtml);
}

const htmlFiles = walkHtml(distDir);
const broken = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const root = parse(html);
  const pageRel = path
    .relative(distDir, file)
    .replace(/\\/g, "/")
    .replace(/index\.html$/, "");
  const pageUrl = "/" + pageRel.replace(/\/$/, "");

  for (const a of root.querySelectorAll("a")) {
    const href = a.getAttribute("href");
    if (!href) continue;
    if (/^(https?:|mailto:|tel:|javascript:|data:|#)/i.test(href)) continue;

    let url;
    try {
      url = new URL(href, "http://local" + (pageUrl.endsWith("/") ? pageUrl : pageUrl + "/"));
    } catch {
      continue;
    }

    let pathname = decodeURIComponent(url.pathname);
    if (basePath && basePath !== "/" && pathname.startsWith(basePath)) {
      pathname = pathname.slice(basePath.length) || "/";
    }

    if (!pathname.startsWith("/")) pathname = "/" + pathname;
    if (pathname === "/" ) {
      // root exists
    } else if (!candidateExists(pathname)) {
      broken.push({ file: path.relative(process.cwd(), file), href, resolved: pathname });
    }
  }
}

if (broken.length === 0) {
  console.log("✅ Link check passed: no broken internal links.");
  process.exit(0);
} else {
  console.error("❌ Broken internal links found:");
  for (const b of broken) {
    console.error(`  ${b.file}: ${b.href}  (resolved: ${b.resolved})`);
  }
  process.exit(1);
}
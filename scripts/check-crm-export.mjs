import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? "apps/crm/out");
const expected = [
  "index.html",
  "bookings/index.html",
  "employees/index.html",
  "customers/index.html",
  "services/index.html",
  "payments/index.html",
  "audit/index.html",
  "settings/index.html",
];

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/^\/|\/$/g, "");
const allowedExternalHosts = new Set([
  "fonts.googleapis.com",
  "fonts.gstatic.com",
]);
const errors = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const found = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...await walk(full));
    else found.push(full);
  }

  return found;
}

try {
  const files = await walk(root);
  const relativeFiles = files.map(file =>
    path.relative(root, file).split(path.sep).join("/")
  );

  for (const route of expected) {
    if (!relativeFiles.includes(route)) {
      errors.push("Missing exported route: " + route);
    }
  }

  if (!relativeFiles.includes("404.html")) {
    errors.push("Missing 404.html");
  }

  if (relativeFiles.some(file => file.endsWith(".map"))) {
    errors.push("Source map file found in export");
  }

  const checkedFiles = files.filter(file => /\.(html|css)$/i.test(file));

  for (const file of checkedFiles) {
    const content = await readFile(file, "utf8");
    const relative = path.relative(root, file);

    if (file.endsWith(".html") && !content.includes("DEMO DATA")) {
      errors.push("DEMO DATA banner missing: " + relative);
    }

    if (/https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?(?:\/|["'\s]|$)/i.test(content)) {
      errors.push("Localhost reference found: " + relative);
    }

    for (const match of content.matchAll(/https?:\/\/([^/"'\s)]+)/gi)) {
      const host = match[1].split(":")[0].toLowerCase();

      if (!allowedExternalHosts.has(host)) {
        errors.push("External host not allow-listed (" + host + "): " + relative);
      }
    }

    if (basePath && file.endsWith(".html")) {
      for (const match of content.matchAll(/(?:src|href)="(\/[^"]+)"/g)) {
        const asset = match[1];

        if (
          !asset.startsWith("/" + basePath + "/") &&
          asset !== "/" + basePath &&
          !asset.startsWith("/#")
        ) {
          errors.push(
            "Absolute HTML path is missing repository base path: " +
            asset + " in " + relative
          );
        }
      }
    }
  }

  const sizes = await Promise.all(
    files.map(async file => (await stat(file)).size)
  );

  const bytes = sizes.reduce((total, size) => total + size, 0);

  console.log("Export files: " + files.length);
  console.log("Export size: " + (bytes / 1024 / 1024).toFixed(2) + " MiB");

  if (bytes > 15 * 1024 * 1024) {
    errors.push("Export exceeds 15 MiB budget");
  }
} catch (error) {
  errors.push("Cannot inspect export at " + root + ": " + error.message);
}

if (errors.length) {
  console.error("CRM export validation failed:");
  for (const error of errors) console.error("- " + error);
  process.exitCode = 1;
} else {
  console.log("CRM static export validation passed.");
}

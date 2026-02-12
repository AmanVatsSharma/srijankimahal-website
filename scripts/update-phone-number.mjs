/**
 * @file update-phone-number.mjs
 * @module astro-scripts
 * @description Safely update the Astro site mobile number everywhere.
 * @author BharatERP
 * @created 2026-02-12
 *
 * Usage:
 *   node scripts/update-phone-number.mjs --new 8936059096 --dry-run
 *   node scripts/update-phone-number.mjs --new 8936059096
 *
 * Notes:
 * - Reads the current `MOBILE_NUMBER` from `src/lib/constants.ts` (source-of-truth).
 * - Replaces ONLY the old 10-digit number across Astro text files.
 * - Scopes to: `src/`, `public/`, `docs/` (inside the Astro project only).
 * - Excludes: node_modules/, dist/, .astro/, .git/
 */
import fs from "node:fs/promises";
import path from "node:path";

const PROJECT_ROOT = path.resolve(process.cwd());
const CONSTANTS_PATH = path.join(PROJECT_ROOT, "src", "lib", "constants.ts");

const DEFAULT_TARGET_DIRS = ["src", "public", "docs"];
const TEXT_EXTENSIONS = new Set([
  ".astro",
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".txt",
  ".yaml",
  ".yml",
]);

const EXCLUDED_DIR_NAMES = new Set(["node_modules", "dist", ".astro", ".git"]);

function parseArgs(argv) {
  const args = {
    newNumber: "",
    dryRun: false,
    dirs: [...DEFAULT_TARGET_DIRS],
  };

  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--dry-run") {
      args.dryRun = true;
      continue;
    }
    if (a === "--new") {
      args.newNumber = String(argv[i + 1] ?? "");
      i += 1;
      continue;
    }
    if (a.startsWith("--new=")) {
      args.newNumber = a.slice("--new=".length);
      continue;
    }
    if (a === "--dirs") {
      const value = String(argv[i + 1] ?? "");
      args.dirs = value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      i += 1;
      continue;
    }
    if (a.startsWith("--dirs=")) {
      const value = a.slice("--dirs=".length);
      args.dirs = value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      continue;
    }
  }

  return args;
}

function assertTenDigitMobileNumber(value) {
  if (!/^\d{10}$/.test(value)) {
    throw new Error(
      `Invalid --new mobile number "${value}". Expected exactly 10 digits (example: 8936059096).`,
    );
  }
}

async function readOldNumberFromConstants() {
  const content = await fs.readFile(CONSTANTS_PATH, "utf8");
  const match = content.match(/MOBILE_NUMBER\s*=\s*['"](\d{10})['"]/);
  if (!match) {
    throw new Error(
      `Could not find MOBILE_NUMBER in ${CONSTANTS_PATH}. Expected pattern like: export const MOBILE_NUMBER = '1234567890';`,
    );
  }
  return match[1];
}

async function* walkFiles(dirAbs) {
  const entries = await fs.readdir(dirAbs, { withFileTypes: true });
  for (const entry of entries) {
    if (EXCLUDED_DIR_NAMES.has(entry.name)) continue;

    const abs = path.join(dirAbs, entry.name);
    if (entry.isDirectory()) {
      yield* walkFiles(abs);
      continue;
    }
    if (!entry.isFile()) continue;

    const ext = path.extname(entry.name).toLowerCase();
    if (!TEXT_EXTENSIONS.has(ext)) continue;

    yield abs;
  }
}

async function updateFile({ fileAbs, oldNumber, newNumber, dryRun }) {
  const original = await fs.readFile(fileAbs, "utf8");
  if (!original.includes(oldNumber)) return { changed: false, replacements: 0 };

  const updated = original.split(oldNumber).join(newNumber);
  if (updated === original) return { changed: false, replacements: 0 };

  const replacements = (original.match(new RegExp(oldNumber, "g")) || []).length;

  if (!dryRun) {
    await fs.writeFile(fileAbs, updated, "utf8");
  }

  return { changed: true, replacements };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.newNumber) {
    throw new Error(`Missing --new. Example: node scripts/update-phone-number.mjs --new 8936059096`);
  }

  assertTenDigitMobileNumber(args.newNumber);

  const oldNumber = await readOldNumberFromConstants();
  const newNumber = args.newNumber;

  if (oldNumber === newNumber) {
    console.log(`No-op: MOBILE_NUMBER is already ${newNumber}.`);
    return;
  }

  const targetDirsAbs = args.dirs.map((d) => path.join(PROJECT_ROOT, d));

  let changedFiles = 0;
  let totalReplacements = 0;
  const changedPaths = [];

  for (const dirAbs of targetDirsAbs) {
    try {
      const stat = await fs.stat(dirAbs);
      if (!stat.isDirectory()) continue;
    } catch {
      // Directory doesn't exist (e.g., docs/ might be missing) — skip.
      continue;
    }

    for await (const fileAbs of walkFiles(dirAbs)) {
      const res = await updateFile({
        fileAbs,
        oldNumber,
        newNumber,
        dryRun: args.dryRun,
      });

      if (res.changed) {
        changedFiles += 1;
        totalReplacements += res.replacements;
        changedPaths.push(path.relative(PROJECT_ROOT, fileAbs));
      }
    }
  }

  console.log(
    `${args.dryRun ? "[DRY-RUN] " : ""}Updated phone number ${oldNumber} -> ${newNumber}`,
  );
  console.log(`Files changed: ${changedFiles}`);
  console.log(`Total replacements: ${totalReplacements}`);

  if (changedPaths.length) {
    console.log("Changed files:");
    for (const p of changedPaths) console.log(`- ${p}`);
  }
}

await main();

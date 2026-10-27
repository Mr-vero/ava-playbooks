// Builds index.json from playbooks/*.json. Ava reads the index to list the
// library, and checks each download against its sha256.
//
//   node scripts/build-index.mjs           write index.json
//   node scripts/build-index.mjs --check   fail if index.json is out of date (CI)
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";

const files = readdirSync("playbooks").filter((f) => f.endsWith(".json")).sort();
const playbooks = files.map((f) => {
  const raw = readFileSync(`playbooks/${f}`);
  const p = JSON.parse(raw);
  if (p.id !== f.replace(/\.json$/, "")) throw new Error(`${f}: "id" must match the file name`);
  return {
    id: p.id, name: p.name, category: p.category || "", tagline: p.tagline || "", accent: p.accent || null, url: p.url || null,
    steps: p.journey.length, facts: (p.knowledge || []).length, journey: p.journey,
    file: `playbooks/${f}`, sha256: createHash("sha256").update(raw).digest("hex"), author: p.author || "Ava Engine",
  };
});
const index = JSON.stringify({ version: 1, playbooks }, null, 2) + "\n";
if (process.argv.includes("--check")) {
  if (!existsSync("index.json") || readFileSync("index.json", "utf8") !== index) {
    console.error("index.json is out of date. Run: node scripts/build-index.mjs");
    process.exit(1);
  }
  console.log(`index.json is up to date (${playbooks.length} playbooks).`);
} else {
  writeFileSync("index.json", index);
  console.log(`Wrote index.json (${playbooks.length} playbooks).`);
}

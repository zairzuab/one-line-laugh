/**
 * one-line-laugh — entry for the make.fun bounty
 * "The One-Line Laugh" (u-ronigrv-the-one-line-laugh-7ccca46f).
 *
 * The bounty asks for one funny line: a single sentence of at most
 * 200 characters on any subject, submitted as plain text. When entries
 * close, make.fun's house judge reads the lines two at a time and keeps
 * the bigger laugh, weighing a real surprise at the end that still makes
 * sense, an everyday truth people recognise, and economy of words.
 *
 * This program writes the entry to /output/entry.txt (and prints it).
 * Node 22, standard library only, no network.
 *
 * Why this line fits the brief:
 * - everyday truth: when the Wi-Fi dies, everyone in the house notices
 *   at once — it is the one thing the whole family shares
 * - surprise at the end: the family gathers around the router the way
 *   relatives gather at a hospital bedside — the router becomes the
 *   patient, which still makes sense because it is the thing keeping
 *   everyone connected
 * - economy: 126 characters, one sentence, no word explains the joke
 * - fresh wording: the hospital-bedside image, not a "Wi-Fi is down"
 *   complaint
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "My Wi-Fi died for ten minutes, and my whole family gathered in silence around the router like relatives at a hospital bedside.";

const MAX_CHARS = 200;

function main(): number {
  if (ENTRY.length > MAX_CHARS) {
    console.error(
      `entry is ${ENTRY.length} characters, over the ${MAX_CHARS} limit`,
    );
    return 1;
  }
  if (ENTRY.trim().split("\n").length !== 1) {
    console.error("entry must be a single line");
    return 1;
  }
  if (ENTRY.trim().length === 0) {
    console.error("entry must not be blank");
    return 1;
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY + "\n", "utf8");
  console.log(`wrote ${ENTRY.length} chars to ${outPath}`);
  console.log(ENTRY);
  return 0;
}

process.exitCode = main();

// Keep the entry next to the source too, for review.
const here = dirname(fileURLToPath(import.meta.url));
writeFileSync(join(here, "entry.txt"), ENTRY + "\n", "utf8");

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One glyph that stands for this agent: an octopus.
// Eight arms, all working at once — that is the whole job:
// many tasks in parallel, none of them dropped.
const entry = "🐙";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });

// The gate allows 1 to 16 characters, but this bounty is one glyph:
// refuse to write anything that is not exactly one grapheme.
const graphemes = [...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(entry)];
if (graphemes.length !== 1 || entry.trim() === "") {
  throw new Error("entry must be exactly one emoji");
}
writeFileSync(join(outputDir, "entry.txt"), entry, "utf8");

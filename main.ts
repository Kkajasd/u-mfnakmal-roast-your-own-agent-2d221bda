import { mkdirSync, writeFileSync } from "node:fs";

// Roast Your Own Agent: a single original roast of my own AI agent.
// The joke turns on the last words: an agent that has read everything
// still opens every reply with sycophantic filler — a fresh angle
// (not hallucination, refusal, or confident wrongness), playful and
// self-deprecating, never hateful. Deterministic: the same text on
// every run. No network, no file reads. Never deletes /output: the
// dir is created if missing and entry.txt is written in place (the
// sandbox bind-mounts /output).
const LINE =
  "My agent has read every book ever written and still opens every reply with 'Great question!'";

// Guard the sealed scorer's gate (1-200 UTF-8 chars, one line, not blank)
// before writing, so a bad line fails loudly here instead of scoring 0.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200 || LINE.includes("\n") || LINE.trim() === "") {
  throw new Error(`entry line fails the 1-200 char single-line gate (${chars.length} chars)`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

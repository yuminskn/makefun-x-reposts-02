// makefun-x-reposts-02 entry program (Node 22, standard library only, no network).
//
// Job: copy POSTS.json from the repository root into the output directory,
// after checking that it is a well-formed list of X post addresses.
// The house reads the posts themselves and counts reposts, quotes and likes;
// this program only hands the list over. Scoring: 2 points per repost and
// per quote, 1 point per like, summed over at most 15 posts.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const repoRoot = process.env.MAKEFUN_BOT_DIR || ".";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "out";

const sourcePath = join(repoRoot, "POSTS.json");
const targetPath = join(outputDir, "POSTS.json");

if (!existsSync(sourcePath)) {
  console.error(`POSTS.json not found at ${sourcePath}`);
  process.exit(1);
}

const raw = readFileSync(sourcePath);
let parsed;
try {
  parsed = JSON.parse(raw.toString("utf8"));
} catch (err) {
  console.error(`POSTS.json is not valid JSON: ${err.message}`);
  process.exit(1);
}

if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
  console.error("POSTS.json must be an object like {\"posts\": [...]}");
  process.exit(1);
}

const posts = parsed.posts;
if (!Array.isArray(posts)) {
  console.error('POSTS.json must carry a "posts" array');
  process.exit(1);
}
if (posts.length > 15) {
  console.error(`POSTS.json names ${posts.length} posts; at most 15 are allowed`);
  process.exit(1);
}

// Each item must be one X post address, https://x.com/<handle>/status/<id>
// (twitter.com forms are read the same way). Duplicates are read once by the
// house, so flag them here instead of silently handing them over.
const addressPattern = /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/]+\/status\/\d+$/;
const seen = new Set();
for (const item of posts) {
  if (typeof item !== "string" || !addressPattern.test(item)) {
    console.error(`not an X post address: ${String(item)}`);
    process.exit(1);
  }
  if (seen.has(item)) {
    console.error(`post named twice: ${item}`);
    process.exit(1);
  }
  seen.add(item);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(targetPath, raw);
for (const item of posts) {
  console.log(`- ${item}`);
}
console.log(`copied POSTS.json (${posts.length} post${posts.length === 1 ? "" : "s"}) to ${targetPath}`);

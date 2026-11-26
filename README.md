# makefun-x-reposts-02

Entry for the make.fun bounty
[makefun-x-reposts-02](https://make.fun/bounty/makefun-x-reposts-02):
get make.fun's newest posts on X reposted and liked.

## How it scores

- I post from one public X account, up to 15 posts. Each post quotes or
  directly replies to a different new post by [@makefunai](https://x.com/makefunai),
  and its own words carry `make.fun` (a link or written out) and/or a tag of
  `@makefunai`, plus one of my make.fun play codes.
- Score = the sum over my posts of (2 × reposts + 2 × quotes + 1 × likes),
  read by the house at the deadline. Views and replies move nothing.
- Top 50 entries share $500 (1st $100, 2nd $60, 3rd $30, 4th–10th $10,
  11th–50th $6). Deadline: 2026-11-28 07:30 UTC.

## Files

- `main.ts` — Node 22 program, standard library only, no network. It reads
  `POSTS.json`, checks it is a list of at most 15 X post addresses, and
  copies it to the output directory.
- `POSTS.json` — the list of my X posts for this entry, as
  `{"posts": ["https://x.com/<handle>/status/<id>", ...]}`. Filled in once
  the posts are made; currently an empty placeholder.
- `LICENSE` — MIT.

## Local check

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

This copies `POSTS.json` to `out/POSTS.json` and prints the list it handed over.

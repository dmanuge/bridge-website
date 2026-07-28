# Bridge — Home Page Design Experiments

Creative concepts for the new Bridge homepage. The viewer at `index.html` lets you flip through every concept (V1, V2, V3, ...) with left/right arrows that stay on top of the designs. Keyboard arrow keys work too, and `#v3` in the URL deep-links to a specific version.

## Viewing

Once GitHub Pages is enabled for this repo (Settings → Pages → deploy from `main`, root), the viewer is served at the repo's Pages URL. Locally, run any static server from the repo root:

```bash
python3 -m http.server 8080
```

and open http://localhost:8080/.

To flip between the two full builds (V9 Funded Object vs V10 Two Doors), open `compare.html` and use the A/B header toggle (keys: A, B, or arrows).

`compare-standalone.html` is the same A/B comparison in a single self-contained file (both candidates, fonts, photography and logo inlined) for sharing outside the repo, e.g. by email or upload.

There are three copies of the comparison, all showing the same two candidates:

| File | What it is |
| --- | --- |
| `compare.html` | A/B toggle that loads V9 and V10 as iframes. Needs a local server; always reflects the current concept files. |
| `compare-standalone.html` | The same comparison inlined into one portable HTML document. No server, no `assets/` folder. |
| `compare-candidates.html` | The exact file published as the shared Claude artifact: https://claude.ai/code/artifact/cee43507-cde0-47c7-b35e-237a61523e02 |

The two pages being compared are `concepts/v9-funded-object-full.html` (Funded Object) and
`concepts/v10-two-doors-full.html` (Two Doors). They are generated from one shared below-hero
source, so the hero is the only difference between them.

## Adding your concept

1. Add a single self-contained HTML file to `concepts/` (inline your CSS/JS).
2. Reference shared images with relative paths, e.g. `../assets/stories/...`. Add new imagery under `assets/`.
3. Append one entry to `concepts.js`:

```js
{ file: "concepts/v7-your-name.html", title: "Your Concept", author: "You" }
```

Your concept becomes the next V number automatically. Please keep copy within the Bridge messaging guardrails: state Bridge's role accurately (Bridge Direct Lending vs. Financing Secured by Bridge), use only approved proof facts, no marketplace language, and add "subject to underwriting" wherever funding is implied.

## Current concepts

| Version | Title | Idea |
| --- | --- | --- |
| V1 | Funded Object | Rotating funded closings as the homepage centerpiece |
| V2 | Milestone | Path-gated type composition with staged reveal and hover scenes |
| V3 | Funded Object Frame | Rotating wins beside a still headline (1280 frame) |
| V4 | Proof Index | The ledger of real financings, up front |
| V5 | Milestone Line | Opportunity to funded, in three steps |
| V6 | Two Doors Frame | Hotel and consumer brand, side by side |
| V7 | Financing Concierge | Pick what you're financing; the proof follows (interactive) |
| V8 | Customer Documentary | One customer, one outcome, full frame |
| V9 | Funded Object Full Build | Full-scroll V1: hero deal, stat band, successes ledger, milestones, customer story, chips |
| V10 | Two Doors Full Build | Full-scroll V6: split doors hero with recent financings, shared proof system below |

## Explorations

`explorations/` holds the wider design studies behind the concepts (not registered in the viewer): the ten-direction homepage study (2026-07-24) and the style reference with the two full-build candidates (2026-07-27). Both are self-contained HTML; open directly in a browser.

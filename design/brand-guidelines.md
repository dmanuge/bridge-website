# Bridge production brand guidelines

## Source of truth

The production Two Doors homepage is the visual authority for Bridge. The
canonical, machine-checked implementation tokens live in
`src/styles/tokens.css`; this document explains how to use them.

The files at the repository root and under `concepts/` and `explorations/` are
design references, not production pages, and may intentionally use different
systems.

## Brand character

Bridge is editorial, assured, premium, and pragmatic. Use documentary imagery,
strict alignment, compact functional typography, and generous whitespace.
Interfaces should feel calm and specific rather than decorative or overtly
“fintech.”

## Typography

- Display: Source Serif 4 for page and section titles, financial figures, and
  quotations.
- Sans: DM Sans for body copy, navigation, labels, controls, and card titles.
- Use the shared `.display`, `.section-title`, `.eyebrow`, `.lede`, and
  `.disclosure` styles or the `PageHero` and `SectionHeading` components.
- Never declare a font family in a page or feature component.
- Keep body copy at 15–17px with a 1.45–1.6 line height. Labels use compact,
  tracked uppercase DM Sans. Do not use the display serif for functional UI.

## Color

Use semantic custom properties from `src/styles/tokens.css`, not literal color
values.

| Role | Token | Typical use |
|---|---|---|
| Page surface | `--surface-page` | Main ivory background |
| Raised surface | `--surface-raised` | Cards and controls |
| Soft surface | `--surface-soft` | Quiet section bands |
| Brand surface | `--surface-brand` | Dark proof, story, and footer areas |
| Action surface | `--surface-action` | Header and primary actions |
| Primary text | `--text-primary` | Main copy on light surfaces |
| Secondary text | `--text-secondary` | Supporting copy and metadata |
| Inverse text | `--text-inverse` | Primary copy on dark or image surfaces |
| Inverse muted | `--text-inverse-muted` | Dark-surface labels and metadata |
| Border | `--border-default` | Hairlines and cards |
| Focus | `--focus-ring` | Keyboard focus |

Royal blue is the production header and primary-action color. Navy anchors
proof, documentary, and footer surfaces. Gold is reserved for fine rules,
milestones, and status details. Image text always uses a named navy overlay.

## Layout and components

- Use `BaseLayout` for every user-facing route.
- Use `PageHero` for standard solid or image-backed page introductions.
- Use `SectionHeading` for every major section introduction.
- Use `Action` for links and buttons; choose `primary`, `light`, `outline`, or
  `text`.
- Use `ResponsiveImage` for production content imagery.
- Use the shared `surface-card` class for the base card border, radius, and
  background, adding only layout-specific styles locally.
- Reuse `ProofBand`, `ProcessSteps`, `ResultsLedger`, and `FinalCta`; do not
  reproduce them in page files.
- Use `--gutter`, `--container`, `--section-space`, and
  `--section-space-compact` for page rhythm.
- The standard radius is 8px; controls may use the 6px small radius. Shadows
  are exceptional and use `--shadow`.

The site header, navigation labels, mobile menu, footer, and “Get Started”
language are identical on every route. The fixed header is transparent at the
top of the page, then gains a deep-navy surface and subtle shadow after the user
scrolls. Keep its “Get Started” action compact so navigation remains primary.
Active navigation uses `aria-current`.

## Responsive and accessible behavior

- Layouts collapse to one column before content becomes cramped; do not rely on
  fixed content heights.
- Touch targets are at least 44px. The complete navigation remains available
  through the mobile menu.
- Maintain at least 4.5:1 contrast for body text.
- Preserve visible focus styles and reduced-motion behavior.
- Do not place inverse text over photography without a named overlay token.
- Status must always include a text label, not color alone.

## Adding a page

Start from `design/new-page-template.md`. A production page must use the shared
layout and primitives, contain no raw colors or literal font families, and pass
`npm run check:brand`. Add desktop and mobile browser coverage for any new page
family.

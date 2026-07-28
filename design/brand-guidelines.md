# BRIDGE visual brand guidelines

## Source and confidence
These guidelines are visually extracted from the supplied six-concept raster board. They are a practical reconstruction, not an official brand-standard document. Exact font files cannot be recovered from a flattened image; the font recommendations below are close visual matches.

## Brand character
**Editorial, assured, premium, and pragmatic.** The system combines institutional financial credibility with warm, documentary hospitality and founder imagery. The interface should feel calm, spacious, and specific rather than flashy or overtly “fintech.”

## Logo / wordmark
- Uppercase wordmark: **BRIDGE**
- Neutral grotesk sans serif, medium to semibold weight
- Tracking: approximately **0.12–0.16em**
- Use deep navy on light backgrounds and white on dark/photo backgrounds
- Keep clear space around the mark equal to at least the cap height of the “B”

## Typography
### Selected type family
- **Display and sans serif:** DM Sans is used throughout the system. Helvetica Neue or Arial can be fallbacks.

### Usage
- Hero H1: 56–72 px desktop, 0.96–1.05 line-height, medium/semibold
- Section H2: 36–48 px, 1.0–1.1 line-height
- Card title / large amount: 28–40 px serif
- Body: 15–17 px sans, 1.45–1.6 line-height
- Navigation / labels: 11–13 px sans, medium, restrained tracking
- Captions / metadata: 11–12 px sans
- Large proof-point numerals use the display serif; explanatory labels use the sans serif

## Core color palette
Colors below are sampled or reconstructed from the supplied board.

| Token | Hex | Use |
|---|---:|---|
| Deep Navy | **#04112A** | Primary dark surfaces, footers, photo overlays |
| Royal Blue | **#143B85** | Active state, primary action, progress indicator |
| Warm Ivory | **#F9F7F4** | Main page background |
| Pure White | **#FFFFFF** | Cards, reversed text, secondary buttons |
| Ink | **#10131C** | Primary text on light backgrounds |
| Slate | **#535760** | Secondary text and metadata |
| Stone | **#EEEAE5** | Soft panels and card fills |
| Hairline | **#D9D8D5** | Dividers, borders, inactive controls |
| Gold Accent | **#C9A24E** | Premium details, active milestones, status indicators, and fine rules |

### Color behavior
- Favor navy, ivory, and white as the dominant triad.
- Use royal blue for interaction and emphasis, not as a large decorative field.
- Keep gold to small premium details; do not use it as a large field or for body text.
- Dark photo sections should use a navy-to-transparent overlay so white text remains readable.

## Layout and spacing
- Desktop content width: approximately **1200–1280 px**
- Grid: **12 columns**, 24–32 px gutters
- Spacing system: **8 px base unit**
- Major section spacing: 72–120 px
- Card padding: 24–32 px
- Generous white space is a core part of the identity
- Alignment is strict and mostly left-led; centered alignment is reserved for proof points or milestone nodes

## Components
### Buttons
- Primary: deep navy or royal blue fill, white label, right arrow
- Secondary: white/ivory fill, 1 px navy border, navy label
- Text link: no container, navy label with right arrow
- Radius: **6–8 px**
- Height: approximately 44–48 px desktop

### Cards and tables
- Fine 1 px hairline borders
- White or stone backgrounds
- Minimal shadow; rely on border and tonal separation
- Table rows use compact spacing, clear numeric alignment, and thumbnail imagery
- Status labels remain plain-language and low-drama

### Progress / milestone UI
- Thin horizontal rule
- Circular nodes with simple line icons
- Active node uses royal blue; inactive nodes stay white/ivory with gray borders
- Labels are uppercase or semibold sans serif, with short explanatory text below

## Imagery
- Hospitality architecture at dusk or sunrise
- Warm interior renovation details
- Founders/operators in authentic work settings
- Documentary composition, controlled contrast, muted saturation, warm practical lighting
- Avoid generic corporate handshakes, overly bright stock photography, and glossy “tech” effects
- For text overlays, preserve negative space and apply dark navy gradients rather than opaque black boxes

## Iconography
- Simple monoline icons
- Approximately 1.5 px stroke at standard desktop scale
- Rounded joins/caps, minimal detail
- Icons support categories and process steps rather than decoration

## Accessibility notes
- Maintain at least 4.5:1 contrast for body text
- Do not place small white text directly over a bright image without an overlay
- Use text labels in addition to color for status
- Keep focus states visible in royal blue with adequate offset

## Recommended implementation fonts
```css
font-family: "DM Sans", "Helvetica Neue", Arial, sans-serif;
font-family: "DM Sans", "Helvetica Neue", Arial, sans-serif;
```

# New production page template

Use this structure for new Bridge pages:

```astro
---
import Action from "@/components/Action.astro";
import FinalCta from "@/components/FinalCta.astro";
import PageHero from "@/components/PageHero.astro";
import SectionHeading from "@/components/SectionHeading.astro";
import BaseLayout from "@/layouts/BaseLayout.astro";
---

<BaseLayout title="Page title" description="Unique page description.">
  <PageHero
    eyebrow="Category"
    title="Clear page promise."
    description="One concise explanation of the page."
  >
    <Fragment slot="actions">
      <Action href="/contact" variant="light" arrow>Get Started</Action>
    </Fragment>
  </PageHero>

  <section class="section">
    <div class="container">
      <SectionHeading
        eyebrow="Section label"
        title="Specific section title."
        description="Optional supporting copy."
      />
      <!-- Page-specific content -->
    </div>
  </section>

  <FinalCta source="page-name-closing" />
</BaseLayout>
```

Use tokens from `src/styles/tokens.css` for local layout styles. Do not add raw
colors, font declarations, duplicated button/heading styles, or page-specific
header and footer treatments. Add the route to the supporting-route and visual
browser tests.

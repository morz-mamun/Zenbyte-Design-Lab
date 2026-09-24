## Purpose

Guarantees that each Zenbyte design is served as a complete, faithful copy of its source branch under its own URL prefix, with nothing leaking between designs.

## ADDED Requirements

### Requirement: Each design is served under its own path prefix
The Main Design SHALL be served under `/main` and the Lenis Design under `/lenis`. Every route of the source branch SHALL be reachable at the same path under that prefix: home, blog index and posts, case studies index and detail, for-vendors, how-we-work, industries, start-a-project, robots and sitemap.

#### Scenario: Deep route in Main Design
- **WHEN** a visitor requests `/main/case-studies/<slug>` for a slug that exists in the `main` branch content
- **THEN** the case study detail page from the `main` branch renders

#### Scenario: Deep route in Lenis Design
- **WHEN** a visitor requests `/lenis/blog/<slug>` for a slug that exists in the `lenis-template` branch content
- **THEN** the blog post page from the `lenis-template` branch renders

#### Scenario: Unknown route inside a design
- **WHEN** a visitor requests `/lenis/does-not-exist`
- **THEN** the Lenis Design's own not-found page renders

#### Scenario: Legacy redirect is preserved per design
- **WHEN** a visitor requests `/main/services` or `/lenis/services`
- **THEN** they are redirected to `/main/how-we-work` or `/lenis/how-we-work` respectively

### Requirement: Designs render identically to their source branch
Each design SHALL render the same markup, styles, fonts, animations and interactions as its source branch at the snapshot commit. The only differences allowed are the path prefix and the added switch control.

#### Scenario: Lenis motion features work
- **WHEN** a visitor browses the Lenis Design
- **THEN** smooth scrolling, the intro loader, the custom cursor, the scroll-driven effects and the theme toggle with its water-drop sound all behave as on the `lenis-template` branch

#### Scenario: Main Design has no Lenis behavior
- **WHEN** a visitor browses the Main Design
- **THEN** no Lenis smooth scroll or `lenis-template` motion code is loaded on the page

### Requirement: Navigation stays within the current design
Every internal link, redirect, form submission and asset URL in a design SHALL resolve under that design's prefix. None of them SHALL resolve to a bare root path or to the other design.

#### Scenario: Header navigation
- **WHEN** a visitor on `/lenis` clicks the header link to How We Work
- **THEN** they land on `/lenis/how-we-work`

#### Scenario: Static assets load under the prefix
- **WHEN** a Lenis Design case study page loads its cover image, or the theme toggle plays its sound
- **THEN** the asset loads successfully from under `/lenis/`

#### Scenario: Start-a-project form
- **WHEN** a visitor submits the inquiry form on `/main/start-a-project`
- **THEN** the form submits and shows the same result as on the `main` branch

### Requirement: Designs do not share runtime state or styles
The designs SHALL NOT share stylesheets, client-side JavaScript bundles or client-side routing. Browser-stored state written by one design SHALL NOT change how the other design renders.

#### Scenario: Lenis light theme does not leak into Main
- **WHEN** a visitor sets the light theme in the Lenis Design and then switches to the Main Design
- **THEN** the Main Design renders exactly as it would for a fresh visitor

#### Scenario: Styles are not combined
- **WHEN** a design page loads
- **THEN** only that design's global stylesheet is applied

## Purpose

Gives visitors one entry point where they pick which Zenbyte design to view, and a way to move between designs that behaves like opening a separate website.

## ADDED Requirements

### Requirement: Entry page lists the available designs
The system SHALL serve an entry page at `/` showing the ZENBYTE wordmark and one choice per design: "Main Design" and "Lenis Design". The entry page SHALL NOT render any content from either design.

#### Scenario: Visitor opens the root URL
- **WHEN** a visitor requests `/`
- **THEN** the page shows the ZENBYTE wordmark
- **AND** it shows a "Main Design" choice and a "Lenis Design" choice

#### Scenario: Choices are keyboard accessible
- **WHEN** a keyboard user tabs through the entry page
- **THEN** each design choice receives visible focus and can be activated with Enter

### Requirement: Choosing a design opens it with a full page reload
Activating a design choice SHALL trigger a full document navigation to that design's home page (`/main` for Main Design, `/lenis` for Lenis Design). It SHALL NOT use a client-side route transition, so no scripts, styles or state from the entry page carry over.

#### Scenario: Visitor picks Main Design
- **WHEN** the visitor activates "Main Design"
- **THEN** the browser performs a full document load of `/main`
- **AND** the Main Design home page renders

#### Scenario: Visitor picks Lenis Design
- **WHEN** the visitor activates "Lenis Design"
- **THEN** the browser performs a full document load of `/lenis`
- **AND** the Lenis Design home page renders, including its intro loader on a first visit in the session

#### Scenario: Browser back returns to the entry page
- **WHEN** the visitor presses the browser back button after choosing a design
- **THEN** the entry page at `/` is shown again

### Requirement: Each design offers a way to switch
Every page of each design SHALL include a small switch control linking to the entry page and to the other design. Following it SHALL cause a full page reload. The control SHALL NOT block the design's own navigation or content, and SHALL be operable by keyboard.

#### Scenario: Switching from Main to Lenis
- **WHEN** a visitor on any `/main/...` page activates the control's "Lenis Design" link
- **THEN** the browser performs a full document load of `/lenis`

#### Scenario: Returning to the entry page
- **WHEN** a visitor on any design page activates the control's link to the entry page
- **THEN** the browser performs a full document load of `/`

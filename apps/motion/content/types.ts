/**
 * Shared content types. Page copy lives in the modules next to this file so
 * it can be edited without touching layout components.
 *
 * Anything marked `placeholder: true` (or an ImageSlot without `src`) came
 * from the design canvas as illustrative content and must be replaced with
 * real material before launch.
 */

/** An image position that renders a striped placeholder until `src` is set. */
export type ImageSlot = {
  src?: string;
  alt: string;
  /** Caption shown inside the striped placeholder while `src` is empty. */
  caption: string;
};

export type Link = {
  label: string;
  href: string;
};

export type NavItem = Link & {
  /** Path prefix that marks this item as the current section. */
  match: string;
};

/** A row in a status panel: accent dot when `open`, ink dot otherwise. */
export type StatusRow = {
  label: string;
  state: string;
  open: boolean;
};

export type StatusPanel = {
  title: string;
  meta?: string;
  rows: StatusRow[];
};

export type Stat = {
  value: string;
  label: string;
  placeholder?: boolean;
};

export type NumberedItem = {
  n: string;
  title: string;
  body: string;
};

export type Phase = {
  week: string;
  title: string;
  body: string;
  output?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials?: string;
  avatar?: ImageSlot;
  placeholder?: boolean;
};

/** Content for the "your operation → engineer → deployed" diagram. */
export type DiagramContent = {
  before: StatusPanel;
  badge: string;
  pillTitle: string;
  pillMeta?: string;
  after: StatusPanel;
};

export type CaseStudyDetail = {
  tags: string[];
  headline: string;
  intro: string;
  facts: { label: string; value: string }[];
  hero: ImageSlot;
  metrics: { value: string; label: string }[];
  challenge: { heading: string; paragraphs: string[] };
  approach: NumberedItem[];
  result: { heading: string; paragraph: string; outcomes: string[] };
  quote: Testimonial;
};

export type CaseStudy = {
  slug: string;
  name: string;
  industry: string;
  image: ImageSlot;
  summary: string;
  metric: string;
  metricLabel: string;
  placeholder?: boolean;
  /** Only case studies with detail content get a `/case-studies/[slug]` page. */
  detail?: CaseStudyDetail;
};

export type PostBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string };

export type Author = {
  name: string;
  initials: string;
  bio: string;
  avatar?: ImageSlot;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, e.g. "2026-09-15". */
  date: string;
  tags: string[];
  author: Author;
  readMinutes: number;
  hero: ImageSlot;
  placeholder?: boolean;
  /** Only posts with a body get a `/blog/[slug]` page. */
  body?: PostBlock[];
};

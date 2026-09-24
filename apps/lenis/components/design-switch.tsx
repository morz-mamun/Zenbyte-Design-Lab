/**
 * Design lab switch: a small fixed pill that leaves this design for the lab
 * entry page or the other design. Not part of the source branch.
 *
 * Plain <a> tags on purpose: every target lives outside this zone's basePath,
 * so each click must be a full document load, never a client-side transition.
 * Styles are self-contained (scoped class names, no design tokens) so the
 * pill looks the same in both designs and both themes.
 *
 * z-index 45: under the fixed header (z-50, whose stacking context also holds
 * the full-screen mobile menu), intro loader (90), cursor (100), skip link
 * (110) and theme-drop overlay (9999); above page content.
 */

const CURRENT = 'lenis';

const designs = [
  { id: 'main', label: 'Main', href: '/main' },
  { id: 'lenis', label: 'Lenis', href: '/lenis' },
] as const;

const css = `
.zb-ds{position:fixed;left:12px;bottom:12px;z-index:45;display:flex;align-items:center;gap:2px;padding:4px;border-radius:999px;background:rgba(17,17,17,.88);border:1px solid rgba(255,255,255,.14);box-shadow:0 4px 18px rgba(0,0,0,.28);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);font:500 11px/1 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;letter-spacing:.06em;text-transform:uppercase}
.zb-ds a{display:block;padding:7px 10px;border-radius:999px;color:rgba(255,255,255,.72);text-decoration:none;transition:background-color .15s,color .15s}
.zb-ds a:hover{color:#fff;background:rgba(255,255,255,.1)}
.zb-ds a:focus-visible{outline:2px solid #fff;outline-offset:2px}
.zb-ds a[aria-current]{color:#111;background:#fff}
.zb-ds .zb-ds-home{font-weight:700;letter-spacing:.14em;color:#fff}
.zb-ds .zb-ds-sep{width:1px;height:14px;margin:0 4px;background:rgba(255,255,255,.2)}
@media print{.zb-ds{display:none}}
`;

export function DesignSwitch() {
  return (
    <nav aria-label="Design switcher" className="zb-ds">
      <style>{css}</style>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- "/" is the switcher zone; a full load is required. */}
      <a href="/" className="zb-ds-home" title="Back to Zenbyte Design Lab">
        Zenbyte
      </a>
      <span aria-hidden="true" className="zb-ds-sep" />
      {designs.map((design) => (
        <a
          key={design.id}
          href={design.href}
          aria-current={design.id === CURRENT ? 'page' : undefined}
          title={`${design.label} Design`}
        >
          {design.label}
        </a>
      ))}
    </nav>
  );
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * Prefixes a root-relative URL with the zone's basePath. `next/link`,
 * `redirect()` and `_next` assets get the prefix automatically; plain strings
 * (public assets, `next/image` src, metadata icons) do not. External,
 * protocol-relative, `mailto:` and `#hash` URLs are returned unchanged.
 */
export function withBasePath(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  if (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) return path;
  return `${BASE_PATH}${path}`;
}

# Source

This app is a one-time snapshot of a branch from the Zenbyte repo.

| | |
|---|---|
| Repo | `/home/mamun/morz/zenbyte/Zenbyte` |
| Branch | `main` |
| Commit | `32433c2af10ef4fc6dc063a451fc68c692ed8fba` |
| Commit subject | Remove unused SVG and image files, and delete home, privacy policy, and services pages to streamline the project structure. (2026-09-23 17:22:48 +0600) |
| Snapshot date | 2026-09-25 |

## Re-sync

To see what changed on the branch since this snapshot:

```bash
git -C /home/mamun/morz/zenbyte/Zenbyte diff 32433c2af10ef4fc6dc063a451fc68c692ed8fba main
```

To re-snapshot, re-run `git -C /home/mamun/morz/zenbyte/Zenbyte archive main` into this folder. Then re-apply the lab-only edits: the package name and ports in `package.json`, the `basePath` setup in `next.config.ts`, `lib/base-path.ts` and its call sites, and `components/design-switch.tsx`.

# Source

This app is a one-time snapshot of a branch from the Zenbyte repo.

| | |
|---|---|
| Repo | `/home/mamun/morz/zenbyte/Zenbyte` |
| Branch | `lenis-template` |
| Commit | `5b0941679b572dc25ea97ea60cb84ba208275c4d` |
| Commit subject | feat(vendors): update deployment status in hero diagram and replace EngineerDiagram with DeployStory (2026-09-24 16:46:40 +0600) |
| Snapshot date | 2026-09-25 |

## Re-sync

To see what changed on the branch since this snapshot:

```bash
git -C /home/mamun/morz/zenbyte/Zenbyte diff 5b0941679b572dc25ea97ea60cb84ba208275c4d lenis-template
```

To re-snapshot, re-run `git -C /home/mamun/morz/zenbyte/Zenbyte archive lenis-template` into this folder. Then re-apply the lab-only edits: the package name and ports in `package.json`, the `basePath` setup in `next.config.ts`, `lib/base-path.ts` and its call sites, and `components/design-switch.tsx`.

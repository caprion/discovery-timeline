# Hosting

Deployment plan for the static site. Cloudflare Pages is the target.

## Why Cloudflare Pages

**Static site fits the free tier perfectly.** Cloudflare Pages serves static assets (HTML, CSS, JS, JSON). No server-side runtime. We have no server-side runtime needs.

**Free tier limits.** 500 builds per month, unlimited bandwidth, unlimited requests, unlimited static assets. We will not hit 500 builds per month. We will not hit any limits.

**Custom domain support.** Map a sumit-controlled domain or subdomain. Free TLS via Cloudflare.

**Git-based deploy.** Push to a connected branch, page rebuilds. Zero-ops from there.

**Global edge network.** The site loads fast everywhere. Map tiles come from OpenStreetMap independently.

**Cloudflare account prerequisite.** Sumit needs a Cloudflare account. If the existing `cloudfleet` infra has an org, this can live under it. Otherwise, personal account is fine.

## What gets deployed

```
site/
  index.html
  styles.css
  app.js
  data.json        # generated, do not commit (or commit, see below)
```

Total payload is small. Map tiles come from OpenStreetMap CDN at runtime, not bundled.

## Build configuration

| Setting | Value |
|---|---|
| Build command | `python scripts/build.py` |
| Build output directory | `site` |
| Root directory | project root |
| Python version | 3.11 (matches dev environment) |
| Environment variables | none |

Cloudflare Pages detects Python projects via a `requirements.txt` if needed. We only need PyYAML. Two options:

1. Commit `data.json` and use an empty build command. Site deploys as-is.
2. Use a real build step. Cloudflare Pages runs the build command on each push.

Recommendation: option 2 (real build). The build script validates entries. Validation belongs in CI, not just local dev.

Add `requirements.txt` at project root with one line: `PyYAML>=6.0`.

## data.json in git

Two options:

1. **Commit `site/data.json`.** Simplest. Each YAML/story change requires a build commit. Slightly redundant but reviewable.
2. **Gitignore `site/data.json`.** Real CI build. Build script runs on every push.

Recommendation: option 2. Cleaner history. The build is fast.

## Custom domain

Pick a domain or subdomain before deploy. Candidates:

- `discoveries.sumitgarg.com` (subdomain of personal site)
- `discoveries.in` (if Sumit owns the .in)
- `discovery-timeline.com` (new dedicated domain)

Recommendation: subdomain of an existing personal domain. Cheapest, easiest to manage, consistent with other Sumit projects.

DNS setup: CNAME the subdomain to the Cloudflare Pages project URL. Cloudflare auto-handles TLS via the universal cert.

## Deploy steps (when ready)

1. Push the project to a Git repo (GitHub or GitLab).
2. Connect the repo to Cloudflare Pages.
3. Set build command and output directory (above).
4. Add custom domain.
5. Push to trigger first deploy.
6. Verify at the custom domain.

Total time: ~30 minutes once the repo exists.

## Local preview

For local dev (no deploy):

```bash
cd C:/Learn/discovery-timeline
python scripts/build.py
python -m http.server 8911 --directory site
# open http://localhost:8911
```

This is the same command path as the build, minus the Cloudflare Pages wrapper.

## Why not other hosts

| Host | Verdict |
|---|---|
| Vercel | Good. Slightly more features than we need. Cloudflare Pages is simpler. |
| Netlify | Good. Same as Vercel. Cloudflare Pages ties to existing Cloudflare ecosystem. |
| GitHub Pages | Free but no build command for free tier. We'd have to commit `data.json`. |
| AWS S3 + CloudFront | Possible. More setup, more cost. Not justified. |
| Self-hosted | Requires running a server. Explicitly anti-goal. |

## Cost

$0/month on Cloudflare Pages free tier. Domain registration is the only cost (~$10 to $15/year for a `.com`, less for other TLDs).

## What we are NOT doing

- No server. No Node.js backend. No Python backend.
- No database. Data lives in git.
- No CMS. Sumit edits YAML and markdown directly.
- No analytics. No tracking. No cookies.
- No CDN caching layer beyond Cloudflare's edge (which is automatic).
- No SSR. Pure static. The site is one HTML file.

## Limits and risks

- **Cloudflare outage.** Rare but real. Acceptable for a hobby project. If it becomes a problem, mirror to GitHub Pages as backup.
- **Link rot in curated sources.** Internet Archive links are durable. Britannica and MacTutor are stable. arXiv is stable. Quarterly review per ROADMAP.md.
- **OpenStreetMap tile policy.** OSM tiles are free for low-traffic use. If traffic spikes, switch to a paid tile provider or self-host. Not a concern at MVP scale.

## Trigger to deploy

Per ROADMAP.md, deployment happens after:

1. 20 entries shipped end-to-end.
2. North star signal picked.
3. Kid has engaged (Phase 3 complete).
4. Domain name decided.

So deploy is Phase 5, gated on Phase 3 success. Not before.
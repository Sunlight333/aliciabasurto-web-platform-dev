# Deployment — VPS

**Server:** `167.71.99.30` (DigitalOcean, Ubuntu 24.04, 1 vCPU / 2 GB)
**Live URL:** <http://167.71.99.30:8110>
**Deployed:** 2026-08-01

---

## 1. The constraint that shapes everything

This is a **shared box already running six other applications.** Nothing about this deploy may disturb them.

| Running before us | |
| --- | --- |
| systemd services | `ash-road`, `flowclinic`, `grandet`, `pts-backend`, `pts-frontend`, `workana-dashboard` |
| Docker containers | `pts-postgres`, `pizzabot-backend`, `pizzabot-uptime-kuma`, `pizzabot-postgres`, `pizzabot-redis` |
| nginx vhosts | `ash-road`, `flowclinic`, `pizzabot-ip`, `play-the-situation` |
| Ports in use | 22, 80, 443, 3000, 3001, 3002, 3010, 4000, 4321, 5050, 5432, 5433, 8000, 8080, 8090, 8100 |

**Free memory at deploy time: ~875 MB, with swap already half consumed.**

> **Never run `next build` on this server.** A Next build peaks well above the free headroom and would OOM-kill a live service. Builds happen locally; only the compiled artefact ships.

---

## 2. What was added — and only this

| Resource | Value | Nature |
| --- | --- | --- |
| System user | `nutricycle` (nologin) | new |
| App directory | `/opt/nutricycle` | new |
| systemd unit | `/etc/systemd/system/nutricycle.service` | new |
| App port | `3020`, bound to `127.0.0.1` | previously free |
| nginx vhost | `/etc/nginx/sites-available/nutricycle` → `sites-enabled` | **new file**; no existing config edited |
| Public port | `8110` | previously free |
| ufw rule | `8110/tcp comment 'nutricycle site'` | additive |

**Not touched:** every pre-existing nginx config, service, container, port and firewall rule.

nginx was **reloaded, never restarted** — a reload is graceful and drops no connections on the other sites. `nginx -t` gates the reload; on failure the symlink is removed and no reload happens.

---

## 3. Isolation choices

- **Dedicated port, `server_name _`.** Matches the existing `pizzabot-ip` (8080) and `play-the-situation` (8090) pattern. Because the vhost owns its own port, it is structurally incapable of shadowing another site's hostname on 80/443.
- **`MemoryMax=400M`** on the unit. Even a runaway leak cannot starve the neighbours — systemd kills our process first.
- **Loopback binding.** The Node process is not directly reachable; only nginx fronts it.
- **`Restart=on-failure`**, enabled at boot.

---

## 4. Verification method

Every endpoint's HTTP status was recorded **before** any change and compared **after**:

```text
port 80 200 · 443 400 · 8080 200 · 8090 200 · 8100 200 · 3000 200
port 3001 302 · 3002 200 · 3010 200 · 4000 404 · 4321 200 · 5050 200
```

All 12 matched afterwards, and all pre-existing services remained `active`.

Live site checks: `/` 200, `/descargar` 200, `/ir/app` 307. One `<h1>`, hydration confirmed, no page errors, no failed requests.

Memory after deploy: 774 MB available (app RSS ~65 MB).

---

## 5. Build and release procedure

### ⚠️ Local build quirk

`next build` **fails on the `G:` drive** with `EBUSY` on `.next-build/export/404.html` and `500.html` — real-time AV scanning locks freshly written HTML before Next can rename it. Reproducible, not transient.

Build from a copy on `C:` instead:

```bash
# 1. copy source (no node_modules, no .git, no .mov)
rm -rf /c/Users/ADMINI~1/AppData/Local/Temp/claude/nc-src
mkdir -p /c/Users/ADMINI~1/AppData/Local/Temp/claude/nc-src
tar -cf - --exclude=node_modules --exclude=.git --exclude='.next*' --exclude='*.mov' \
    apps packages package.json package-lock.json \
  | (cd /c/Users/ADMINI~1/AppData/Local/Temp/claude/nc-src && tar -xf -)

# 2. install + build
cd /c/Users/ADMINI~1/AppData/Local/Temp/claude/nc-src
npm install --no-audit --no-fund
npm run build
```

### Assemble the standalone bundle

Next emits `static/` and leaves `public/` outside the standalone tree; both must sit beside `server.js`:

```bash
SA=apps/web/.next-build/standalone
mkdir -p "$SA/apps/web/.next-build"
cp -r apps/web/.next-build/static "$SA/apps/web/.next-build/static"
cp -r apps/web/public            "$SA/apps/web/public"
rm -f "$SA/apps/web/public/video"/*.mov   # 132 MB of masters — never ship these
cd "$SA" && tar -czf ../nutricycle.tar.gz .
```

Result: **~18 MB**, or **~83 MB** with the transcoded videos included.

> Delete the `.mov` masters only — **not** the whole `video/` directory. It
> also holds the H.264/VP9 derivatives that `/videos` actually plays
> (65 MB, produced by `scripts/transcode-videos.mjs`). Dropping the
> directory wholesale ships a video library where every player 404s.
>
> To keep the bundle at 18 MB, upload those derivatives to a CDN or bucket
> instead, set `NEXT_PUBLIC_MEDIA_BASE_URL` to its origin, and then the
> whole directory can go. Poster frames live in `public/images/videos/`
> and ship either way — see [`lib/media.ts`](../../apps/web/src/lib/media.ts).

### Release

```bash
scp nutricycle.tar.gz root@167.71.99.30:/tmp/
ssh root@167.71.99.30 '
  rm -rf /opt/nutricycle.new && mkdir -p /opt/nutricycle.new
  tar -xzf /tmp/nutricycle.tar.gz -C /opt/nutricycle.new
  test -f /opt/nutricycle.new/apps/web/server.js || { echo "bad bundle"; exit 1; }
  rm -rf /opt/nutricycle && mv /opt/nutricycle.new /opt/nutricycle
  chown -R nutricycle:nutricycle /opt/nutricycle
  systemctl restart nutricycle
  sleep 4 && curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3020/
  rm -f /tmp/nutricycle.tar.gz'
```

Extract-then-swap keeps downtime to the restart alone, and a malformed bundle aborts before the live directory is replaced.

---

## 6. Config notes

`apps/web/next.config.mjs`:

- `output: 'standalone'` — ships a traced server bundle; the VPS needs no `npm install`.
- `outputFileTracingRoot` — must be a real filesystem path. `new URL().pathname` yields `/C:/…` on Windows and **silently emits no standalone output at all**.
- `distDir: isProd ? '.next-build' : '.next'` — stops `next build` clobbering a running dev server.
- `config.cache = { type: 'memory' }` — avoids the `EBUSY` pack-file failures on this volume.

---

## 7. Operations

```bash
systemctl status nutricycle
journalctl -u nutricycle -f
systemctl restart nutricycle
```

---

## 8. Outstanding

| # | Item | Note |
| --- | --- | --- |
| 1 | **No domain.** Served on `:8110`. | A real hostname needs a DNS record plus an nginx vhost on 80/443. `aliciabasurto.com` still points at Wix — repointing it takes the current site down, so it must be a deliberate cutover. |
| 2 | **No TLS.** Plain HTTP. | Comes with the domain; certbot is already used on this box for 443. |
| 3 | **Root password SSH.** | Credentials were shared in chat. Worth rotating, and moving to a key-only deploy user. |
| 4 | Store URLs still empty | `/ir/app` correctly falls back to `/descargar` |
| 5 | Recipe videos not on a CDN | Transcoding is **done** (`scripts/transcode-videos.mjs`, 65 MB of MP4/WebM). They currently ride along in the bundle; move them to a bucket and set `NEXT_PUBLIC_MEDIA_BASE_URL` |

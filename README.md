# atultiwari — personal site

Portfolio of **Dr. Atul Tiwari** — pathologist, AI researcher and medical educator.

A static, single-page React site. The visual system is borrowed from the stains a pathologist reads every day:
haematoxylin purple and eosin pink on a warm "lab bench" background, with a darkfield dark theme.

**Signature pieces** (all hand-built SVG, no images):

- **Blood-smear viewer** (hero): a procedurally generated peripheral smear. A reticle scans each leukocyte, shows class
  probabilities and a Grad-CAM heat-map. This illustrates the EfficientNetV2 WBC-classification paper. Visitors can click
  or tab to any cell, pause the scan, or toggle Grad-CAM.
- **Two-tracks timeline**: medicine, computing and faculty roles drawn on one time axis.
- **Case-summary card**: the About section written as a pathology report, with a "signed out" stamp.
- **Animated project vignettes** for MedTutor AI, MedCross AI and MedEval AI.

All motion respects `prefers-reduced-motion`, and the auto-advancing scan can be paused.

## Editing content

Everything you'd normally change lives in **`src/data/profile.ts`**: bio, roles, qualifications, projects, publications
(`url: null` hides the link), talks and contact details. The types in `src/data/types.ts` keep it honest.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit + integration tests (Vitest)
npm run coverage   # coverage report, 80 % threshold
npm run build      # type-check + production build to dist/
```

## Deploy (Hostinger or any static host)

`vite.config.ts` uses `base: './'`, so the build works from the domain root **or** any sub-folder.

1. `npm run build`
2. Upload the **contents** of `dist/` (including the hidden `.htaccess`) to `public_html/`, or to a sub-folder such as
   `public_html/about/`.

`public/.htaccess` adds security headers (CSP, nosniff, frame-deny), long-lived caching for hashed assets and gzip. It is
ignored by hosts that are not Apache/LiteSpeed.

## Structure

```
src/
  data/          profile content + types
  lib/           pure logic: seeded RNG, cell-field sampler, timeline maths, theme storage, hooks
  components/    header, icons, logo, reveal, smear viewer
  sections/      page sections (hero, about, path, work, research, contact, footer)
  styles/        design tokens + base styles
tests/           Vitest suites
```

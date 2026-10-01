# Presentation assets

- `calculator.png`: a real, cropped screenshot of the calculator at https://virtue-ecru.vercel.app, captured on 2026-10-01 with default inputs. Its $600 BNB price display matches the code's initial fallback; this capture does not establish a live quote. The UI's distribution labels are not verified payouts. No values or UI content were edited for the screenshot.
- [`../../public/social-card.svg`](../../public/social-card.svg): editable 1280×640 source using the palette from `app/globals.css`. Original text and geometric shapes; no new logo or third-party stock imagery.
- [`../../public/social-card.png`](../../public/social-card.png): PNG export used by the website's Open Graph and Twitter metadata. Upload it separately in GitHub's repository Settings → Social preview.

Regenerate the card from the repository root after `npm ci` using the Sharp dependency installed with Next.js:

```bash
node -e 'require("sharp")("public/social-card.svg").png().toFile("public/social-card.png").then(console.log)'
```

The export used DejaVu Sans, with Arial/sans-serif fallbacks in the SVG. Font availability can change text metrics; inspect the result after regeneration.

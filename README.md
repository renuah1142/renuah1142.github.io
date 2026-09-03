# Renuah Samuel — Cybersecurity Portfolio

A personal portfolio positioning a SOC-analyst / network-security career track, backed by real GNS3/Cisco networking projects and full-stack development work.

## Design direction

The visual system deliberately avoids common "AI portfolio" defaults (ALL-CAPS eyebrow labels, numbered 01/02/03 markers on non-sequential content, glowing gradient cards, neon hacker aesthetics). Instead it reads like field documentation: hairline rules instead of card shadows, a single restrained copper accent, and monospace type reserved for real technical data (IPs, protocols, dates).

- Headings: Space Grotesk
- Body: IBM Plex Sans
- Technical labels/data: IBM Plex Mono

## Technologies

- HTML
- CSS (custom properties, no framework)
- Vanilla JavaScript
- GitHub Pages

## Deployment

Static site, deployed via the included GitHub Actions workflow (`.github/workflows/deploy.yml`) to GitHub Pages. All paths are relative so the site works whether served from the repo root or a project path.

## How to update the portfolio

- **Resume:** add the final PDF at `assets/documents/Renuah-Samuel-Resume.pdf` (not included in this repo — the Download Resume buttons will 404 until it's added).
- **Projects:** edit the project cards in `index.html` and the matching entries in `projectData` inside `js/script.js`.
- **Certifications / learning:** update the cards in the "Cloud security" and "Certifications in progress" sections of `index.html`. Keep the "in progress / currently learning" labels accurate — do not mark anything as completed unless it actually is.
- **Contact details:** edit the contact section in `index.html`.
- **Diagrams:** `assets/images/wan-network-topology.svg` and `campus-lan-topology.svg` are illustrative diagrams, not screenshots of the actual GNS3 topologies. Swap in real topology exports/screenshots if available for stronger credibility.

## Known issues / not in scope of this pass

- `projects.html`, `contact.html`, and `projects/*.html` are an older, disconnected set of pages (different nav markup, and they load `js/main.js`, which references element IDs that don't exist in those files). Nothing in the current `index.html` links to them. Decide whether to delete this legacy set or rebuild it to match the current design system.

## Author

Renuah Samuel

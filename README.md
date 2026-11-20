# Demo Business Hardware Website

A responsive static website demonstration built with HTML, CSS, and vanilla JavaScript.

## Files
- `index.html` — page structure and sample content
- `style.css` — responsive visual design
- `script.js` — mobile navigation, catalog filters/search, product inquiry helpers, and demo contact form

## Preview locally
Open `index.html` in a browser. For a local server, run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## Publish with GitHub Pages
1. Create a new GitHub repository.
2. Upload `index.html`, `style.css`, and `script.js` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. Wait for GitHub Pages to publish the site.

## Before using for a real client
- Replace Demo Business name, address, hours, contact details, products, and prices.
- Replace `MESSENGER_URL` in `script.js` with the client's real Messenger page URL.
- Replace `CONTACT_EMAIL` with a real monitored email address.
- Replace the sample product data and promotional copy with client-approved details.
- Replace external Unsplash image URLs with licensed/client-provided images if needed.
- The inquiry form uses `mailto:` and does not store submissions. For a production form, connect a form backend/service.
- This is a front-end demo only. It does not include checkout, inventory synchronization, POS, or a database.

All business details, products, and prices in this demo are fictional.

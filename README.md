# Memora Krafts Website

## Repository structure

```text
Memorakrafts-website/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── logo.png
│   ├── hero-hamper.jpg
│   └── hamper-01.jpg ... hamper-13.jpg
└── README.md
```

## Publish with GitHub Pages

1. Open the `Memorakrafts-website` repository on GitHub.
2. Choose **Add file → Upload files**.
3. Upload `index.html`, `style.css`, `script.js`, the complete `assets` folder, and this `README.md` while keeping the folder structure unchanged.
4. Commit the changes to the `main` branch.
5. Open the GitHub Pages website and hard-refresh it (Ctrl+F5).

`index.html` loads `style.css` and `script.js` using relative paths. Keep all three files in the repository root and keep image files inside `assets/`.

## Enquiry form integration

The frontend JavaScript currently contains the Google Apps Script Web App URL and submits these eight form fields:

- `name`
- `company`
- `phone`
- `email`
- `type`
- `qty`
- `budget`
- `msg`

The form then opens WhatsApp with the enquiry details. The browser uses `mode: "no-cors"`, so the page cannot verify the Apps Script response; confirm that a test submission actually appears in the linked Google Sheet.

## Backend

The uploaded HTML contains the frontend integration only. It does not contain `Code.gs`. Keep the Google Apps Script backend in the Apps Script project; it does not need to be uploaded to GitHub. Verify its `doPost(e)` implementation and deployment permissions separately before relying on live leads.

## Important

Do not upload the old single-file HTML over these files. Replace the repository contents with this folder structure so the CSS, JavaScript, and assets paths resolve correctly.

# NasFolio Trading Analysis Web App

A personal, mobile-friendly trading analysis tool built with Google Apps Script and Bootstrap, designed for easy use on both desktop and mobile. It reads your tradebook CSV from Google Drive and provides:

## Features

- **Stock Search**: Search for any traded stock, filter by optional date range, and view consolidated buy/sell summary and trade history. Autocomplete for stock symbol.
- **All Stocks**: View all unique traded scripts, color-coded by profit/loss, with sorting options (alphabetical, data order, P&L order).
- **Responsive UI**: Optimized for mobile and desktop, with touch-friendly controls and edge-to-edge layout.
- **Logo Support**: Custom logo in the header (hosted on GitHub or public image host).

## How it Works

- **Backend**: Google Apps Script (`Code.gs`) reads the `tradebook-data.csv` from a specified Google Drive folder, processes trades, and exposes functions for the frontend.
- **Frontend**: `index.html` (served by Apps Script) uses Bootstrap for layout and styling, and `google.script.run` for backend calls. All logic is client-side JavaScript.
- **Autocomplete**: Stock symbol suggestions are fetched from the backend for fast searching.

## Setup Instructions

1. **Google Drive**: Place your `tradebook-data.csv` in a folder. Set sharing to "Anyone with the link" (Viewer).
2. **Apps Script**:
   - Create a new Apps Script project.
   - Upload `Code.gs` and `index.html` (as an HTML file, not a static asset).
   - Set the correct folder ID in `Code.gs`.
   - Deploy as a web app ("Execute as me", "Anyone").
3. **Logo**: Host your logo on GitHub (raw URL) or a public image host. Update the `<img src=...>` in `index.html`.
4. **Access**: Use the `/exec` web app URL directly in your browser or add to your mobile home screen.

## Technical Details

- **Languages**: Google Apps Script (JavaScript), HTML, CSS (Bootstrap 5)
- **No server required**: All logic runs in Apps Script and the browser.
- **No external dependencies** except Bootstrap CDN.
- **Data privacy**: Your data stays in your Google Drive; no third-party backend.

## Customization
- To update the tradebook, just replace the CSV in Drive.
- To change the logo, update the image URL in `index.html`.
- For more features, extend `Code.gs` and `index.html` as needed.

---

**Author:** Naseerudeen VAB, deen.naseer@gmail.com

---

_This is version 1.0. Enjoy your personal trading dashboard!_

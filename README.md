# Website Draft

This repository contains a basic multi-page website template. Pages include:

- `index.html` – landing page with a simple hero image.
- `products.html` – placeholder product list.
- `about.html` – company background page.
- `contact.html` – contact form.

Static assets (CSS, JavaScript and placeholder images) are stored in the `assets` directory.

## Customization

1. The pages use placeholder images from [Picsum](https://picsum.photos). Replace the `src` attributes on any `<img>` elements with your own URLs or local files when you're ready.
2. Update company branding by replacing `assets/images/logo.svg` with your logo file. The same image is used as the favicon and in the header.
3. Product listings and details are generated from `assets/data/product-data.js`. Add new objects with `en` and `tr` fields so names and descriptions update automatically.
4. The site supports English and Turkish. Use the language switcher in the header or set `localStorage.lang` to choose a default. Translations are stored in `assets/i18n/lang-en.js` and `assets/i18n/lang-tr.js`.

No build process is required; simply open the HTML files in a browser to view the site.

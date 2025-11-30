## Product Catalog Application

A full-stack product catalog application built with Node.js, Express, MongoDB, and React.  
The app displays a list of products with filters such as search, price range, and multi-select categories.  
All applied filters are persisted in the URL, allowing users to share or reload the page with filters intact.

## Features

- Displays product cards in a 4-item grid.
- Filters available:
  - Search by name
  - Price range filter
  - Category multi-select dropdown
- URL Persistence:
  - Filters automatically update URL params.
  - Opening the same URL restores filters and UI state.
- Clean component structure:
  - `Filters/`
  - `ProductGrid/`
  - `ProductCard/`
  - `services/api.js`

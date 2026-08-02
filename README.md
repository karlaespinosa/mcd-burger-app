# McD Burger App

A modern burger ordering application built with **Next.js 16**, **React 19**, and **TypeScript** as part of a technical assessment.

The application allows users to browse the menu, view product details, search for menu items, and manage a persistent shopping cart.

---

## Features

- Browse the burger menu
- Product detail page
- Search products by name or description
- Persistent shopping cart using Zustand
- Add, remove and update product quantities
- Shopping cart badge with total quantity
- Responsive layout
- Loading, error and not found pages
- SEO metadata
- Sitemap and robots configuration
- Unit tests with Vitest and React Testing Library

---

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Zustand
- Sonner
- Vitest
- React Testing Library

---

## Architecture

### Server Components

The application uses **Server Components** whenever possible to minimize client-side JavaScript and improve performance.

Examples include:

- Home page
- Product detail page
- Shopping cart page

Menu data is fetched on the server and cached using Next.js built-in caching.

---

### Client Components

Client Components are only used when browser interactivity is required.

Examples include:

- Add to cart button
- Search input
- Shopping cart interactions
- Navbar cart badge

---

### Routing

The application uses the App Router with the following routes:

| Route              | Description    |
| ------------------ | -------------- |
| `/`                | Menu           |
| `/products/[slug]` | Product detail |
| `/cart`            | Shopping cart  |

---

### Shopping Cart

The shopping cart is implemented using **Zustand** with the Persist middleware.

Only the minimum required information is stored:

```ts
{
  "1": 2,
  "4": 1
}
```

Where:

- key = product id
- value = quantity

Product information is always obtained from the server catalog.

---

### Search

The search feature updates the URL using query parameters:

```
/?query=burger
```

Products are filtered on the server based on the current search term.

---

### Rendering Strategy

The product catalog is considered static.

To optimize performance:

- Menu data is cached.
- Product pages are statically generated using `generateStaticParams`.
- Dynamic rendering is only used where client interaction is required.

---

## Testing

Unit tests were written using:

- Vitest
- React Testing Library

The test suite covers:

- Cart store
- Cart helpers
- ProductCard
- CartItem
- AddToCartButton
- Utility functions

Run the tests:

```bash
npm run test
```

Run once:

```bash
npm run test:run
```

---

## Running locally

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## Lint

```bash
npm run lint
```

---

## Production Build

```bash
npm run build
```

---

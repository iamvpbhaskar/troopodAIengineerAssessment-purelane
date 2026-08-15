# Purelane Shopify Build - Troopod AI Product Engineer Assignment

Welcome to my submission for the AI Product Engineer assignment! This repository contains the fully functional, merchant-editable Shopify sections built from the provided `purelane-homepage.html` prototype.

## 🔗 Live Dev Store Access

- **Store URL:** [purelane-build-xlrtbxvl.myshopify.com](https://purelane-build-xlrtbxvl.myshopify.com)
- **Password:** *(Please insert your store password here before submitting)*

---

## 🛠️ 1. Notes on the Build (Precision & Architecture)

The goal of this build was to strictly adhere to the provided design prototype while ensuring the code underneath was semantic, accessible, and 100% merchant-editable in the Shopify Customizer. 

### What I flagged about the original prototype:
* **Hardcoded Constraints:** The prototype was a static monolith heavily reliant on fixed viewport widths, massive clamp-based typography that broke on ultra-small screens, and no semantic separation of concerns. 
* **Lack of Data Scalability:** The CSS grids lacked text-wrapping rules, meaning any dynamically injected real-world data (like exceptionally long product titles) would instantly break the flex boundaries on mobile devices.

### What I changed & why:
* **Modularized Architecture:** I decomposed the static HTML into 8 discrete Shopify Liquid sections (`hero`, `ticker`, `shop`, `categories`, `combos`, `how-it-works`, `header`, `footer`).
* **Zero Hardcoding:** Everything from the header's navigation menu and SVG branding to the product grid's content is tied to `section.settings` or native Shopify objects (`collection.products`). The marketing team can swap out the "Clean, simply" tagline or change the hero imagery without ever touching the code.
* **Granular CSS & Performance:** Instead of one massive stylesheet, I broke the CSS down per section (`purelane-header.css`, `purelane-shop.css`, etc.) and loaded them dynamically via Shopify's `stylesheet_tag` only when their respective sections are rendered. This satisfies the Core Web Vitals requirement.
* **Micro-details & Edge-case Handling:** 
  * Implemented strict `-webkit-line-clamp` boundaries on the product cards to ensure grid heights remain uniform even if a merchant uploads a 4-line product title.
  * Added specific media queries for `320px` viewports to ensure "33% off" tags and CTA buttons scale intelligently instead of overflowing the screen.
  * Rebuilt the static desktop header into a dynamic, context-aware layout that intelligently switches to a day-theme on interior pages, complete with a fully animated, glassmorphic mobile hamburger dropdown.

### Metafields & Metaobjects:
No custom Metafields were strictly required to achieve 100% of the visual output, as the core content loops nicely through native `collections` and `products`. 

---

## 🤖 2. Notes on the AI Workflow

As an AI Product Engineer, my goal is to leverage agentic workflows for volume and velocity, while retaining absolute control over the microscopic details that define a premium product.

### What was delegated:
I relied heavily on my AI agent to execute the structural scaffolding. The agent parsed the monolithic HTML, split the DOM elements into respective Liquid sections, extracted the embedded CSS into individual asset files, and hooked up the baseline Shopify Liquid iteration logic (`{% for product in collections[...].products %}`).

### Where the AI failed (and how I caught it):
The AI is inherently blind to spatial edge cases. While it correctly ported the code, it failed to anticipate how the original prototype's fixed font sizes would behave on a 320px screen when populated with real Shopify data. 

I caught these breaks through rigorous manual QA across device viewports. I had to manually step in and direct the AI to implement `-webkit-line-clamp` rules for text overflow, reduce button padding thresholds, and adjust flex-wrap behaviors for the pricing blocks that were touching the screen edges.

### What I would systematize for scale:
If I had to build 20 more of these themes concurrently, I would systemize a **"Shopify Mobile Defensive Cheatsheet"**. 
Instead of letting the AI blindly convert design code to Liquid, I would inject a strict set of `@media (max-width: 360px)` guardrails into the agent's initial prompt—mandating that all product titles must be clamped, and all grid gaps must scale dynamically. This would prevent the AI from failing the mobile responsiveness QA on the first pass, massively accelerating the time from spec to deployment.

---

*Thank you for reviewing my build! I am incredibly excited about the opportunity to build resilient, high-volume delivery infrastructure at Troopod.*

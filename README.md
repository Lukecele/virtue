# Virtue: AI Agent & Real-Time Financial Calculator

An interactive, pattern-matching AI conversational agent and real-time cryptocurrency financial calculator. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, and live Binance market data.

**Live Application:** [https://virtue-ecru.vercel.app](https://virtue-ecru.vercel.app)  
**License:** MIT

---

## Overview

Virtue is a dual-function conversational web application designed for interactive natural language dialogue and live cryptographic asset valuation. 

The core intelligence layer implements a deterministic, multi-tiered pattern-matching NLP engine (inspired by classic Eliza architectures), complete with contextual reflection, intent classification, and fuzzy topic scorers. It is paired with a live financial calculation engine connected directly to public exchange APIs (Binance) to compute real-time asset balances, losses, and valuations.

---

## Key Features

- **Custom Rule-Based NLP Engine (`app/api/absolution/route.ts`):**
  - Multi-stage waterfall matching with high-priority exact triggers, fuzzy semantic scoring, and dynamic fallbacks.
  - Contextual memory and pronoun reflection for natural dialogue flow.
  - Granular domain knowledge covering Web3, DeFi, market dynamics, and conversational interactions.
- **Real-Time Market Valuation Engine:**
  - Automated ticker fetching via Binance REST API (`api.binance.com`).
  - Dynamic mathematical parser for calculating token amounts, fiat approximations, and portfolio loss metrics.
- **Modern Responsive Architecture:**
  - Built on Next.js 16 with React 19 server/client components.
  - High-performance dark-theme UI styled with Tailwind CSS.
  - Deployed globally on Vercel Edge Network.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **APIs:** Binance Public REST API
- **Deployment:** Vercel

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm, pnpm, or bun

### Local Setup
```bash
# Clone the repository
git clone https://github.com/Lukecele/virtue.git
cd virtue

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## License

Released under the MIT License.

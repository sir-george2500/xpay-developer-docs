# X-Pay Developer Documentation

Official documentation for the X-Pay Payment Infrastructure.

## Overview

This repository contains the source code for the X-Pay Developer Platform documentation, built using [Docusaurus 3](https://docusaurus.io/).

- **Live Site**: [https://docs.xpay-bits.com](https://docs.xpay-bits.com)
- **Dashboard**: [https://dashboard.xpay-bits.com](https://dashboard.xpay-bits.com)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Local Development

Start the development server:

```bash
npm start
```

This command starts a local development server at `http://localhost:3000`. Most changes are reflected live without having to restart the server.

## Project Structure

- `/docs` - Markdown documentation files
- `/src` - React components and pages
- `/static` - Static assets (images, etc.)
- `docusaurus.config.ts` - Site configuration

## Deployment

The documentation is automatically deployed to Vercel on push to the `main` branch.

To build locally:

```bash
npm run build
```

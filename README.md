# Startup Tester Roadmap

A Next.js website providing a practical guide for startup testers, built with TypeScript, Tailwind CSS, and component-based architecture.

## Features

- 🎨 Modern, responsive design with dark theme
- 📱 Mobile-friendly navigation with hamburger menu
- 🧩 Component-based architecture for easy maintenance
- ⚡ Built with Next.js 14 and TypeScript
- 🎯 Smooth scrolling navigation
- 📋 Copy-to-clipboard functionality for DM templates

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx            # Root layout component
│   └── page.tsx              # Main page component
├── components/
│   ├── Navigation.tsx        # Navigation bar with mobile menu
│   ├── Hero.tsx              # Hero section
│   ├── RealityCheck.tsx      # Startup vs Theory section
│   ├── Fundamentals.tsx      # Core fundamentals section
│   ├── TechnicalEdge.tsx     # Technical knowledge section
│   ├── Roadmap.tsx           # 30-day action plan
│   ├── Portfolio.tsx         # Portfolio and resume tips
│   └── Footer.tsx            # Footer component
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies
```

## Build for Production

```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Font Awesome** - Icons

## Components

All components are located in the `components/` directory and follow React best practices:

- Client components (using 'use client') for interactive features
- Server components by default for better performance
- Proper TypeScript typing
- Reusable and maintainable code structure

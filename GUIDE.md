# Technical Guide - Startup Tester Roadmap

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Architecture & Design Patterns](#architecture--design-patterns)
5. [Key Features Implementation](#key-features-implementation)
6. [Data Flow](#data-flow)
7. [Component Architecture](#component-architecture)
8. [Setup & Development](#setup--development)
9. [Deployment](#deployment)

---

## 🎯 Project Overview

**Startup Tester Roadmap** is a Next.js-based educational web application designed to help freshers learn software testing fundamentals through interactive content and hands-on playgrounds.

### Core Purpose

- Provide structured learning content for software testing fundamentals
- Offer interactive playgrounds for hands-on practice
- Guide users through a 30-day learning roadmap

---

## 🛠 Tech Stack

### Frontend Framework

- **Next.js 14.0.4** - React framework with App Router
- **React 18.2.0** - UI library
- **TypeScript 5** - Type safety

### Styling

- **Tailwind CSS 3.3.0** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Icons

- **Font Awesome** (via CDN) - Icon library

### State Management

- **React Hooks** (`useState`, `useEffect`) - Client-side state
- **localStorage API** - Persistent client-side storage

### Build Tools

- **Next.js Built-in Bundler** - Webpack-based bundling
- **TypeScript Compiler** - Type checking and compilation

---

## 📁 Project Structure

```
freshers_paths/
├── app/                          # Next.js App Router directory
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   └── playgrounds/             # Playground routes
│       ├── page.tsx              # Playgrounds listing page
│       └── [id]/                # Dynamic route for individual playgrounds
│           └── page.tsx         # Individual playground page
│
├── components/                   # React components
│   ├── Navigation.tsx           # Main navigation bar
│   ├── Hero.tsx                # Landing hero section
│   ├── RealityCheck.tsx        # Expectations section
│   ├── Fundamentals.tsx          # Core fundamentals section
│   ├── TechnicalEdge.tsx       # Technical knowledge section
│   ├── PlaygroundsPromo.tsx    # Playgrounds promotion section
│   ├── Roadmap.tsx             # 30-day plan section
│   ├── Portfolio.tsx           # Getting hired section
│   ├── Footer.tsx              # Footer component
│   ├── Modal.tsx                # Reusable modal component
│   └── playgrounds/            # Playground-specific components
│       ├── BugSpottingBoard.tsx
│       ├── PredictionPlayground.tsx
│       ├── APIDecoder.tsx
│       └── BugReportWriter.tsx
│
├── data/                        # Data layer
│   ├── knowledge.tsx           # Knowledge content for modals
│   └── playgrounds.tsx         # Playground cases and data
│
├── public/                      # Static assets (if any)
│
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── postcss.config.js           # PostCSS configuration
└── package.json                # Dependencies and scripts
```

---

## 🏗 Architecture & Design Patterns

### 1. **Component-Based Architecture**

- Modular, reusable React components
- Separation of concerns (UI, logic, data)
- Single Responsibility Principle

### 2. **Data-Driven Content**

- Content separated from components (`data/` directory)
- Type-safe data structures with TypeScript interfaces
- Easy to update content without touching components

### 3. **Client-Side State Management**

- React hooks for component-level state
- localStorage for persistence across sessions
- No global state management library (kept simple)

### 4. **Progressive Enhancement**

- Server-side rendering (SSR) for initial load
- Client-side interactivity with `'use client'` directive
- Graceful degradation

### 5. **Responsive Design**

- Mobile-first approach with Tailwind CSS
- Breakpoint-based layouts (`sm:`, `md:`, `lg:`)
- Flexible grid systems

---

## 🎨 Key Features Implementation

### 1. **Interactive Knowledge Modals**

**Location:** `components/Modal.tsx`, `components/Fundamentals.tsx`

**How it works:**

- Clickable cards trigger modal opening
- Modal component manages open/close state
- Content loaded from `data/knowledge.tsx`
- Backdrop click and ESC key close modal
- Body scroll locked when modal is open

**Key Code Pattern:**

```tsx
const [openModal, setOpenModal] = useState<string | null>(null)

// Open modal
onClick={() => setOpenModal('sdlc')}

// Render modal
{openModal && (
  <Modal onClose={() => setOpenModal(null)}>
    {knowledgeData[openModal]}
  </Modal>
)}
```

### 2. **Interactive Playgrounds**

**Location:** `components/playgrounds/*.tsx`

**Features:**

- **Question Shuffling**: Fisher-Yates algorithm
- **Progress Tracking**: localStorage persistence
- **No Duplicates**: Tracks shown questions
- **Reset Functionality**: Clear progress anytime

**Implementation Details:**

#### Shuffling Algorithm

```typescript
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
```

#### localStorage Strategy

```typescript
// Store only IDs (serializable)
localStorage.setItem("shuffled-ids", JSON.stringify(shuffled.map((c) => c.id)));

// Restore full objects from IDs
const shuffledIds = JSON.parse(localStorage.getItem("shuffled-ids"));
const shuffled = shuffledIds.map((id) => cases.find((c) => c.id === id));
```

#### Progress Tracking

- `shown-ids`: Array of completed question IDs
- `current-index`: Current position in shuffled array
- `shuffled-ids`: Order of shuffled questions

### 3. **Dynamic Routing**

**Location:** `app/playgrounds/[id]/page.tsx`

**How it works:**

- Next.js dynamic route segments `[id]`
- Route parameter extracted via `useParams()`
- Component mapping based on route ID
- 404 handling for invalid routes

**Key Code:**

```tsx
const params = useParams();
const playgroundId = params.id as string;

const playgroundComponents = {
  "bug-spotting": <BugSpottingBoard />,
  prediction: <PredictionPlayground />,
  // ...
};
```

### 4. **Smart Navigation**

**Location:** `components/Navigation.tsx`

**Features:**

- Context-aware links (hash anchors on home, full URLs elsewhere)
- Mobile-responsive hamburger menu
- Active state management

**Implementation:**

```tsx
const pathname = usePathname();
const isHomePage = pathname === "/";

const getNavLink = (hash: string) => {
  return isHomePage ? hash : `/${hash}`;
};
```

### 5. **Visual Bug Spotting**

**Location:** `components/playgrounds/BugSpottingBoard.tsx`, `data/playgrounds.tsx`

**How it works:**

- Each case includes a `uiComponent` (JSX)
- Visual representation of UI bugs
- Users identify issues by observation
- Interactive answer selection with feedback

**Data Structure:**

```typescript
interface BugSpottingCase {
  id: string;
  uiComponent: React.ReactNode; // Visual representation
  question: string;
  options: Option[];
  correctAnswer: string;
  explanation: Explanation;
  meta: { bugType: string; skills: string[] };
}
```

---

## 🔄 Data Flow

### 1. **Knowledge Content Flow**

```
data/knowledge.tsx
  → Components (Fundamentals, TechnicalEdge, etc.)
  → Modal Component
  → User Interaction
```

### 2. **Playground Data Flow**

```
data/playgrounds.tsx
  → Playground Components
  → Shuffle & Initialize
  → localStorage (persist)
  → User Interaction
  → Update localStorage
  → Next Question
```

### 3. **Navigation Flow**

```
User Click
  → Navigation Component
  → Check Current Route
  → Generate Appropriate Link
  → Next.js Router
  → Page Component
```

---

## 🧩 Component Architecture

### Component Hierarchy

```
app/page.tsx (Home)
├── Navigation
├── Hero
├── RealityCheck
│   └── Modal (conditional)
├── Fundamentals
│   └── Modal (conditional)
├── TechnicalEdge
│   └── Modal (conditional)
├── PlaygroundsPromo
├── Roadmap
├── Portfolio
└── Footer

app/playgrounds/page.tsx
├── Navigation
└── Playground Cards

app/playgrounds/[id]/page.tsx
├── Navigation
└── Playground Component
    ├── Question Display
    ├── Answer Options
    ├── Explanation (conditional)
    └── Navigation Buttons
```

### Component Types

1. **Layout Components**

   - `Navigation.tsx` - Persistent navigation
   - `Footer.tsx` - Site footer

2. **Content Sections**

   - `Hero.tsx`, `Fundamentals.tsx`, etc. - Page sections

3. **Interactive Components**

   - `Modal.tsx` - Reusable modal
   - Playground components - Interactive learning

4. **Data Components**
   - Components that consume data from `data/` directory

---

## 🚀 Setup & Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd freshers_paths

# Install dependencies
npm install

# Run development server
npm run dev
```

### Development Scripts

```json
{
  "dev": "next dev", // Start dev server (localhost:3000)
  "build": "next build", // Production build
  "start": "next start", // Start production server
  "lint": "next lint" // Run ESLint
}
```

### Development Workflow

1. **Adding New Content**

   - Knowledge: Edit `data/knowledge.tsx`
   - Playground cases: Edit `data/playgrounds.tsx`

2. **Creating New Components**

   - Add to `components/` directory
   - Import in `app/page.tsx` or appropriate route

3. **Styling**

   - Use Tailwind utility classes
   - Custom colors in `tailwind.config.ts`
   - Global styles in `app/globals.css`

4. **Type Safety**
   - Define interfaces in data files
   - TypeScript will catch type errors

### Environment Variables

Currently, no environment variables are required. If needed:

- Create `.env.local` file
- Add variables with `NEXT_PUBLIC_` prefix for client-side access

---

## 📦 Build & Deployment

### Production Build

```bash
# Create optimized production build
npm run build

# Test production build locally
npm start
```

### Build Output

Next.js generates:

- `.next/` - Build output directory
- Optimized JavaScript bundles
- Static HTML for pages
- Image optimization

### Deployment Options

1. **Vercel** (Recommended)

   - Connect GitHub repository
   - Automatic deployments
   - Zero configuration

2. **Netlify**

   - Connect repository
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Self-Hosted**
   - Build: `npm run build`
   - Run: `npm start`
   - Requires Node.js server

### Performance Optimizations

- **Code Splitting**: Automatic via Next.js
- **Image Optimization**: Next.js Image component (if used)
- **Font Optimization**: Inter font via Google Fonts
- **CSS Optimization**: Tailwind purges unused styles

---

## 🔧 Configuration Files

### `next.config.js`

```javascript
{
  reactStrictMode: true; // Enable React strict mode
}
```

### `tailwind.config.ts`

- Custom color palette (`brand`, `dark`)
- Custom font family (Inter)
- Custom animations (blob)
- Content paths for purging

### `tsconfig.json`

- TypeScript compiler options
- Path aliases (`@/` for root imports)
- React JSX settings

---

## 🎯 Key Design Decisions

### 1. **Why Next.js App Router?**

- Modern routing with file-based system
- Server components by default
- Better performance and SEO

### 2. **Why localStorage over Database?**

- No backend required
- Simple persistence
- Works offline
- Fast and lightweight

### 3. **Why TypeScript?**

- Type safety prevents bugs
- Better IDE support
- Self-documenting code

### 4. **Why Tailwind CSS?**

- Rapid development
- Consistent design system
- Small bundle size (purged unused styles)
- Mobile-first responsive design

### 5. **Why Component-Based?**

- Reusability
- Maintainability
- Testability
- Separation of concerns

---

## 🐛 Common Issues & Solutions

### Issue: localStorage not working

**Solution:** Ensure code runs client-side (`'use client'` directive)

### Issue: Hydration mismatch

**Solution:** Avoid rendering different content on server vs client

### Issue: Tailwind classes not applying

**Solution:** Check `tailwind.config.ts` content paths include your files

### Issue: Modal not closing

**Solution:** Check event handlers and state management

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

## 🤝 Contributing

When adding new features:

1. Follow existing component patterns
2. Maintain TypeScript types
3. Ensure mobile responsiveness
4. Test localStorage functionality
5. Update this guide if architecture changes

---

**Last Updated:** 2024
**Maintained by:** Development Team

# Arc Raiders Solo Planner

A companion web app for solo PC players of Arc Raiders to plan XP runs, choose loadouts, and track progress towards skill points.

## Features

- **Run Assistant**: Interactive tool to select run type, map, and modifier to get adaptive plans
- **Farming Routes**: Browse and filter routes by style (Boss hunting, Loot running, Stealth)
- **High Value Targets**: Learn which enemies and strategies maximise XP
- **Loadouts**: Recommended loadouts for different playstyles
- **Shortcuts**: Fast methods and tricks for efficient XP farming
- **General Tips**: Best practices for solo players
- **XP Planner**: Calculator to estimate runs needed to reach target level

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- No backend or external APIs

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

### Building for Production

Build the project:
```bash
npm run build
```

The built files will be in the `dist` directory.

Preview the production build locally:
```bash
npm run preview
```

## Deployment to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

1. Update the `base` path in `vite.config.ts` to match your repository name:
   ```typescript
   base: '/your-repo-name/',
   ```
   For example, if your repository is `arc-raiders-solo-planner`, use:
   ```typescript
   base: '/arc-raiders-solo-planner/',
   ```

2. Push your code to GitHub and ensure the repository is set up.

3. Go to your repository Settings → Pages.

4. Under "Source", select "GitHub Actions" as the deployment source.

5. The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically deploy on every push to the `main` branch.

### Option 2: Manual Deployment

1. Update the `base` path in `vite.config.ts` as described above.

2. Build the project:
   ```bash
   npm run build
   ```

3. Create a `gh-pages` branch (if it doesn't exist):
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   ```

4. Copy the contents of the `dist` folder to the root of the `gh-pages` branch:
   ```bash
   cp -r dist/* .
   ```

5. Commit and push:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

6. In your repository Settings → Pages, set the source to the `gh-pages` branch.

## Project Structure

```
arc-raiders/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── src/
│   ├── components/
│   │   ├── Card.tsx             # Reusable card component
│   │   └── Pill.tsx              # Badge/pill component
│   ├── data/
│   │   ├── loadouts.ts          # Loadout data
│   │   ├── plans.ts             # Adaptive plan data
│   │   └── routes.ts            # Route data
│   ├── App.tsx                  # Main app component with all sections
│   ├── main.tsx                 # React entry point
│   ├── index.css                # Tailwind CSS imports
│   └── types.ts                 # TypeScript type definitions
├── index.html                   # HTML entry point
├── package.json
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── README.md
```

## Notes

- The app uses British English spelling throughout the UI.
- All data is static and stored in TypeScript files - no external APIs are used.
- The XP planner uses a simplified flat XP model (10,000 XP per level) for estimation purposes.

## License

This project is provided as-is for personal use.


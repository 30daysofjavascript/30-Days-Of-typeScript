# ⚡ Quick Start Guide

## Prerequisites

- Node.js 18+ — [nodejs.org](https://nodejs.org)
- npm or yarn

## Setup (One-time)

```bash
# Clone the repo
git clone https://github.com/30daysofjavascript/30-Days-of-TypeScript.git
cd 30-Days-of-TypeScript

# Install TypeScript and ts-node
npm install

# Or globally:
npm install -g typescript ts-node
```

## Running Each Day

```bash
# Run a specific day directly (no compile step)
ts-node Day-01-Introduction-Setup/index.ts
ts-node Day-13-Generics-Basics/index.ts

# Compile all TypeScript
npm run build
# or: tsc

# Watch mode (auto-recompile on save)
npm run watch

# Type-check without emitting
npm run typecheck
```

## VS Code Setup (Recommended)

Install these extensions:
- **Error Lens** — show errors inline in the editor
- **Pretty TypeScript Errors** — readable error messages
- **TypeScript Hero** — auto-imports
- **Todo Tree** — navigate exercises

## TypeScript Playground

For quick experiments without setup:
**[typescriptlang.org/play](https://www.typescriptlang.org/play)**

## How to Get the Most Out of This Course

1. **Read index.ts carefully** — every concept is explained with comments
2. **Check the README.md** — quick reference and exercises for each day
3. **Type code yourself** — don't just read it
4. **Complete the exercises** at the bottom of each index.ts
5. **Hover over types** in VS Code — see inferred types in real time
6. **Break things** — introduce errors to see how TypeScript catches them

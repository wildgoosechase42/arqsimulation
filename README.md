# Stop-and-Wait ARQ Simulator & Interactive Lab

An interactive web-based virtual lab demonstrating the **Stop-and-Wait Automatic Repeat reQuest (ARQ)** data-link layer protocol. Features a smooth 3D globe hero scroll canvas, structured protocol theory, interactive pre/post assessment pop-outs with real-time speedometer gauges, and an integrated spaceship simulation lab.

---

## Architecture & Flow

1. **Hero Stage (Section 1):** Fullscreen interactive 3D Globe with smooth scroll transitions built using Three.js and React Three Fiber.
2. **Aim (Section 2):** Clear objective and learning outcome definition for the protocol experiment.
3. **Theory (Section 3):** Deep dive into frame transmission, positive acknowledgments (ACKs), timeout retransmission handling, and 1-bit sequence numbering ($0$ and $1$).
4. **Pretest (Section 4):** 5-question pop-out diagnostic test evaluated on an animated SVG speedometer gauge.
5. **Simulation (Section 5):** Interactive 2D crewmate minigame where users manually route frames, resolve timeouts, and verify checksums/ACKs across terminal nodes.
6. **Post test (Section 6):** 5-question pop-out mastery test measuring post-lab protocol comprehension.
7. **Ai use case (Section 7):** Real-world application of Stop-and-Wait ARQ in climate monitoring and IoT-based Automated Weather Stations (AWS).
8. **Conclusion (Section 8):** Protocol summary and interactive lab completion verification badge.

---

## Tech Stack

- **Framework:** React 18 / 19 + TypeScript + Vite
- **Styling:** Tailwind CSS (Custom Dark Theme with raw OKLCH & HEX tokens)
- **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animations:** Framer Motion / Motion
- **Package Manager:** `pnpm`

---

## Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js:** `>= 18.0.0`
- **pnpm:** `>= 8.0.0`

If `pnpm` is not installed globally:
```bash
corepack enable
corepack prepare pnpm@latest --activate
```

---

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/wildgoosechase42/arqsimulation.git
   cd arqsimulation
   ```

2. **Install project dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the local development server:**
   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to the local server URL (typically `http://localhost:5173`).

---

## Build & Production Deployment

To generate an optimized production build:

```bash
pnpm build
```

To locally preview the production build output:

```bash
pnpm preview
```

---

## Project Structure

```text
├── public/                 # Static assets and icons
├── src/
│   ├── components/         # Main page UI components
│   │   ├── Earth.tsx       # 3D Earth mesh & custom shaders
│   │   ├── Scene.tsx       # Three.js canvas scene manager
│   │   ├── Starfield.tsx   # Particle background
│   │   ├── Hero.tsx        # Section 1 hero overlay
│   │   ├── Navbar.tsx      # Sticky reveal navigation bar
│   │   ├── TheorySection.tsx # Aim & Theory protocol section
│   │   ├── PreTestSection.tsx # Pretest launch section
│   │   ├── SimulationSection.tsx # Interactive simulation section
│   │   ├── PostTestSection.tsx # Post test launch section
│   │   ├── AIUseCaseSection.tsx # Ai use case climate section
│   │   ├── TestModal.tsx   # Pop-out MCQ assessment modal
│   │   ├── Speedometer.tsx # SVG gauge needle visualizer
│   │   └── Conclusion.tsx  # Completion status card
│   ├── simulation/         # Among Us ARQ Simulation Module
│   │   ├── components/     # Minigame canvas, crewmate, stations
│   │   ├── constants.ts    # Game maps, collision bounds, configurations
│   │   ├── types.ts        # ARQ packet and state types
│   │   └── SimulationGame.tsx # Simulation entry component
│   ├── App.tsx             # Root scroll controller & stage coordinator
│   ├── index.css           # Custom theme variables & base styling
│   └── main.tsx            # Application entry point
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## Live Demo & Controls

**Live Demo:** https://arqsimulationv3.vercel.app/

### Controls & Interaction Guide

- **Hero Scroll:** Use mouse wheel or vertical scroll gestures to trigger the camera rotation and transition into the Aim & Theory sections.
- **Top Navigation:** Sticky navbar reveals automatically after scrolling past the Hero stage. Click links to jump to specific sections (`Aim`, `Theory`, `Pretest`, `Simulation`, `Post test`, `Ai use case`, `Conclusion`).
- **Assessments:** Click "Attempt Test" in the Pretest or Post test sections to open the interactive assessment modal. Complete the 5 questions to view your animated speedometer score gauge.
- **Spaceship Simulation:** Click "Play Simulation" to board the ship. Use `W`, `A`, `S`, `D` or Arrow keys to move, and `E` to interact with communication consoles. Press `Esc` or the exit button to return.

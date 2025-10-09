Project Specification: Path of the Prodigy

Version: 1.2
Date: October 8, 2025

1. Overview

"Path of the Prodigy" is a web-based companion application designed to guide a unique "snowflake" gameplay style for the MMORPG Old School RuneScape (OSRS). Inspired by community-created account restrictions, this project provides a structured, engaging, and novel progression path.

The core of the project is an interactive talent tree, created and curated via the **Tree Editor** utility. Players interact with the main application to spend "Prodigy Points" (PP) to unlock skills, equipment, minigames, and abilities defined in the talent tree. This turns account progression into a strategic, choice-driven experience.

This document specifies two distinct components:
- The main **Path of the Prodigy Application** (`app/index.html`), the player-facing progression tracker.
- The **Tree Editor** (`editor/TreeEditor.html`), a standalone authoring tool used to create and modify the talent tree itself.

2. Core Concept (Main Application)

The player's character is a "Prodigy"—an individual with immense potential but no practical knowledge. After the tutorial, their ability to interact with the game world is severely limited.

The gameplay loop is as follows:

1.  **Earn Prodigy Points (PP):** The player earns PP by completing in-game tasks, quests, or challenges.
2.  **Spend Points:** The player interacts with the "Path of the Prodigy" web application to spend their earned PP on the talent tree.
3.  **Unlock Abilities:** Spending PP unlocks a node on the tree, granting the player explicit permission to perform a new action in-game (e.g., use the Mining skill, wear Bronze armor).
4.  **Progress:** The player uses their newly unlocked abilities to tackle harder challenges, earn more PP, and unlock further nodes.

This system makes the web application the central "rule keeper" and progress tracker for the account.

3. Key Features & Functionality (Main Application)

The application is a single, unified interface designed to replicate the aesthetic of a polished OSRS game panel.

3.1. Main UI Frame & Header
- A fixed-size panel styled after the OSRS UI.
- A header bar displays current PP and navigation toggles for different views.

3.2. Main Content Views
- **Talent Tree View:** The primary view, displaying the interactive, unlockable talent tree created by the Tree Editor.
- **Skills View:** A grid displaying all OSRS skills, showing their locked/unlocked status and current level.
- **Quests View:** A list of quests showing their status (Not Started, In Progress, Complete).

3.3. Log Panel
- A panel at the bottom that displays a log of recent unlocks and system messages.

4. Visual Design & Aesthetic

The application's visual identity is an "OSRS-Hybrid," blending the classic game interface with modern, clean functionality.
- **Font:** `Press Start 2P` is used exclusively.
- **Colors & Borders:** The palette and UI panel styles are strictly limited to the OSRS UI conventions.
- **Icons:** Official OSRS icons are used wherever possible.

5. Technical Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+ Modules).
- **Frameworks:** None (Vanilla JS).
- **Dependencies:** Google Fonts, Font Awesome.
- **Architecture:** A single-page, client-side application.

---

## 6. Tree Editor

The Tree Editor is a standalone, client-side utility for creating, modifying, and saving the `TREE_DATA` object that powers the main application. It functions as a robust, visual authoring tool.

Following a major refactor, the editor's logic is no longer a single monolithic script but is now composed of `editor/TreeEditor.html`, `editor/TreeEditor.css`, and a collection of modular JavaScript files located in the `editor/js/` directory. This modular architecture is detailed in Section 8.

### 6.1. Overview & Layout
- The editor is a two-panel application with a large canvas on the left and a controls panel on the right.

### 6.2. Canvas Functionality
- **"Infinite" Canvas:** A large (50,000px x 50,000px) canvas provides a practically infinite area for tree creation.
- **Panning & Zooming:** The canvas can be panned by clicking and dragging the background and zoomed using the mouse wheel.
- **Grid & Snapping:** A "Snap to Grid" checkbox toggles whether nodes automatically snap to the nearest grid intersection when moved or created.
- **Node Selection & Interaction:**
    - **Single-Click:** Selects a single node.
    - **Shift-Click:** Adds or removes a node from the current selection.
    - **Box Selection:** Clicking and dragging on the background creates a selection box to select multiple nodes.
    - **Multi-Drag:** Multiple selected nodes can be dragged and moved across the canvas simultaneously.
    - **Deselection:** Clicking on the background or pressing the `Escape` key deselects all nodes.
- **Minimap:** A small map in the bottom-left corner provides an overview of the entire canvas.

### 6.3. Controls Panel & Editing Features

The right-hand panel provides all tools for populating and editing the tree.

#### 6.3.1. Node Library ("All Nodes")
- **Master List:** A filterable and searchable master list of all potential nodes (Skills, Quests, Raids, etc.).
- **Add to Canvas:** Clicking the `[+]` icon next to a node in the library adds it to the center of the current canvas view.
- **Usage Counter:** A counter displays the number of nodes used versus the total available in the current filtered view.

#### 6.3.2. Node Manipulation (on Selection)
- **Info Box:** Displays the name and X/Y coordinates of the selected node.
- **Delete Node:** Deletes all currently selected nodes.
- **Link Mode:** A "Link/Unlink Children" button to enter a mode for editing dependencies.
- **Quick-Add & Link Mode:** A streamlined workflow for rapidly expanding the tree from a parent node.
- **Edit Panel (Single Selection Only):** Allows for renaming, description editing, resizing, and icon changes for a single selected node.

#### 6.3.3. Persistence (Save/Load)
- **Save to File:** Serializes the current tree state into a downloadable `.json` file.
- **Load from File:** Parses a selected `.json` file to completely overwrite and load a tree state.

## 7. Future Considerations

- **Task Generation System:** Implement a system within the main application to generate tasks for the player to complete, which will be the primary source of PP.
- **Shareable Builds:** Implement functionality to generate a unique URL that represents a player's current talent tree build.
- **Mobile Responsiveness:** Adapt the UI for a seamless experience on mobile devices.
- **Tree Expansion:** The Tree Editor now supports the creation of a vast tree. The next step is to use it to build out the complete, balanced talent tree for the main application.

---

## 8. Technical Architecture & State

This section details the current file structure and the architecture of the JavaScript modules, primarily for the Tree Editor. It serves as a technical reference for AI-assisted development.

### 8.1. File Structure

The project is organized into two main subdirectories:

-   `/app`: Contains the player-facing Path of the Prodigy application (`index.html`, `style.css`, `script.js`).
-   `/editor`: Contains the standalone Tree Editor utility.
    -   `TreeEditor.html`: The editor's main page.
    -   `TreeEditor.css`: The editor's stylesheet.
    -   `/js`: The modular JavaScript source for the editor.

### 8.2. Tree Editor JavaScript Architecture (`/editor/js/`)

The editor's JavaScript is modular, with a central entry point in `main.js`.

-   `main.js`: Initializes all modules and sets up global event listeners to coordinate between them.
-   `/constants`: Contains static, read-only data.
    -   `icons.js`: Exports arrays of icon URLs.
    -   `masterNodeLibrary.js`: Exports the `MASTER_NODE_LIBRARY` object containing data for all potential nodes.
-   `/dom`:
    -   `elements.js`: Selects and exports all necessary DOM element references for use across all modules.
-   `/state`:
    -   `appState.js`: Exports the global `state` object, which holds all mutable application data (e.g., `TREE_DATA`, `selectedNodeIds`, canvas position, interaction modes).
-   `/features`: Contains the core logic, separated by feature.
    -   `renderer.js`: **The View Layer.** A critical module that handles all DOM manipulation and rendering. It exports functions like `renderAll()`, `renderNodes()`, `renderLines()`, etc. Other modules call these functions to update the UI.
    -   `canvas.js`: Handles canvas interactions like panning, zooming, and minimap clicks. It calls the `renderer` to apply visual changes.
    -   `nodes.js`: Handles the logic for creating, deleting, dragging, and editing nodes.
    -   `linking.js`: Manages the logic for entering/exiting "link mode" and creating/destroying node dependencies.
    -   `shapes.js`: Handles the logic for creating predefined shapes of nodes (grids, circles, etc.).
    -   `io.js`: Manages saving the tree to a JSON file and loading a tree from a file.
    -   `ui.js`: Manages UI elements not directly on the canvas, such as the pop-out node list panel.
-   `/utils`:
    -   `transformations.js`: Contains mathematical logic for multi-node transformations (rotate, flip, scale).

### 8.3. Current Development State

-   **Refactoring Complete:** The `TreeEditor.js` monolith has been successfully refactored into the modular structure described above.
-   **File Organization Complete:** The project files have been organized into `/app` and `/editor` directories.
-   **Known Issue:** Several icon URLs hardcoded in `editor/js/constants/masterNodeLibrary.js` are resulting in 404 (Not Found) errors and need to be updated. The search for correct URLs was initiated but not completed.
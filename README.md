# Path of the Prodigy

"Path of the Prodigy" is a web-based companion application for a unique "snowflake" gameplay style in Old School RuneScape. It provides a structured, engaging progression path through an interactive talent tree.

This repository contains two main components: the player-facing application and a standalone editor for creating the talent tree.

## Project Structure

```
/
├── app/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── editor/
│   ├── TreeEditor.css
│   ├── TreeEditor.html
│   └── js/
│       ├── main.js
│       ├── constants/
│       │   ├── icons.js
│       │   └── masterNodeLibrary.js
│       ├── dom/
│       │   └── elements.js
│       ├── features/
│       │   ├── canvas.js
│       │   ├── io.js
│       │   ├── linking.js
│       │   ├── nodes.js
│       │   ├── renderer.js
│       │   ├── shapes.js
│       │   └── ui.js
│       ├── state/
│       │   └── appState.js
│       └── utils/
│           └── transformations.js
├── README.md
└── spec.md
```

The repository is organized into two main directories: `/app` and `/editor`.

### Main Application (`/app`)

This is the player-facing application for tracking progression.

-   `app/index.html`: The main HTML file for the application.
-   `app/style.css`: The stylesheet for the application.
-   `app/script.js`: The JavaScript logic for the application.

### Tree Editor (`/editor`)

This is a standalone utility for creating and modifying the skill tree.

-   `editor/TreeEditor.html`: The main HTML file for the editor.
-   `editor/TreeEditor.css`: The stylesheet for the editor.
-   `editor/js/`: Contains the modular JavaScript for the editor.
    -   `editor/js/main.js`: The main entry point for the editor's JavaScript, which initializes all modules and sets up global event listeners.
    -   `editor/js/constants/`: Contains static data.
        - `icons.js`: Exports arrays of icon URLs.
        - `masterNodeLibrary.js`: Exports the master list of all potential nodes (skills, quests, etc.).
    -   `editor/js/dom/`:
        - `elements.js`: Selects and exports all necessary DOM element references.
    -   `editor/js/features/`: Contains the core logic for the editor's features.
        - `renderer.js`: The view layer, responsible for all rendering and DOM updates.
        - `canvas.js`: Handles canvas interactions like panning, zooming, and minimap clicks.
        - `nodes.js`: Manages the lifecycle of nodes (creation, deletion, dragging, editing).
        - `linking.js`: Manages the logic for creating and removing node dependencies.
        - `shapes.js`: Handles the creation of predefined node patterns (grids, circles, etc.).
        - `io.js`: Manages saving and loading the tree data to/from a JSON file.
        - `ui.js`: Manages UI elements not directly on the canvas, like the pop-out node list.
    -   `editor/js/state/`:
        - `appState.js`: Exports the global `state` object that holds all dynamic application data.
    -   `editor/js/utils/`:
        - `transformations.js`: Contains the logic for multi-node transformations (rotate, flip, scale).

### Root Files

-   `README.md`: This file, providing an overview of the project.
-   `spec.md`: The detailed project specification document for development.
# Path of the Prodigy

## Overview

"Path of the Prodigy" is a web-based companion application for the MMORPG Old School RuneScape (OSRS). It's designed to guide a unique "snowflake" gameplay style where players must unlock skills, items, and content through an interactive talent tree, rather than having them available by default.

This project consists of two main parts:

1.  **The Main Application (`index.html`):** A player-facing app that displays the talent tree and tracks a player's progress and unlocks.
2.  **The Tree Editor (`TreeEditor.html`):** A powerful, standalone authoring tool for creating, editing, and managing the talent trees used by the main application.

## File Structure

-   `index.html`: The main player-facing application.
-   `script.js`: JavaScript for the main application.
-   `style.css`: CSS for the main application.
-   `TreeEditor.html`: The standalone talent tree editor.
-   `spec.md`: The detailed project specification document.

## How to Use

### Tree Editor (`TreeEditor.html`)

The Tree Editor is the heart of the content creation process. Use it to build and define the structure of your talent tree.

**Features:**
-   **Build from a Master List:** The "All Nodes" panel contains a comprehensive, categorized, and searchable library of OSRS skills, quests, raids, and items. Click the `[+]` button to add any node to your canvas.
-   **Visual Editing:** Drag and drop nodes on a vast, pannable, and zoomable canvas.
-   **Minimap:** A minimap in the corner allows for quick navigation of large trees.
-   **Node Customization:** Select a node to:
    -   Rename it.
    -   Change its size (`Minor`, `Major`, `Epic`, `Legendary`).
    -   Edit its description with template support.
    -   Change its icon from a large pool of in-game images.
-   **Linking:** Use the "Link Mode" to quickly create or remove parent-child dependencies by clicking on nodes.
-   **Quick-Add & Link:** A special mode to rapidly add and link new child nodes from the library to a selected parent.
-   **Dynamic Counter:** The node library shows a live `used/total` count that updates as you filter and add nodes.
-   **Save/Load:** Save your tree progress to a `.json` file on your computer and load it back into the editor at any time.

**Workflow:**
1.  Open `TreeEditor.html` in your browser.
2.  Use the "All Nodes" list to add skills, quests, and other unlocks to the canvas.
3.  Arrange, resize, and customize your nodes.
4.  Use "Link Mode" to define the dependencies and create your tree structure.
5.  Click "Save Tree to File" to download your `skill-tree.json` file.

### Main Application (`index.html`)

The main application is where a player would interact with a finished tree. (Note: The logic to load and use the JSON file in this part of the application is a future goal).

---
*This README was last updated on October 7, 2025.*

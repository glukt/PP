Project Specification: Path of the Prodigy

Version: 1.1
Date: October 7, 2025

1. Overview

"Path of the Prodigy" is a web-based companion application designed to guide a unique "snowflake" gameplay style for the MMORPG Old School RuneScape (OSRS). Inspired by community-created account restrictions, this project provides a structured, engaging, and novel progression path.

The core of the project is an interactive talent tree, created and curated via the **Tree Editor** utility. Players interact with the main application to spend "Prodigy Points" (PP) to unlock skills, equipment, minigames, and abilities defined in the talent tree. This turns account progression into a strategic, choice-driven experience.

This document specifies two distinct components:
- The main **Path of the Prodigy Application** (`index.html`), the player-facing progression tracker.
- The **Tree Editor** (`TreeEditor.html`), a standalone authoring tool used to create and modify the talent tree itself.

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

- **Frontend:** HTML5, CSS3, JavaScript (ES6+).
- **Frameworks:** None (Vanilla JS).
- **Dependencies:** Google Fonts, Font Awesome.
- **Architecture:** A single-page, client-side application.

---

## 6. Tree Editor

The Tree Editor is a standalone, client-side utility for creating, modifying, and saving the `TREE_DATA` object that powers the main application. It functions as a robust, visual authoring tool, now composed of `TreeEditor.html`, `TreeEditor.css`, and `TreeEditor.js`.

### 6.1. Overview & Layout
- The editor is a two-panel application with a large canvas on the left and a controls panel on the right.

### 6.2. Canvas Functionality
- **"Infinite" Canvas:** A large (50,000px x 50,000px) canvas provides a practically infinite area for tree creation.
- **Panning & Zooming:** The canvas can be panned by clicking and dragging the background and zoomed using the mouse wheel.
- **Grid & Snapping:** A visible 25px grid is displayed on the canvas. A "Snap to Grid" checkbox toggles whether nodes automatically snap to the nearest grid intersection when moved or created.
- **Node Selection & Interaction:**
    - **Single-Click:** Selects a single node.
    - **Shift-Click:** Adds or removes a node from the current selection.
    - **Box Selection:** Clicking and dragging on the background creates a selection box to select multiple nodes.
    - **Multi-Drag:** Multiple selected nodes can be dragged and moved across the canvas simultaneously.
    - **Deselection:** Clicking on the background or pressing the `Escape` key deselects all nodes.
- **Minimap:** A small map in the bottom-left corner provides an overview of the entire canvas.
    - It displays a scaled-down representation of all nodes.
    - A viewport rectangle shows the current position of the main canvas view.
    - Clicking and dragging within the minimap allows for rapid panning across large distances.

### 6.3. Controls Panel & Editing Features

The right-hand panel provides all tools for populating and editing the tree.

#### 6.3.1. Node Library ("All Nodes")
- **Master List:** This panel contains a master list of all potential nodes that can be added to the tree, including all OSRS Skills, Quests, Raids, and various equipment/item unlocks.
- **Add to Canvas:** Nodes in the list not currently on the canvas are marked with a `[+]`. Clicking them adds them to the center of the current canvas view.
- **Categories & Search:** The list is organized by categories (e.g., Skills, Quests, Armour, Weapons, Raids). A search bar and category buttons allow for live, instantaneous filtering of the list.
- **Usage Counter:** A counter at the top of the panel displays the number of nodes used versus the total available in the current filtered view (e.g., `1/3` if one of the three Raid nodes has been placed).

#### 6.3.2. Node Manipulation (on Selection)
When one or more nodes are selected on the canvas, a contextual set of tools appears:
- **Info Box:** Displays the name and X/Y coordinates of the selected node.
- **Delete Node:** A button to delete all currently selected nodes from the canvas.
- **Link Mode:** A "Link/Unlink Children" button to enter a special mode for editing dependencies.
    - While active, clicking any other node will toggle its dependency on the originally selected "parent" node.
    - An "Unlink All Children" button also appears, allowing for bulk removal of all dependencies from the parent.
- **Quick-Add & Link Mode:** A streamlined workflow for rapidly expanding the tree. After clicking the button, the next node clicked on the canvas becomes the parent, and any subsequent nodes added from the Node Library will be automatically placed near and linked as its child.
- **Edit Panel (Single Selection Only):**
    - **Rename:** Change the `name` of the selected node.
    - **Edit Description:** A textarea to edit the node's `desc` property, with helper buttons for canned templates (e.g., "Unlock the [NAME] skill.").
    - **Resize Node:** Buttons to change the node's size by assigning a `type` (`minor`, `major`, `epic`, `legendary`).
    - **Icon Picker:** A gallery of all available icons. Clicking an icon instantly changes the selected node's `icon` property.

#### 6.3.3. Persistence (Save/Load)
- **Save to File:** A button that serializes the current state of the `TREE_DATA` object into a formatted `.json` file and triggers a browser download.
- **Load from File:** A button that opens a file dialog. The user can select a previously saved `.json` file, which will be parsed, validated, and used to completely overwrite the current tree state, instantly loading the saved project.

## 7. Future Considerations

- **Task Generation System:** Implement a system within the main application to generate tasks for the player to complete, which will be the primary source of PP.
- **Shareable Builds:** Implement functionality to generate a unique URL that represents a player's current talent tree build.
- **Mobile Responsiveness:** Adapt the UI for a seamless experience on mobile devices.
- **Tree Expansion:** The Tree Editor now supports the creation of a vast tree. The next step is to use it to build out the complete, balanced talent tree for the main application.

Project Specification: Path of the Prodigy

Version: 1.0
Date: October 6, 2025
1. Overview

"Path of the Prodigy" is a web-based companion application designed to guide a unique "snowflake" gameplay style for the MMORPG Old School RuneScape (OSRS). Inspired by community-created account restrictions like Tileman and Bronzeman, this project provides a structured, engaging, and novel progression path.

The core of the project is an interactive talent tree, similar in concept to the one in Path of Exile. Players start with only the most basic in-game abilities and must use the web application to spend "Prodigy Points" (PP) to unlock every other skill, piece of equipment, minigame, and significant ability. This turns account progression into a strategic, choice-driven experience managed entirely through the web interface.
2. Core Concept

The player's character is a "Prodigy"—an individual with immense potential but no practical knowledge. After the tutorial, their ability to interact with the game world is severely limited.

The gameplay loop is as follows:

    Earn Prodigy Points (PP): The player earns PP by completing in-game tasks, quests, or challenges. (The specific mechanism for task generation is a future consideration, but for now, PP is the central currency).

    Spend Points: The player interacts with the "Path of the Prodigy" web application to spend their earned PP on a vast talent tree.

    Unlock Abilities: Spending PP unlocks a node on the tree, which grants the player explicit permission to perform a new action in-game (e.g., use the Mining skill, wear Bronze armor, enter a specific guild).

    Progress: The player uses their newly unlocked abilities to tackle harder challenges, earn more PP, and unlock further nodes on the tree.

This system makes the web application the central "rule keeper" and progress tracker for the account.
3. Key Features & Functionality

The application is a single, unified interface designed to replicate the aesthetic of a polished OSRS game panel.
3.1 Main UI Frame

    The entire application is contained within a single, fixed-size panel styled after the OSRS UI.

    Styling: Features a textured brown background, a 2px black outer border, and a 2px golden-brown inner bevel, as per the reference images.

3.2 Header Bar

    A fixed header at the top of the main panel contains key status information and navigation.

    Resource Display (Top-Left):

        Displays the player's current Prodigy Points (PP), represented by the OSRS "Coins" icon.

        Includes a placeholder for a secondary currency (e.g., "Keys").

    Title (Center): Displays the project title, "Path of the Prodigy."

    View Toggles (Top-Right):

        Three clickable icons (Talent Tree, Skills, Quests) allow the user to switch between the main content views.

        The active icon appears "pressed" with an inverted bevel to indicate the current view.

3.3 Main Content Views

    The area below the header displays one of three views, selected by the top-right toggle icons.

3.3.1 Talent Tree View (Default)

    Background: A pure black, high-contrast background to make the tree elements stand out.

    Nodes (Orbs): Circular orbs represent unlockable talents.

        Tiers:

            Major Orbs: Large orbs representing significant unlocks (e.g., a new skill like "Slayer" or "Construction"). They serve as hubs for related sub-perks.

            Minor Orbs: Smaller orbs representing incremental perks or sub-abilities that branch off from Major Orbs (e.g., "Mahogany Homes," "Plank Sack").

        States & Visuals:

            Locked: The orb is dim, desaturated, and has a metallic grey border. A prominent, metallic-style padlock icon is displayed in the center.

            Available: The orb is fully colored and outlined with a vibrant blue border and glow. It is clickable.

            Unlocked: The orb is fully colored and outlined with a vibrant gold border and glow. A prominent green checkmark icon is displayed in the center.

    Connections:

        Lines are drawn between dependent nodes using SVG bezier curves to create an organic, interlinked feel.

        Lines physically connect to the edges of the orbs.

        A line connecting to an unlocked node will be colored gold, clearly indicating available progression paths. All other lines are a dim grey.

    Tooltips: Hovering over any non-locked node reveals a tooltip with an OSRS panel style, showing the node's name, description, and PP cost.

3.3.2 Skills View

    Replicates the OSRS skills tab from the reference image.

    A grid displays all 23 OSRS skills.

    Locked Skills: The skill slot has a dark background, a dimmed/desaturated icon, and is overlaid with a metallic padlock icon.

    Unlocked Skills: The skill icon is fully colored, the slot has a golden border, and the player's current level is displayed in the top-left corner with yellow text.

3.3.3 Quests View

    A simple list of quests.

    Each quest has a colored status dot to its left:

        Red: Not Started

        Orange/Yellow: In Progress

        Green: Complete

3.4 Log Panel

    A fixed panel at the bottom of the main UI frame displays a log of events.

    Functionality: Shows recent unlocks and system messages in reverse chronological order (newest at the bottom).

    Styling: Features a semi-transparent black background and color-coded text (e.g., green for unlocks, red for system messages).

4. Visual Design & Aesthetic

The application's visual identity is an "OSRS-Hybrid," blending the classic game interface with modern, clean functionality. The primary design goal is to match the provided reference images as closely as possible.

    Font: Press Start 2P is used exclusively to maintain the retro, pixelated feel.

    Colors: The palette is strictly limited to the OSRS UI colors: textured browns, black, gold/yellow, and orange.

    Borders & Panels: All UI elements use the characteristic OSRS double border (black outer, golden-brown inner) to create a sense of depth and authenticity.

    Icons: Official OSRS skill icons are used wherever possible. Generic actions are represented by high-quality, pixel-art-friendly icons (e.g., from Font Awesome, styled to fit).

5. Gameplay Loop Example

    A new player starts with 10 PP. The web app shows only the "Genesis" node unlocked (gold). The three primary paths ("Path of Might," "Path of Craft," "Path of Mind") are available (blue).

    The player decides to become an artisan and clicks the "Path of Craft" orb.

    1 PP is deducted. The "Path of Craft" orb turns gold and displays a checkmark.

    The line connecting "Genesis" to "Path of Craft" turns gold.

    The "Artisan Hub" node, which is connected to "Path of Craft," now becomes available (turns blue). The line between them remains grey.

    The player, now on the Path of Craft, is permitted to begin tasks related to this path to earn more PP.

6. Technical Stack

    Frontend: HTML5, CSS3, JavaScript (ES6+).

    Frameworks: None. The project is a vanilla JS application to maintain simplicity and performance.

    Dependencies: Google Fonts (for 'Press Start 2P'), Font Awesome (for generic icons).

    Architecture: A single-page, client-side application. All data and state are managed within the browser. It does not interact with or modify the OSRS game client in any way.

7. Future Considerations

    Task Generation System: Implement a system within the app to generate tasks for the player to complete, which will be the primary source of PP. This could range from simple ("Mine 100 Iron Ore") to complex ("Complete the 'Dragon Slayer' quest").

    Persistent State: Integrate a mechanism for players to save and load their progress (e.g., using localStorage, file export/import, or a simple backend with user accounts).

    Tree Expansion: Design and add more skill clusters and paths to the talent tree to cover all aspects of OSRS gameplay, including high-level content.

    Shareable Builds: Implement functionality to generate a unique URL that represents a player's current talent tree build, allowing them to share their progress and strategy with others.

    Mobile Responsiveness: Adapt the UI for a seamless experience on mobile devices.
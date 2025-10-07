document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIG & DATA ---
    const SKILL_DATA = {
        Attack: { icon: 'https://oldschool.runescape.wiki/images/Attack_icon.png' },
        Strength: { icon: 'https://oldschool.runescape.wiki/images/Strength_icon.png' },
        Defence: { icon: 'https://oldschool.runescape.wiki/images/Defence_icon.png' },
        Ranged: { icon: 'https://oldschool.runescape.wiki/images/Ranged_icon.png' },
        Prayer: { icon: 'https://oldschool.runescape.wiki/images/Prayer_icon.png' },
        Magic: { icon: 'https://oldschool.runescape.wiki/images/Magic_icon.png' },
        Runecraft: { icon: 'https://oldschool.runescape.wiki/images/Runecraft_icon.png' },
        Construction: { icon: 'https://oldschool.runescape.wiki/images/Construction_icon.png' },
        Hitpoints: { icon: 'https://oldschool.runescape.wiki/images/Hitpoints_icon.png' },
        Agility: { icon: 'https://oldschool.runescape.wiki/images/Agility_icon.png' },
        Herblore: { icon: 'https://oldschool.runescape.wiki/images/Herblore_icon.png' },
        Thieving: { icon: 'https://oldschool.runescape.wiki/images/Thieving_icon.png' },
        Crafting: { icon: 'https://oldschool.runescape.wiki/images/Crafting_icon.png' },
        Fletching: { icon: 'https://oldschool.runescape.wiki/images/Fletching_icon.png' },
        Slayer: { icon: 'https://oldschool.runescape.wiki/images/Slayer_icon.png' },
        Hunter: { icon: 'https://oldschool.runescape.wiki/images/Hunter_icon.png' },
        Mining: { icon: 'https://oldschool.runescape.wiki/images/Mining_icon.png' },
        Smithing: { icon: 'https://oldschool.runescape.wiki/images/Smithing_icon.png' },
        Fishing: { icon: 'https://oldschool.runescape.wiki/images/Fishing_icon.png' },
        Cooking: { icon: 'https://oldschool.runescape.wiki/images/Cooking_icon.png' },
        Firemaking: { icon: 'https://oldschool.runescape.wiki/images/Firemaking_icon.png' },
        Woodcutting: { icon: 'https://oldschool.runescape.wiki/images/Woodcutting_icon.png' },
        Farming: { icon: 'https://oldschool.runescape.wiki/images/Farming_icon.png' },
    };

    let PLAYER_STATE = {
        pp: 10,
        skills: Object.keys(SKILL_DATA).reduce((acc, skill) => {
            acc[skill] = { level: 1, unlocked: false };
            return acc;
        }, {}),
        quests: [
            { name: "Cook's Assistant", status: 'complete' },
            { name: 'Dragon Slayer', status: 'in_progress' },
            { name: 'The Restless Ghost', status: 'not_started' },
        ]
    };
    PLAYER_STATE.skills.Attack.unlocked = true;
    PLAYER_STATE.skills.Strength.unlocked = true;
    PLAYER_STATE.skills.Defence.unlocked = true;
    PLAYER_STATE.skills.Hitpoints.unlocked = true;
    PLAYER_STATE.skills.Hitpoints.level = 10;

    let TREE_DATA = {
        genesis: { type: 'major', name: 'Genesis', desc: 'The origin point of your journey.', cost: 0, status: 'unlocked', deps: [], pos: { x: '50%', y: '50%' }, icon: 'https://oldschool.runescape.wiki/images/Achievement_Diaries_icon.png' },
        // Paths
        path_might: { type: 'major', name: 'Path of Might', desc: 'Focus on combat skills.', cost: 1, status: 'available', deps: ['genesis'], pos: { x: '50%', y: '35%' }, icon: 'https://oldschool.runescape.wiki/images/Combat_icon.png' },
        path_craft: { type: 'major', name: 'Path of Craft', desc: 'Focus on artisan skills.', cost: 1, status: 'available', deps: ['genesis'], pos: { x: '30%', y: '50%' }, icon: 'https://oldschool.runescape.wiki/images/Hammer_detail.png' },
        path_mind: { type: 'major', name: 'Path of Mind', desc: 'Focus on utility and magic.', cost: 1, status: 'available', deps: ['genesis'], pos: { x: '70%', y: '50%' }, icon: 'https://oldschool.runescape.wiki/images/Book_of_knowledge_detail.png' },
        // Might Unlocks
        ranged: { type: 'major', name: 'Ranged', desc: 'Unlock the Ranged skill.', cost: 3, status: 'locked', deps: ['path_might'], pos: { x: '65%', y: '25%' }, icon: SKILL_DATA.Ranged.icon },
        prayer: { type: 'major', name: 'Prayer', desc: 'Unlock the Prayer skill.', cost: 3, status: 'locked', deps: ['path_might'], pos: { x: '35%', y: '25%' }, icon: SKILL_DATA.Prayer.icon },
        slayer: { type: 'major', name: 'Slayer', desc: 'Unlock the Slayer skill.', cost: 5, status: 'locked', deps: ['path_might'], pos: { x: '50%', y: '10%' }, icon: SKILL_DATA.Slayer.icon },
        slayer_helmet: { type: 'minor', name: 'Slayer Helmet', desc: 'Ability to craft the Slayer Helmet.', cost: 4, status: 'locked', deps: ['slayer'], pos: { x: '40%', y: '5%' }, icon: 'https://oldschool.runescape.wiki/images/Slayer_helmet_detail.png' },

        // Craft Unlocks
        gathering: { type: 'major', name: 'The Gatherer', desc: 'Unlock basic gathering skills.', cost: 2, status: 'locked', deps: ['path_craft'], pos: { x: '10%', y: '50%' }, icon: 'https://oldschool.runescape.wiki/images/Butterfly_net_detail.png' },
        woodcutting: { type: 'minor', name: 'Woodcutting', desc: 'Unlock the Woodcutting skill.', cost: 2, status: 'locked', deps: ['gathering'], pos: { x: '10%', y: '30%' }, icon: SKILL_DATA.Woodcutting.icon },
        mining: { type: 'minor', name: 'Mining', desc: 'Unlock the Mining skill.', cost: 2, status: 'locked', deps: ['gathering'], pos: { x: '10%', y: '70%' }, icon: SKILL_DATA.Mining.icon },
        fishing: { type: 'minor', name: 'Fishing', desc: 'Unlock the Fishing skill.', cost: 2, status: 'locked', deps: ['gathering'], pos: { x: '0%', y: '50%' }, icon: SKILL_DATA.Fishing.icon },
        artisan: { type: 'major', name: 'The Artisan', desc: 'Unlock basic production skills.', cost: 2, status: 'locked', deps: ['path_craft'], pos: { x: '30%', y: '20%' }, icon: 'https://oldschool.runescape.wiki/images/Crafting_icon.png' },
        smithing: { type: 'minor', name: 'Smithing', desc: 'Unlock the Smithing skill.', cost: 2, status: 'locked', deps: ['artisan', 'mining'], pos: { x: '15%', y: '85%' }, icon: SKILL_DATA.Smithing.icon },
        crafting: { type: 'minor', name: 'Crafting', desc: 'Unlock the Crafting skill.', cost: 2, status: 'locked', deps: ['artisan'], pos: { x: '30%', y: '5%' }, icon: SKILL_DATA.Crafting.icon },
        fletching: { type: 'minor', name: 'Fletching', desc: 'Unlock the Fletching skill.', cost: 2, status: 'locked', deps: ['artisan', 'woodcutting'], pos: { x: '18%', y: '15%' }, icon: SKILL_DATA.Fletching.icon },
        cooking: { type: 'minor', name: 'Cooking', desc: 'Unlock the Cooking skill.', cost: 2, status: 'locked', deps: ['artisan', 'fishing'], pos: { x: '-5%', y: '35%' }, icon: SKILL_DATA.Cooking.icon },

        // Mind Unlocks
        magic: { type: 'major', name: 'Magic', desc: 'Unlock the Magic skill.', cost: 5, status: 'locked', deps: ['path_mind'], pos: { x: '85%', y: '50%' }, icon: SKILL_DATA.Magic.icon },
        runecraft: { type: 'minor', name: 'Runecraft', desc: 'Unlock the Runecraft skill.', cost: 3, status: 'locked', deps: ['magic'], pos: { x: '95%', y: '40%' }, icon: SKILL_DATA.Runecraft.icon },
        teleportation: { type: 'minor', name: 'Teleportation', desc: 'Unlock basic teleports.', cost: 2, status: 'locked', deps: ['magic'], pos: { x: '85%', y: '30%' }, icon: 'https://oldschool.runescape.wiki/images/Home_Teleport_icon.png' },
        agility: { type: 'major', name: 'Agility', desc: 'Unlock the Agility skill.', cost: 3, status: 'locked', deps: ['path_mind'], pos: { x: '70%', y: '75%' }, icon: SKILL_DATA.Agility.icon },
        thieving: { type: 'major', name: 'Thieving', desc: 'Unlock the Thieving skill.', cost: 3, status: 'locked', deps: ['path_mind'], pos: { x: '80%', y: '80%' }, icon: SKILL_DATA.Thieving.icon },
    };

    let TASK_DATA = [
        { id: 'chop_logs', desc: 'Chop 50 normal logs', reward: 1, status: 'incomplete' },
        { id: 'chop_oaks', desc: 'Chop 100 Oak logs', reward: 3, status: 'incomplete' },
        { id: 'mine_copper', desc: 'Mine 75 Copper ore', reward: 2, status: 'incomplete' },
        { id: 'mine_iron', desc: 'Mine 150 Iron ore', reward: 4, status: 'incomplete' },
        { id: 'fish_shrimp', desc: 'Fish 100 Shrimps', reward: 2, status: 'incomplete' },
        { id: 'fish_trout', desc: 'Fish 100 Trout', reward: 4, status: 'incomplete' },
        { id: 'cook_trout', desc: 'Cook 100 Trout', reward: 4, status: 'incomplete' },
        { id: 'smith_bronze_bar', desc: 'Smith 50 Bronze bars', reward: 3, status: 'incomplete' },
        { id: 'smith_iron_platebody', desc: 'Smith an Iron platebody', reward: 5, status: 'incomplete' },
        { id: 'fletch_headless_arrows', desc: 'Fletch 250 headless arrows', reward: 3, status: 'incomplete' },
        { id: 'kill_cows', desc: 'Kill 25 Cows in Lumbridge', reward: 1, status: 'incomplete' },
        { id: 'kill_goblins', desc: 'Kill 50 Goblins', reward: 2, status: 'incomplete' },
        { id: 'complete_cooks_assistant', desc: "Complete the Cook's Assistant quest", reward: 5, status: 'incomplete' },
        { id: 'bury_bones', desc: 'Bury 50 bones', reward: 2, status: 'incomplete' },
    ];

    // --- DOM ELEMENTS ---
    const ppDisplay = document.getElementById('pp-display');
    const logContainer = document.getElementById('log');
    const treeView = document.getElementById('talent-tree-view');
    const treeCanvas = document.getElementById('tree-canvas');
    const treeContainer = document.getElementById('tree-container');
    const treeSvg = document.getElementById('tree-svg');
    const statsGrid = document.getElementById('stats-grid-container');
    const questList = document.getElementById('quest-list-container');
    const taskListContainer = document.getElementById('task-list-container');
    const toggleIcons = document.querySelectorAll('.toggle-icon');
    const contentViews = document.querySelectorAll('.content-view');

    // --- PANNING LOGIC ---
    let isPanning = false;
    let startX, startY;
    let canvasX = 0, canvasY = 0;
    let initialCanvasX = 0, initialCanvasY = 0;

    treeView.addEventListener('mousedown', (e) => {
        if (e.target.closest('.node')) return;
        isPanning = true;
        startX = e.clientX;
        startY = e.clientY;
        initialCanvasX = canvasX;
        initialCanvasY = canvasY;
        treeView.style.cursor = 'grabbing';
    });

    treeView.addEventListener('mouseleave', () => {
        isPanning = false;
        treeView.style.cursor = 'grab';
    });

    treeView.addEventListener('mouseup', () => {
        isPanning = false;
        treeView.style.cursor = 'grab';
    });

    treeView.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        e.preventDefault();
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        canvasX = initialCanvasX + dx;
        canvasY = initialCanvasY + dy;
        treeCanvas.style.transform = `translate(${canvasX}px, ${canvasY}px)`;
        drawConnections(); // Redraw lines live while panning
    });

    // --- CORE LOGIC ---

    const addLog = (message, type) => {
        const p = document.createElement('p');
        p.innerHTML = `<span class="log-type log-${type}">${type}:</span> ${message}`;
        logContainer.prepend(p);
    };

    const updateResources = () => {
        ppDisplay.textContent = PLAYER_STATE.pp;
    };

    const switchView = (viewId) => {
        contentViews.forEach(v => v.classList.remove('active'));
        document.getElementById(viewId)?.classList.add('active');

        toggleIcons.forEach(i => i.classList.remove('active'));
        document.querySelector(`.toggle-icon[data-view="${viewId}"]`)?.classList.add('active');
        
        if (viewId === 'talent-tree-view') {
            setTimeout(drawConnections, 50);
        }
    };

    const unlockNode = (nodeId) => {
        const node = TREE_DATA[nodeId];
        if (!node || node.status !== 'available' || PLAYER_STATE.pp < node.cost) return;

        PLAYER_STATE.pp -= node.cost;
        node.status = 'unlocked';

        if (PLAYER_STATE.skills[node.name]) {
            PLAYER_STATE.skills[node.name].unlocked = true;
        }

        addLog(`Unlocked '${node.name}'`, 'unlock');
        updateResources();
        updateNodeStatuses();
        renderTree();
        renderSkills();
    };

    const updateNodeStatuses = () => {
        Object.keys(TREE_DATA).forEach(id => {
            const node = TREE_DATA[id];
            if (node.status === 'locked') {
                const allDepsMet = node.deps.every(depId => TREE_DATA[depId]?.status === 'unlocked');
                if (allDepsMet) {
                    node.status = 'available';
                }
            }
        });
    };

    const claimTask = (taskId) => {
        const task = TASK_DATA.find(t => t.id === taskId);
        if (!task || task.status !== 'incomplete') return;

        task.status = 'complete';
        PLAYER_STATE.pp += task.reward;

        addLog(`Task complete: '${task.desc}'. +${task.reward} PP.`, 'info');
        updateResources();
        renderTasks();
        renderTree();
    };

    // --- RENDER FUNCTIONS ---

    function renderTree() {
        treeContainer.innerHTML = '';
        Object.keys(TREE_DATA).forEach(id => {
            const node = TREE_DATA[id];
            const nodeEl = document.createElement('div');
            nodeEl.id = id;
            nodeEl.className = `node node-${node.type} ${node.status}`;
            nodeEl.style.left = node.pos.x;
            nodeEl.style.top = node.pos.y;
            nodeEl.style.transform = 'translate(-50%, -50%)';

            const iconHtml = `<img src="${node.icon}" class="node-icon">`;

            let overlayIcon = '';
            if (node.status === 'locked') {
                overlayIcon = '<i class="fas fa-lock"></i>';
            } else if (node.status === 'unlocked') {
                overlayIcon = '<i class="fas fa-check"></i>';
            }

            const canAfford = PLAYER_STATE.pp >= node.cost;
            const costColor = canAfford ? 'var(--text-yellow)' : 'var(--status-red)';

            nodeEl.innerHTML = `
                ${iconHtml}
                <div class="overlay-icon">${overlayIcon}</div>
                <div class="osrs-panel tooltip">
                    <h4>${node.name}</h4>
                    <p>${node.desc}</p>
                    <p class="cost" style="color: ${costColor}">Cost: ${node.cost} PP</p>
                </div>
            `;

            if (node.status === 'available') {
                nodeEl.onclick = () => unlockNode(id);
            }

            treeContainer.appendChild(nodeEl);
        });
        drawConnections();
    }

    function drawConnections() {
        treeSvg.innerHTML = '';
        const svgRect = treeSvg.getBoundingClientRect();
        if (svgRect.width === 0) return;

        Object.keys(TREE_DATA).forEach(id => {
            const node = TREE_DATA[id];
            node.deps.forEach(depId => {
                const p1El = document.getElementById(depId);
                const p2El = document.getElementById(id);
                if (!p1El || !p2El) return;

                const p1Rect = p1El.getBoundingClientRect();
                const p2Rect = p2El.getBoundingClientRect();

                // Calculate position relative to the SVG canvas itself
                const startX = (p1Rect.left + p1Rect.width / 2) - svgRect.left;
                const startY = (p1Rect.top + p1Rect.height / 2) - svgRect.top;
                const endX = (p2Rect.left + p2Rect.width / 2) - svgRect.left;
                const endY = (p2Rect.top + p2Rect.height / 2) - svgRect.top;

                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', `M${startX},${startY} C${startX},${(startY + endY) / 2} ${endX},${(startY + endY) / 2} ${endX},${endY}`);
                
                const isUnlocked = TREE_DATA[depId].status === 'unlocked';
                path.setAttribute('class', `tree-connection-path ${isUnlocked ? 'unlocked' : 'locked'}`);
                treeSvg.appendChild(path);
            });
        });
    }

    function renderSkills() {
        statsGrid.innerHTML = '';
        Object.keys(PLAYER_STATE.skills).forEach(skillName => {
            const skill = PLAYER_STATE.skills[skillName];
            const skillInfo = SKILL_DATA[skillName];
            const box = document.createElement('div');
            box.className = `osrs-panel skill-box ${skill.unlocked ? 'unlocked' : 'locked'}`;

            let lockOverlay = '';
            if (!skill.unlocked) {
                lockOverlay = '<div class="lock-overlay"><i class="fas fa-lock"></i></div>';
            }

            box.innerHTML = `
                <div class="tooltip">${skillName}</div>
                <img src="${skillInfo.icon}" alt="${skillName}">
                <span class="level">${skill.level}</span>
                ${lockOverlay}
            `;
            statsGrid.appendChild(box);
        });
    }

    function renderQuests() {
        questList.innerHTML = '';
        PLAYER_STATE.quests.forEach(quest => {
            const item = document.createElement('li');
            item.className = 'quest-item';
            item.innerHTML = `<div class="quest-status ${quest.status}"></div><span>${quest.name}</span>`;
            questList.appendChild(item);
        });
    }

    function renderTasks() {
        taskListContainer.innerHTML = '';
        TASK_DATA.forEach(task => {
            const item = document.createElement('li');
            item.className = `task-item ${task.status}`;
            
            let buttonHtml = '<button class="claim-btn" disabled>Claimed</button>';
            if (task.status === 'incomplete') {
                buttonHtml = `<button class="claim-btn" data-task-id="${task.id}">Claim</button>`;
            }

            item.innerHTML = `
                <span class="task-desc">${task.desc}</span>
                <span class="task-reward">+${task.reward} PP</span>
                ${buttonHtml}
            `;
            taskListContainer.appendChild(item);
        });

        document.querySelectorAll('.claim-btn[data-task-id]').forEach(button => {
            button.addEventListener('click', (e) => {
                claimTask(e.target.dataset.taskId);
            });
        });
    }

    // --- INITIALIZATION ---
    toggleIcons.forEach(icon => {
        icon.addEventListener('click', () => switchView(icon.dataset.view));
    });

    window.addEventListener('resize', drawConnections);

    updateResources();
    updateNodeStatuses();
    renderTree();
    renderSkills();
    renderQuests();
    renderTasks();
    addLog('Welcome to Path of the Prodigy.', 'system');
    switchView('talent-tree-view');
});

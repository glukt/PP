document.addEventListener('DOMContentLoaded', () => {
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
        pp: 5, 
        skills: Object.keys(SKILL_DATA).reduce((acc, skill) => {
            acc[skill] = { level: 1, unlocked: false };
            return acc;
        }, {}),
        quests: [
            { name: "Cook's Assistant", id: 'quest_cooks_assistant', status: 'not_started' }, 
            { name: 'Dragon Slayer', id: 'quest_dragon_slayer', status: 'not_started' },
            { name: 'The Restless Ghost', id: 'quest_restless_ghost', status: 'not_started' },
            { name: 'Rune Mysteries', id: 'quest_rune_mysteries', status: 'not_started' },
            { name: 'Sheep Shearer', id: 'quest_sheep_shearer', status: 'not_started' },
            { name: 'Goblin Diplomacy', id: 'quest_goblin_diplomacy', status: 'not_started' }, 
            { name: 'Doric\'s Quest', id: 'quest_dorics_quest', status: 'not_started' }, 
            { name: 'Ernest the Chicken', id: 'quest_ernest_the_chicken', status: 'not_started' },
            { name: 'Druidic Ritual', id: 'quest_druidic_ritual', status: 'not_started' }, 
            { name: 'Imp Catcher', id: 'quest_imp_catcher', status: 'not_started' }, 
            { name: 'The Knight\'s Sword', id: 'quest_knights_sword', status: 'not_started' }, 
            { name: "Daddy's Home", id: 'quest_daddys_home', status: 'not_started' },
        ]
    };
    PLAYER_STATE.skills.Attack.unlocked = true;
    PLAYER_STATE.skills.Strength.unlocked = true;
    PLAYER_STATE.skills.Defence.unlocked = true;
    PLAYER_STATE.skills.Hitpoints.unlocked = true;
    PLAYER_STATE.skills.Hitpoints.level = 10;

let TREE_DATA = {};

    let TASK_DATA = [
        { id: 'ct_goblin', desc: 'Kill 50 Goblins (Combat Task)', reward: 2, status: 'incomplete' },
        { id: 'ct_cow', desc: 'Kill 25 Cows using only Ranged (Combat Task)', reward: 3, status: 'incomplete' },
        { id: 'ct_giant_rat', desc: 'Kill the Giant Rat in Lumbridge Sewers (Combat Task)', reward: 4, status: 'incomplete' },
        { id: 'ct_kalphite_worker', desc: 'Kill a Kalphite Worker (Combat Task)', reward: 5, status: 'incomplete' },
        { id: 'ct_hill_giant', desc: 'Kill 50 Hill Giants (Combat Task)', reward: 6, status: 'incomplete' }, 
        { id: 'ct_moss_giant', desc: 'Kill a Moss Giant (Combat Task)', reward: 7, status: 'incomplete' }, 
        
        { id: 'ad_cooks_assistant', desc: "Complete the Cook's Assistant quest (Achievement Diary)", reward: 5, status: 'incomplete' },
        { id: 'ad_chop_willow', desc: 'Chop a Willow tree in Lumbridge (Achievement Diary)', reward: 3, status: 'incomplete' },
        { id: 'ad_lum_tele', desc: 'Use the Lumbridge Home Teleport (Achievement Diary)', reward: 1, status: 'incomplete' },
        { id: 'ad_draynor_bank', desc: 'Deposit an item into the Draynor Village Bank (Achievement Diary)', reward: 3, status: 'incomplete' },
        { id: 'ad_varrock_tele', desc: 'Cast the Varrock Teleport spell (Achievement Diary)', reward: 4, status: 'incomplete' }, 
        { id: 'ad_al_kharid_gate', desc: 'Pay the toll gate in Al Kharid (Achievement Diary)', reward: 1, status: 'incomplete' }, 
        { id: 'ad_mine_coal', desc: 'Mine a piece of Coal in Falador (Achievement Diary)', reward: 3, status: 'incomplete' }, 
        { id: 'ad_run_falador_agi', desc: 'Use the Falador Agility shortcut (Achievement Diary)', reward: 5, status: 'incomplete' }, 

        { id: 'cl_bronze_helmet', desc: 'Equip a Bronze full helmet (Collection Log)', reward: 2, status: 'incomplete' },
        { id: 'cl_eye_of_newt', desc: 'Obtain an Eye of Newt drop (Collection Log)', reward: 3, status: 'incomplete' },
        { id: 'cl_rune_essence', desc: 'Mine 100 Rune essence (Collection Log)', reward: 4, status: 'incomplete' },
        { id: 'cl_curry_leaf', desc: 'Obtain a Curry Leaf from a patch (Collection Log)', reward: 4, status: 'incomplete' },
        { id: 'cl_cowhide', desc: 'Tan 10 Cowhides in Al Kharid (Collection Log)', reward: 3, status: 'incomplete' }, 
        { id: 'cl_fishing_net', desc: 'Catch a sardine with a small net (Collection Log)', reward: 2, status: 'incomplete' }, 
        { id: 'cl_limpwurt_root', desc: 'Obtain a Limpwurt Root drop (Collection Log)', reward: 4, status: 'incomplete' }, 

        { id: 'sm_fish_50', desc: 'Cook 50 successful Trout (Skilling Milestone)', reward: 3, status: 'incomplete' },
        { id: 'sm_fletch_100', desc: 'Fletch 100 Willow shortbows (Skilling Milestone)', reward: 4, status: 'incomplete' },
        { id: 'sm_mine_tin', desc: 'Mine 100 Tin Ore (Skilling Milestone)', reward: 2, status: 'incomplete' }, 
        { id: 'sm_chop_oak', desc: 'Chop 50 Oak Logs (Skilling Milestone)', reward: 3, status: 'incomplete' }, 
        { id: 'sm_fish_tuna', desc: 'Cook 25 Tuna (Skilling Milestone)', reward: 4, status: 'incomplete' }, 
        { id: 'sm_make_plank', desc: 'Saw 10 regular Planks (Skilling Milestone)', reward: 2, status: 'incomplete' }, 
    ];

    const ppDisplay = document.getElementById('pp-display');
    const logContainer = document.getElementById('log');
    const treeView = document.getElementById('talent-tree-view');
    const treeCanvas = document.getElementById('tree-canvas');
    const treeContainer = document.getElementById('tree-container');
    const treeSvg = document.getElementById('tree-svg'); 
    const unlocksListContainer = document.getElementById('unlocks-list-container');
    const questList = document.getElementById('quest-list-container');
    const taskListContainer = document.getElementById('task-list-container');
    const toggleIcons = document.querySelectorAll('.toggle-icon');
    const contentViews = document.querySelectorAll('.content-view');
    const loadTreeOverlay = document.getElementById('load-tree-overlay');
    const loadTreeBtn = document.getElementById('load-tree-btn');
    const treeFileLoader = document.getElementById('tree-file-loader');

    loadTreeBtn.addEventListener('click', () => treeFileLoader.click());

    treeFileLoader.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const loadedData = JSON.parse(event.target.result);
                if (typeof loadedData === 'object' && Object.keys(loadedData).length > 0) {
                    TREE_DATA = loadedData;
                    loadTreeOverlay.style.display = 'none';
                    initialize(); // Run all the setup functions
                } else {
                    alert('Error: Invalid or empty tree file.');
                }
            } catch (error) {
                alert('Error parsing file: ' + error.message);
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    });

    let isPanning = false;
    let startX, startY;
    let canvasX = 0;
    let canvasY = 0;
    let initialCanvasX = 0;
    let initialCanvasY = 0;
    let scale = 0.7; 
    const scaleFactor = 0.1;
    const minScale = 0.5;
    const maxScale = 2.0;
    
    const applyTransform = () => {
        treeCanvas.style.transform = `translate(${canvasX}px, ${canvasY}px) scale(${scale})`;
    };

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
        applyTransform();
    });

    treeView.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        const treeViewRect = treeView.getBoundingClientRect();
        const mouseX = e.clientX - treeViewRect.left;
        const mouseY = e.clientY - treeViewRect.top;

        const delta = e.deltaY * -0.01;
        const newScale = Math.min(Math.max(minScale, scale + delta * scaleFactor), maxScale);

        if (newScale !== scale) {
            const scaleChange = newScale / scale;

            canvasX = mouseX - (mouseX - canvasX) * scaleChange;
            canvasY = mouseY - (mouseY - canvasY) * scaleChange;
            
            scale = newScale;
            applyTransform();
        }
    });

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
    };

    const unlockNode = (nodeId) => {
        const node = TREE_DATA[nodeId];
        
        if (node.cost > 0 && (!node || node.status !== 'available' || PLAYER_STATE.pp < node.cost)) return;
        
        if (node.cost > 0) {
            PLAYER_STATE.pp -= node.cost;
        }
        
        node.status = 'unlocked';

        if (node.unlocksQuest) {
            const questToUnlock = PLAYER_STATE.quests.find(q => q.id === node.unlocksQuest);
            if (questToUnlock && questToUnlock.status === 'not_started') {
                questToUnlock.status = 'in_progress';
                addLog(`Quest '${questToUnlock.name}' is now available to complete.`, 'info');
            }
        }

        if (PLAYER_STATE.skills[node.name]) {
            PLAYER_STATE.skills[node.name].unlocked = true;
        }

        addLog(`Unlocked '${node.name}'`, 'unlock');
        updateResources();
        updateNodeStatuses();
        renderTree();
        renderUnlocks();
        renderQuests(); 
    };
    
    const completeQuest = (questId) => {
        const quest = PLAYER_STATE.quests.find(q => q.id === questId);
        
        if (!quest || quest.status === 'complete') return; 

        quest.status = 'complete';
        addLog(`Quest '${quest.name}' completed!`, 'info');
        
        updateNodeStatuses();
        renderTree();
        renderQuests(); 
    }

    const updateNodeStatuses = () => {
        Object.keys(TREE_DATA).forEach(id => {
            const node = TREE_DATA[id];

            if (node.id === 'path_might' || node.id === 'path_dexterity' || node.id === 'path_wisdom' || node.id === 'genesis') {
                 if (node.status === 'locked') {
                    node.status = 'unlocked';
                 }
                 return;
            }

            if (node.status === 'locked') {
                const allDepsMet = node.deps.every(depId => TREE_DATA[depId]?.status === 'unlocked');
                
                let questRequirementMet = true;
                if (node.questId) {
                    const quest = PLAYER_STATE.quests.find(q => q.id === node.questId);
                    questRequirementMet = quest && quest.status === 'complete';
                }

                if (allDepsMet && questRequirementMet) {
                    if (node.cost === 0) {
                        unlockNode(id);
                    } else {
                        node.status = 'available';
                    }
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

    function renderTree() {
        const questStatusMap = PLAYER_STATE.quests.reduce((acc, q) => {
            acc[q.id] = q.status;
            return acc;
        }, {});

        treeContainer.innerHTML = '';
        treeSvg.innerHTML = '';

        Object.keys(TREE_DATA).forEach(id => {
            const node = TREE_DATA[id];

            if (node.deps && node.deps.length > 0) {
                node.deps.forEach(depId => {
                    const parentNode = TREE_DATA[depId];
                    if (!parentNode) return;

                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', parentNode.pos.x);
                    line.setAttribute('y1', parentNode.pos.y);
                    line.setAttribute('x2', node.pos.x);
                    line.setAttribute('y2', node.pos.y);

                    const lineClass = (node.status === 'unlocked' || node.status === 'available') ? 'line-unlocked' : 'line-locked';
                    line.setAttribute('class', lineClass);

                    treeSvg.appendChild(line);
                });
            }

            if (node.type === 'system') return; 

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
            } else if (node.questId && questStatusMap[node.questId] !== 'complete') {
                 overlayIcon = '<i class="fas fa-exclamation-circle"></i>';
            }

            const canAfford = PLAYER_STATE.pp >= node.cost;
            const costColor = canAfford ? 'var(--text-yellow)' : 'var(--status-red)';
            const costText = node.cost === 0 ? 'FREE' : `${node.cost} PP`;
            const finalCostColor = node.cost === 0 ? 'var(--status-green)' : costColor;

            nodeEl.innerHTML = `
                ${iconHtml}
                <div class="overlay-icon">${overlayIcon}</div>
                <div class="osrs-panel tooltip">
                    <h4>${node.name}</h4>
                    <p>${node.desc}</p>
                    <p class="cost" style="color: ${finalCostColor}">Cost: ${costText}</p>
                </div>
            `;

            if (node.status === 'available') {
                nodeEl.onclick = () => unlockNode(id);
            }

            treeContainer.appendChild(nodeEl);
        });
    }

    function renderUnlocks() {
        unlocksListContainer.innerHTML = '';
    
        const unlockedIds = new Set(
            Object.keys(TREE_DATA).filter(id => {
                const node = TREE_DATA[id];
                return node.status === 'unlocked' && !id.startsWith('path_') && id !== 'genesis' && !node.name.startsWith('Quest:');
            })
        );
        const renderedIds = new Set();
    
        // Special grouping definitions
        const specialGroups = {
            magic: {
                Teleportation: 'magic_teleports',
                Enchanting: 'enchantment',
                Alchemy: 'high_alchemy',
                "Spellbook": 'standard_spellbook'
            },
            defence: {
                Armour: ['bronze_armor', 'iron_armor', 'steel_armor', 'black_armor', 'mithril_armor', 'adamant_armor', 'rune_armor']
            },
            attack: {
                Weapons: ['bronze_weapon', 'iron_weapon', 'steel_weapon', 'black_weapon', 'mithril_weapon', 'adamant_weapon', 'rune_weapon']
            },
            ranged: {
                Bows: ['oak_equip', 'willow_equip', 'maple_equip']
            }
        };
    
        // Recursive function to create list items for nodes WITHOUT special rules
        function createDefaultNodeElement(nodeId) {
            if (renderedIds.has(nodeId)) return null;
    
            const node = TREE_DATA[nodeId];
            const li = document.createElement('li');
            li.innerHTML = `<div class="unlocks-list-item"><img src="${node.icon}" alt=""> <span>${node.name}</span></div>`;
            renderedIds.add(nodeId);
    
            // Find direct children that are unlocked but not part of any special group
            const children = Object.keys(TREE_DATA).filter(childId => 
                unlockedIds.has(childId) && 
                TREE_DATA[childId].deps.includes(nodeId) &&
                !Object.values(specialGroups).some(group => Object.values(group).flat().includes(childId))
            );
            
            if (children.length > 0) {
                const sublist = document.createElement('ul');
                children.forEach(childId => {
                    const childElement = createDefaultNodeElement(childId);
                    if (childElement) sublist.appendChild(childElement);
                });
                if(sublist.hasChildNodes()) li.appendChild(sublist);
            }
            return li;
        }
    
        // Group all unlocked nodes by their root path
        const nodeMemo = {};
        function getPathForNode(nodeId) {
            if (nodeMemo[nodeId]) return nodeMemo[nodeId];
            const node = TREE_DATA[nodeId];
            if (!node || !node.deps || node.deps.length === 0) return null;
            if (node.deps.includes('path_might')) return (nodeMemo[nodeId] = 'might');
            if (node.deps.includes('path_dexterity')) return (nodeMemo[nodeId] = 'dexterity');
            if (node.deps.includes('path_wisdom')) return (nodeMemo[nodeId] = 'wisdom');
            for (const depId of node.deps) {
                const path = getPathForNode(depId);
                if (path) return (nodeMemo[nodeId] = path);
            }
            return null;
        }
        
        const categorizedIds = { might: [], dexterity: [], wisdom: [], other: [] };
        unlockedIds.forEach(id => {
            const path = getPathForNode(id);
            categorizedIds[path || 'other'].push(id);
        });
    
        const categoryTitles = { might: 'Path of Might', dexterity: 'Path of Dexterity', wisdom: 'Path of Wisdom', other: 'Miscellaneous' };
    
        // Render each category
        for (const categoryKey in categorizedIds) {
            const pathIds = new Set(categorizedIds[categoryKey]);
            if (pathIds.size === 0) continue;
    
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'unlocks-category';
            categoryDiv.innerHTML = `<h3>${categoryTitles[categoryKey]}</h3>`;
            const rootList = document.createElement('ul');
            rootList.className = 'unlocks-list';
    
            // Identify and render only the top-level nodes for this path
            const rootIds = [...pathIds].filter(id => !TREE_DATA[id].deps.some(depId => pathIds.has(depId)));
            rootIds.sort((a,b) => TREE_DATA[a].name.localeCompare(TREE_DATA[b].name));
    
            rootIds.forEach(rootId => {
                if (renderedIds.has(rootId)) return;
                
                const rootNode = TREE_DATA[rootId];
                const rootLi = document.createElement('li');
                rootLi.innerHTML = `<div class="unlocks-list-item"><img src="${rootNode.icon}" alt=""> <span>${rootNode.name}</span></div>`;
                renderedIds.add(rootId);
    
                // --- Handle Special Groupings ---
                if (specialGroups[rootId]) {
                    const sublist = document.createElement('ul');
                    for (const groupName in specialGroups[rootId]) {
                        const groupItems = specialGroups[rootId][groupName];
                        
                        // Handle simple groups (like Magic)
                        if (typeof groupItems === 'string') {
                            if (unlockedIds.has(groupItems)) {
                                const itemNode = TREE_DATA[groupItems];
                                const itemLi = document.createElement('li');
                                itemLi.innerHTML = `<div class="unlocks-list-item"><img src="${itemNode.icon}" alt=""> <span>${groupName}</span></div>`;
                                sublist.appendChild(itemLi);
                                renderedIds.add(groupItems);
                            }
                        } 
                        // Handle conceptual groups with children (like Bows)
                        else if (Array.isArray(groupItems)) {
                            const unlockedGroupItems = groupItems.filter(itemId => unlockedIds.has(itemId));
                            if (unlockedGroupItems.length > 0) {
                                const conceptualLi = document.createElement('li');
                                conceptualLi.className = 'conceptual-group';
                                conceptualLi.textContent = groupName;
    
                                const innerSublist = document.createElement('ul');
                                unlockedGroupItems.forEach(itemId => {
                                    const itemNode = TREE_DATA[itemId];
                                    const itemLi = document.createElement('li');
                                    itemLi.innerHTML = `<div class="unlocks-list-item"><img src="${itemNode.icon}" alt=""> <span>${itemNode.name}</span></div>`;
                                    innerSublist.appendChild(itemLi);
                                    renderedIds.add(itemId);
                                });
                                conceptualLi.appendChild(innerSublist);
                                sublist.appendChild(conceptualLi);
                            }
                        }
                    }
                    if (sublist.hasChildNodes()) rootLi.appendChild(sublist);
                }
    
                // --- Handle Default Children ---
                const defaultChildrenSublist = document.createElement('ul');
                const childrenIds = Object.keys(TREE_DATA).filter(id => unlockedIds.has(id) && TREE_DATA[id].deps.includes(rootId));
                childrenIds.forEach(childId => {
                     const childElement = createDefaultNodeElement(childId);
                     if (childElement) defaultChildrenSublist.appendChild(childElement);
                });
                if(defaultChildrenSublist.hasChildNodes()) rootLi.appendChild(defaultChildrenSublist);
                
                rootList.appendChild(rootLi);
            });
    
            categoryDiv.appendChild(rootList);
            unlocksListContainer.appendChild(categoryDiv);
        }
    }

    function renderQuests() {
        const unlockedQuestPrerequisites = Object.keys(TREE_DATA)
            .filter(id => TREE_DATA[id].unlocksQuest && TREE_DATA[id].status === 'unlocked')
            .map(id => TREE_DATA[id].unlocksQuest);

        questList.innerHTML = '';
        PLAYER_STATE.quests.forEach(quest => {
            const item = document.createElement('li');
            item.className = 'quest-item';

            const isTreeUnlocked = unlockedQuestPrerequisites.includes(quest.id);
            
            let statusClass = quest.status;
            let clickable = false;
            let isLocked = false;

            if (quest.status === 'complete') {
                statusClass = 'complete';
            } else if (isTreeUnlocked) {
                statusClass = quest.status === 'not_started' ? 'in_progress' : quest.status;
                clickable = true;
            } else {
                statusClass = 'locked';
                isLocked = true;
            }

            item.innerHTML = `
                <div class="quest-status ${statusClass}"></div>
                <span>${quest.name}</span>
                ${isLocked ? '<i class="fas fa-lock" style="margin-left: auto;"></i>' : ''}
            `;
            
            if (clickable) {
                item.classList.add('clickable');
                item.style.cursor = 'pointer';
                item.addEventListener('click', () => {
                    completeQuest(quest.id);
                });
            }

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

    toggleIcons.forEach(icon => {
        icon.addEventListener('click', () => switchView(icon.dataset.view));
    });

    window.addEventListener('resize', applyTransform); 

    function initialize() {
        updateResources();
        updateNodeStatuses();
        renderTree();
        renderUnlocks();
        renderQuests();
        renderTasks();
        addLog('Welcome to Path of the Prodigy. Your 5 initial PP are ready to spend!', 'system');
        switchView('talent-tree-view');
    }
});
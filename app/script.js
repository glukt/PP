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

    const QUEST_LIST = ["X Marks the Spot", "Witch's Potion", "Vampyre Slayer", "Shield of Arrav", "Sheep Shearer", "Rune Mysteries", "Romeo & Juliet", "The Restless Ghost", "Prince Ali Rescue", "Pirate's Treasure", "Misthalin Mystery", "The Knight's Sword", "Imp Catcher", "Goblin Diplomacy", "Ernest the Chicken", "Dragon Slayer I", "Doric's Quest", "Demon Slayer", "The Corsair Curse", "Cook's Assistant", "Black Knights' Fortress", "Below Ice Mountain", "Druidic Ritual", "Lost City", "Witch's House", "Merlin's Crystal", "Heroes' Quest", "Scorpion Catcher", "Family Crest", "Fishing Contest", "Tribal Totem", "Monk's Friend", "Temple of Ikov", "Clock Tower", "Holy Grail", "Tree Gnome Village", "Fight Arena", "Hazeel Cult", "Sheep Herder", "Plague City", "Sea Slug", "Waterfall Quest", "Jungle Potion", "The Grand Tree", "Underground Pass", "Observatory Quest", "The Tourist Trap", "Watchtower", "Dwarf Cannon", "Murder Mystery", "The Dig Site", "Gertrude's Cat", "Legends' Quest", "Death Plateau", "Eadgar's Ruse", "Big Chompy Bird Hunting", "Elemental Workshop I", "Nature Spirit", "Priest in Peril", "Regicide", "Tai Bwo Wannai Trio", "Troll Stronghold", "Shades of Mort'ton", "The Fremennik Trials", "Horror from the Deep", "Throne of Miscellania", "Monkey Madness I", "Haunted Mine", "Troll Romance", "In Search of the Myreque", "Creature of Fenkenstrain", "Roving Elves", "Ghosts Ahoy", "One Small Favour", "Mountain Daughter", "Between a Rock...", "The Feud", "The Golem", "Desert Treasure I", "Icthlarin's Little Helper", "Tears of Guthix", "The Lost Tribe", "The Giant Dwarf", "Recruitment Drive", "Mourning's End Part I", "Forgettable Tale...", "Garden of Tranquillity", "A Tail of Two Cats", "Wanted!", "Mourning's End Part II", "Rum Deal", "Shadow of the Storm", "Making History", "Ratcatchers", "Spirits of the Elid", "Devious Minds", "The Hand in the Sand", "Enakhra's Lament", "Cabin Fever", "Fairytale I - Growing Pains", "Recipe for Disaster", "In Aid of the Myreque", "A Soul's Bane", "Rag and Bone Man I", "Rag and Bone Man II", "Swan Song", "Royal Trouble", "Death to the Dorgeshuun", "Fairytale II - Cure a Queen", "Lunar Diplomacy", "The Eyes of Glouphrie", "Darkness of Hallowvale", "The Slug Menace", "Elemental Workshop II", "My Arm's Big Adventure", "Enlightened Journey", "Eagles' Peak", "Animal Magnetism", "Contact!", "Cold War", "The Fremennik Isles", "Tower of Life", "The Great Brain Robbery", "What Lies Below", "Olaf's Quest", "Another Slice of H.A.M.", "Dream Mentor", "Dragon Slayer II", "Bone Voyage", "The Queen of Thieves", "The Depths of Despair", "Client of Kourend", "Architectural Alliance", "The Forsaken Tower", "Ascent of Arceuus", "Tale of the Righteous", "A Taste of Hope", "Making Friends with My Arm", "The Fremennik Exiles", "Sins of the Father", "A Porcine of Interest", "Getting Ahead", "Below Ice Mountain", "X Marks the Spot", "Daddy's Home", "Sleeping Giants", "The Garden of Death", "Temple of the Eye", "Secrets of the North", "Desert Treasure II - The Fallen Empire", "His Faithful Servants", "The Path of Glouphrie", "Children of the Sun", "Defender of Varrock", "While Guthix Sleeps", "Land of the Goblins"];

    let PLAYER_STATE = {
        pp: 5, 
        skills: Object.keys(SKILL_DATA).reduce((acc, skill) => {
            acc[skill] = { level: 1, unlocked: false };
            return acc;
        }, {}),
        quests: QUEST_LIST.map(q => ({
            name: q,
            id: 'quest_' + q.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, ''),
            status: 'not_started'
        }))
    };
    PLAYER_STATE.skills.Attack.unlocked = true;
    PLAYER_STATE.skills.Strength.unlocked = true;
    PLAYER_STATE.skills.Defence.unlocked = true;
    PLAYER_STATE.skills.Hitpoints.unlocked = true;
    PLAYER_STATE.skills.Hitpoints.level = 10;

let TREE_DATA = {};

    let TASK_DATA = [
        { id: 're_burn_food', desc: 'Burn any kind of food while trying to cook it', reward: 0, status: 'incomplete' },
        { id: 're_burn_normal_logs', desc: 'Burn some Normal Logs', reward: 0, status: 'incomplete' },
        { id: 're_bury_bones', desc: 'Bury any kind of Bones', reward: 0, status: 'incomplete' },
        { id: 're_buy_from_trader', desc: 'Buy something from the Trader Crewmembers', reward: 0, status: 'incomplete' },
        { id: 're_cast_home_teleport', desc: 'Cast the Home Teleport spell', reward: 0, status: 'incomplete' },
        { id: 're_catch_baby_impling', desc: 'Catch a Baby Impling', reward: 0, status: 'incomplete', requirements: '17 Hunter' },
        { id: 're_catch_herring', desc: 'Catch a Raw Herring whilst Fishing', reward: 0, status: 'incomplete', requirements: '10 Fishing' },
        { id: 're_catch_shrimp', desc: 'Catch Raw Shrimp while Fishing', reward: 0, status: 'incomplete' },
        { id: 're_catch_anchovy', desc: 'Catch a Raw Anchovy whilst Fishing', reward: 0, status: 'incomplete', requirements: '15 Fishing' },
        { id: 're_check_slayer_task', desc: 'Use an Enchanted Gem to check your Slayer Task', reward: 0, status: 'incomplete' },
        { id: 're_chop_logs', desc: 'Chop any kind of logs', reward: 0, status: 'incomplete' },
        { id: 're_chop_with_steel_axe', desc: 'Chop any kind of logs using a Steel Axe', reward: 0, status: 'incomplete', requirements: '6 Woodcutting' },
        { id: 're_clean_15_tarromin', desc: 'Clean 15 Grimy Tarromin', reward: 0, status: 'incomplete', requirements: '11 Herblore' },
        { id: 're_clean_25_guam', desc: 'Clean 25 Grimy Guam Leafs', reward: 0, status: 'incomplete' },
        { id: 're_clean_a_guam', desc: 'Clean a Grimy Guam', reward: 0, status: 'incomplete' },
        { id: 're_cook_shrimp', desc: 'Cook Raw Shrimp', reward: 0, status: 'incomplete' },
        { id: 're_craft_leather_body', desc: 'Craft a Leather Body', reward: 0, status: 'incomplete', requirements: '14 Crafting' },
        { id: 're_create_compost_potion', desc: 'Create a Compost Potion', reward: 0, status: 'incomplete', requirements: '22 Herblore' },
        { id: 're_create_antipoison', desc: 'Create an Antipoison', reward: 0, status: 'incomplete', requirements: '5 Herblore' },
        { id: 're_cry_in_wheat', desc: 'Cry in a wheat field', reward: 0, status: 'incomplete' },
        { id: 're_cut_sapphire', desc: 'Cut a Sapphire', reward: 0, status: 'incomplete', requirements: '20 Crafting' },
        { id: 're_dance_in_graveyard', desc: 'Dance in a graveyard', reward: 0, status: 'incomplete' },
        { id: 're_defeat_goblin_1', desc: 'Defeat a Goblin 1 time', reward: 0, status: 'incomplete' },
        { id: 're_defeat_goblin_25', desc: 'Defeat a Goblin 25 times', reward: 0, status: 'incomplete' },
        { id: 're_defeat_guard_1', desc: 'Defeat a Guard 1 time', reward: 0, status: 'incomplete' },
        { id: 're_defeat_guard_25', desc: 'Defeat a Guard 25 times', reward: 0, status: 'incomplete' },
        { id: 're_defeat_moss_giant_1', desc: 'Defeat a Moss Giant 1 time', reward: 0, status: 'incomplete' },
        { id: 're_defeat_moss_giant_25', desc: 'Defeat a Moss Giant 25 times', reward: 0, status: 'incomplete' },
        { id: 're_drink_strength_potion', desc: 'Drink a Strength Potion', reward: 0, status: 'incomplete' },
        { id: 're_dye_cape_orange', desc: 'Dye a cape orange', reward: 0, status: 'incomplete' },
        { id: 're_eat_banana', desc: 'Eat a Banana', reward: 0, status: 'incomplete' },
        { id: 're_enter_puro_puro', desc: 'Enter Puro Puro from a crop circle in mainland Gielinor', reward: 0, status: 'incomplete', requirements: '17 Hunter' },
        { id: 're_enter_poh', desc: 'Enter your Player Owned House', reward: 0, status: 'incomplete' },
        { id: 're_equip_spiny_helmet', desc: 'Equip a Spiny Helmet', reward: 0, status: 'incomplete', requirements: '5 Defence' },
        { id: 're_equip_studded_body_chaps', desc: 'Equip a Studded Body along with some Studded Chaps', reward: 0, status: 'incomplete', requirements: '20 Ranged, 20 Defence' },
        { id: 're_equip_elemental_staff', desc: 'Equip a basic elemental staff', reward: 0, status: 'incomplete' },
        { id: 're_fletch_oak_shortbow', desc: 'Fletch an Oak Shortbow', reward: 0, status: 'incomplete', requirements: '20 Fletching' },
        { id: 're_fletch_arrow_shafts', desc: 'Fletch some Arrow Shafts', reward: 0, status: 'incomplete' },
        { id: 're_kill_necromancer_1', desc: 'Kill a Necromancer 1 time', reward: 0, status: 'incomplete' },
        { id: 're_kill_necromancer_25', desc: 'Kill a Necromancer 25 times', reward: 0, status: 'incomplete' },
        { id: 're_light_torch', desc: 'Light a Torch', reward: 0, status: 'incomplete' },
        { id: 're_locate_altar', desc: 'Use any talisman to check the location of a Runecrafting Altar', reward: 0, status: 'incomplete' },
        { id: 're_make_attack_potion', desc: 'Make an Attack Potion', reward: 0, status: 'incomplete' },
        { id: 're_mine_5_tin', desc: 'Mine 5 Tin Ore', reward: 0, status: 'incomplete' },
        { id: 're_mine_copper', desc: 'Mine some Copper Ore', reward: 0, status: 'incomplete' },
        { id: 're_mine_essence', desc: 'Mine some essence', reward: 0, status: 'incomplete' },
        { id: 're_mine_with_steel_pick', desc: 'Mine any ore using a Steel Pickaxe', reward: 0, status: 'incomplete', requirements: '6 Mining' },
        { id: 're_obtain_bird_nest', desc: 'Obtain a Bird Nest whilst cutting down trees', reward: 0, status: 'incomplete' },
        { id: 're_obtain_casket_fishing', desc: 'Obtain a Casket from Fishing', reward: 0, status: 'incomplete', requirements: '16 Fishing' },
        { id: 're_perform_special_attack', desc: 'Perform any special attack', reward: 0, status: 'incomplete' },
        { id: 're_pickpocket_citizen', desc: 'Pickpocket a Man or a Woman', reward: 0, status: 'incomplete' },
        { id: 're_plant_in_allotment', desc: 'Plant some seeds in an Allotment patch', reward: 0, status: 'incomplete' },
        { id: 're_protect_crops', desc: 'Pay a farmer to protect any of your crops', reward: 0, status: 'incomplete' },
        { id: 're_purchase_poh', desc: 'Purchase a Player Owned House', reward: 0, status: 'incomplete' },
        { id: 're_rake_patch', desc: 'Rake any Farming patch', reward: 0, status: 'incomplete' },
        { id: 're_restore_5_prayer', desc: 'Restore 5 or more Prayer Points at any altar', reward: 0, status: 'incomplete', requirements: '5 Prayer' },
        { id: 're_scatter_ashes', desc: 'Scatter some Ashes', reward: 0, status: 'incomplete' },
        { id: 're_smelt_bronze_bar', desc: 'Use a Furnace to smelt a Bronze Bar', reward: 0, status: 'incomplete' },
        { id: 're_smelt_iron_bar', desc: 'Use a Furnace to smelt an Iron Bar', reward: 0, status: 'incomplete', requirements: '15 Smithing' },
        { id: 're_smith_bronze_helm', desc: 'Use an Anvil to smith a Bronze full helm', reward: 0, status: 'incomplete', requirements: '7 Smithing' },
        { id: 're_smith_bronze_skirt', desc: 'Use an Anvil to smith a Bronze plateskirt', reward: 0, status: 'incomplete', requirements: '16 Smithing' },
        { id: 're_snare_bird', desc: 'Catch any bird with a Bird Snare', reward: 0, status: 'incomplete' },
        { id: 're_spin_wool', desc: 'Use a Spinning Wheel to spin a Ball of Wool', reward: 0, status: 'incomplete' },
        { id: 're_steal_chocolate', desc: 'Steal a Chocolate Slice from a Bakery Stall', reward: 0, status: 'incomplete', requirements: '5 Thieving' },
        { id: 're_steal_silk', desc: 'Steal some silk from a silk stall', reward: 0, status: 'incomplete', requirements: '20 Thieving' },
        { id: 're_cut_red_topaz', desc: 'Successfully Cut a Red Topaz', reward: 0, status: 'incomplete', requirements: '16 Crafting' },
        { id: 're_superhuman_improved', desc: 'Use both the Superhuman Strength prayer and the Improved Reflexes prayer at the same time', reward: 0, status: 'incomplete', requirements: '16 Prayer' },
        { id: 're_logs_to_plank', desc: 'Use a Sawmill to turn Logs into a Plank', reward: 0, status: 'incomplete' },
        { id: 're_use_hat_stand', desc: 'Put a hat on a hat stand, or try at least', reward: 0, status: 'incomplete' },
        { id: 're_visit_deaths_domain', desc: "Visit Death's Domain", reward: 0, status: 'incomplete' },
        { id: 're_visit_rune_essence_mine', desc: 'Visit the Rune Essence Mine', reward: 0, status: 'incomplete' },
        { id: 're_medium_clue_1', desc: 'Open a Reward casket for completing a medium clue scroll', reward: 0, status: 'incomplete' },
        { id: 're_medium_clue_25', desc: 'Open 25 Reward caskets for completing medium clue scrolls', reward: 0, status: 'incomplete' },
        { id: 're_superior_slayer_25', desc: 'Defeat 25 superior foes while on a Slayer Task', reward: 0, status: 'incomplete', requirements: '5 Slayer, Unlocked Bigger and Badder' },
        { id: 're_build_mahogany_portal', desc: 'Build a Mahogany Portal in a Portal Chamber in your Player Owned House', reward: 0, status: 'incomplete', requirements: '65 Construction' },
        { id: 're_build_waka_canoe', desc: 'Build a Waka Canoe', reward: 0, status: 'incomplete', requirements: '57 Woodcutting' },
        { id: 're_build_oak_larder', desc: 'Build an Oak Larder in a Kitchen in your Player Owned House', reward: 0, status: 'incomplete', requirements: '33 Construction' },
        { id: 're_burn_100_willow', desc: 'Burn 100 Willow Logs', reward: 0, status: 'incomplete', requirements: '30 Firemaking' },
        { id: 're_burn_25_maple', desc: 'Burn 25 Maple Logs', reward: 0, status: 'incomplete', requirements: '45 Firemaking' },
        { id: 're_bury_wyvern_dragon_bones', desc: 'Bury either some Wyvern Bones or some Dragon Bones', reward: 0, status: 'incomplete' },
        { id: 're_cast_blast_spell', desc: 'Cast any blast spell', reward: 0, status: 'incomplete', requirements: '41 Magic' },
        { id: 're_cast_high_alchemy', desc: 'Cast the High Level Alchemy spell', reward: 0, status: 'incomplete', requirements: '55 Magic' },
        { id: 're_catch_10_pike', desc: 'Catch 10 Pike', reward: 0, status: 'incomplete', requirements: '25 Fishing' },
        { id: 're_catch_100_lobsters', desc: 'Catch 100 Raw Lobsters whilst Fishing', reward: 0, status: 'incomplete', requirements: '40 Fishing' },
        { id: 're_hard_clue_1', desc: 'Open a Reward casket for completing a hard clue scroll', reward: 0, status: 'incomplete' },
        { id: 're_hard_clue_75', desc: 'Open 75 Reward caskets for completing hard clue scrolls', reward: 0, status: 'incomplete' },
        { id: 're_superior_slayer_100', desc: 'Defeat 100 superior foes while on a Slayer Task', reward: 0, status: 'incomplete', requirements: '5 Slayer, Unlocked Bigger and Badder' },
        { id: 're_build_gilded_altar', desc: 'Build a Gilded Altar in a Chapel in your Player Owned House', reward: 0, status: 'incomplete', requirements: '75 Construction' },
        { id: 're_burn_100_yew', desc: 'Burn 100 Yew Logs', reward: 0, status: 'incomplete', requirements: '60 Firemaking' },
        { id: 're_burn_magic_logs', desc: 'Burn some Magic logs', reward: 0, status: 'incomplete', requirements: '75 Firemaking' },
        { id: 're_cast_surge_spell', desc: 'Cast any surge spell', reward: 0, status: 'incomplete', requirements: '81 Magic' },
        { id: 're_cast_wave_spell', desc: 'Cast any wave spell', reward: 0, status: 'incomplete', requirements: '62 Magic' },
        { id: 're_catch_100_shark', desc: 'Catch 100 Raw Shark whilst Fishing', reward: 0, status: 'incomplete', requirements: '76 Fishing' },
        { id: 're_catch_50_grey_chins', desc: 'Catch 50 Grey Chinchompas', reward: 0, status: 'incomplete', requirements: '53 Hunter' },
        { id: 're_catch_dragon_impling', desc: 'Catch a Dragon Impling', reward: 0, status: 'incomplete', requirements: '83 Hunter' },
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

    let isPanning = false;
    let startX, startY;
    let canvasX = 0;
    let canvasY = 0;
    let initialCanvasX = 0;
    let initialCanvasY = 0;
    let scale = 0.5; 
    const scaleFactor = 0.1;
    const minScale = 0.2;
    const maxScale = 2.0;
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

        // If this node is a quest, complete it
        if (nodeId.startsWith('quest_')) {
            completeQuest(nodeId, { fromTree: true });
        }

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
    
    const completeQuest = (questId, options = {}) => {
        const quest = PLAYER_STATE.quests.find(q => q.id === questId);
        
        if (!quest || quest.status === 'complete') return; 

        quest.status = 'complete';
        if (!options.fromTree) {
            addLog(`Quest '${quest.name}' completed!`, 'info');
        }
        
        // Also update the corresponding node in the tree if it exists
        const node = TREE_DATA[questId];
        if (node && node.status !== 'unlocked') {
            node.status = 'unlocked';
        }

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
        const questsInTree = new Set(
            Object.keys(TREE_DATA).filter(id => id.startsWith('quest_'))
        );

        questList.innerHTML = '';
        const questsToRender = PLAYER_STATE.quests.filter(q => questsInTree.has(q.id));

        questsToRender.forEach(quest => {
            const item = document.createElement('li');
            item.className = 'quest-item';

            const node = TREE_DATA[quest.id];
            let statusClass = 'locked'; // Default to locked

            if (node) {
                if (node.status === 'unlocked') {
                    statusClass = 'complete';
                    // Make sure the central quest state is also complete
                    if (quest.status !== 'complete') {
                        quest.status = 'complete';
                    }
                } else if (node.status === 'available') {
                    statusClass = 'in_progress';
                } else {
                    statusClass = 'locked';
                }
            }

            item.innerHTML = `
                <div class="quest-status ${statusClass}"></div>
                <span>${quest.name}</span>
                ${statusClass === 'locked' ? '<i class="fas fa-lock" style="margin-left: auto;"></i>' : ''}
            `;

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

            let requirementsHtml = '';
            if (task.requirements) {
                requirementsHtml = `<span class="task-reqs">Req: ${task.requirements}</span>`;
            }

            item.innerHTML = `
                <div class="task-details">
                    <span class="task-desc">${task.desc}</span>
                    ${requirementsHtml}
                </div>
                <div class="task-actions">
                    <span class="task-reward">+${task.reward} PP</span>
                    ${buttonHtml}
                </div>
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

        // Center the view on the genesis node
        const genesisNode = Object.values(TREE_DATA).find(node => node.name === 'Genesis');
        const canvasSize = 50000;
        const panelRect = treeView.getBoundingClientRect();
        if (genesisNode) {
            const nodeX = parseFloat(genesisNode.pos.x) / 100 * canvasSize;
            const nodeY = parseFloat(genesisNode.pos.y) / 100 * canvasSize;
            canvasX = (panelRect.width / 2) - (nodeX * scale);
            canvasY = (panelRect.height / 2) - (nodeY * scale);
        } else {
            // Fallback for trees without a genesis node
            canvasX = (panelRect.width / 2) - (canvasSize * 0.5 * scale);
            canvasY = (panelRect.height / 2) - (canvasSize * 0.5 * scale);
        }
        applyTransform();
    }
});
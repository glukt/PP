document.addEventListener('DOMContentLoaded', () => {
    const ICON_POOL = ['https://oldschool.runescape.wiki/images/High_Level_Alchemy_icon.png', 'https://oldschool.runescape.wiki/images/Clan_recruit.png', 'https://oldschool.runescape.wiki/images/Clan_corporal.png', 'https://oldschool.runescape.wiki/images/Clan_sergeant.png', 'https://oldschool.runescape.wiki/images/Clan_lieutenant.png', 'https://oldschool.runescape.wiki/images/Clan_captain.png', 'https://oldschool.runescape.wiki/images/Clan_general.png', 'https://oldschool.runescape.wiki/images/Achievement_Diaries_icon.png', 'https://oldschool.runescape.wiki/images/thumb/Raids.png/120px-Raids.png?68e3d', 'https://oldschool.runescape.wiki/images/Combat_icon.png', 'https://oldschool.runescape.wiki/images/Agility_icon.png', 'https://oldschool.runescape.wiki/images/Holy_symbol.png', 'https://oldschool.runescape.wiki/images/Attack_icon.png', 'https://oldschool.runescape.wiki/images/Strength_icon.png', 'https://oldschool.runescape.wiki/images/Defence_icon.png', 'https://oldschool.runescape.wiki/images/Quest_point_icon.png', 'https://oldschool.runescape.wiki/images/Mining_icon.png', 'https://oldschool.runescape.wiki/images/Smithing_icon.png', 'https://oldschool.runescape.wiki/images/Slayer_icon.png', 'https://oldschool.runescape.wiki/images/Ranged_icon.png', 'https://oldschool.runescape.wiki/images/Thieving_icon.png', 'https://oldschool.runescape.wiki/images/Hunter_icon.png', 'https://oldschool.runescape.wiki/images/Woodcutting_icon.png', 'https://oldschool.runescape.wiki/images/Fletching_icon.png', 'https://oldschool.runescape.wiki/images/Firemaking_icon.png', 'https://oldschool.runescape.wiki/images/Fishing_icon.png', 'https://oldschool.runescape.wiki/images/Crafting_icon.png', 'https://oldschool.runescape.wiki/images/Magic_icon.png', 'https://oldschool.runescape.wiki/images/Herblore_icon.png', 'https://oldschool.runescape.wiki/images/Farming_icon.png', 'https://oldschool.runescape.wiki/images/Construction_icon.png', 'https://oldschool.runescape.wiki/images/Prayer_icon.png'];
    const MASTER_NODE_LIBRARY = {
        // Skills
        attack: { name: 'Attack', icon: 'https://oldschool.runescape.wiki/images/Attack_icon.png', category: 'Skills' },
        strength: { name: 'Strength', icon: 'https://oldschool.runescape.wiki/images/Strength_icon.png', category: 'Skills' },
        defence: { name: 'Defence', icon: 'https://oldschool.runescape.wiki/images/Defence_icon.png', category: 'Skills' },
        ranged: { name: 'Ranged', icon: 'https://oldschool.runescape.wiki/images/Ranged_icon.png', category: 'Skills' },
        prayer: { name: 'Prayer', icon: 'https://oldschool.runescape.wiki/images/Prayer_icon.png', category: 'Skills' },
        magic: { name: 'Magic', icon: 'https://oldschool.runescape.wiki/images/Magic_icon.png', category: 'Skills' },
        runecraft: { name: 'Runecraft', icon: 'https://oldschool.runescape.wiki/images/Runecraft_icon.png', category: 'Skills' },
        construction: { name: 'Construction', icon: 'https://oldschool.runescape.wiki/images/Construction_icon.png', category: 'Skills' },
        agility: { name: 'Agility', icon: 'https://oldschool.runescape.wiki/images/Agility_icon.png', category: 'Skills' },
        herblore: { name: 'Herblore', icon: 'https://oldschool.runescape.wiki/images/Herblore_icon.png', category: 'Skills' },
        thieving: { name: 'Thieving', icon: 'https://oldschool.runescape.wiki/images/Thieving_icon.png', category: 'Skills' },
        crafting: { name: 'Crafting', icon: 'https://oldschool.runescape.wiki/images/Crafting_icon.png', category: 'Skills' },
        fletching: { name: 'Fletching', icon: 'https://oldschool.runescape.wiki/images/Fletching_icon.png', category: 'Skills' },
        slayer: { name: 'Slayer', icon: 'https://oldschool.runescape.wiki/images/Slayer_icon.png', category: 'Skills' },
        hunter: { name: 'Hunter', icon: 'https://oldschool.runescape.wiki/images/Hunter_icon.png', category: 'Skills' },
        mining: { name: 'Mining', icon: 'https://oldschool.runescape.wiki/images/Mining_icon.png', category: 'Skills' },
        smithing: { name: 'Smithing', icon: 'https://oldschool.runescape.wiki/images/Smithing_icon.png', category: 'Skills' },
        fishing: { name: 'Fishing', icon: 'https://oldschool.runescape.wiki/images/Fishing_icon.png', category: 'Skills' },
        cooking: { name: 'Cooking', icon: 'https://oldschool.runescape.wiki/images/Cooking_icon.png', category: 'Skills' },
        firemaking: { name: 'Firemaking', icon: 'https://oldschool.runescape.wiki/images/Firemaking_icon.png', category: 'Skills' },
        woodcutting: { name: 'Woodcutting', icon: 'https://oldschool.runescape.wiki/images/Woodcutting_icon.png', category: 'Skills' },
        farming: { name: 'Farming', icon: 'https://oldschool.runescape.wiki/images/Farming_icon.png', category: 'Skills' },

        // Paths
        path_might: { name: 'Path of Might', icon: 'https://oldschool.runescape.wiki/images/Combat_icon.png', category: 'Paths' },
        path_dexterity: { name: 'Path of Dexterity', icon: 'https://oldschool.runescape.wiki/images/Agility_icon.png', category: 'Paths' },
        path_wisdom: { name: 'Path of Wisdom', icon: 'https://oldschool.runescape.wiki/images/Holy_symbol.png', category: 'Paths' },

        // Armour
        bronze_armor: { name: 'Bronze Armor', icon: 'https://oldschool.runescape.wiki/images/Bronze_platebody.png', category: 'Armour' },
        iron_armor: { name: 'Iron Armor', icon: 'https://oldschool.runescape.wiki/images/Iron_platebody.png', category: 'Armour' },
        steel_armor: { name: 'Steel Armor', icon: 'https://oldschool.runescape.wiki/images/Steel_platebody.png', category: 'Armour' },
        black_armor: { name: 'Black Armor', icon: 'https://oldschool.runescape.wiki/images/Black_platebody.png', category: 'Armour' },
        mithril_armor: { name: 'Mithril Armor', icon: 'https://oldschool.runescape.wiki/images/Mithril_platebody.png', category: 'Armour' },
        adamant_armor: { name: 'Adamant Armor', icon: 'https://oldschool.runescape.wiki/images/Adamant_platebody.png', category: 'Armour' },
        rune_armor: { name: 'Rune Armor', icon: 'https://oldschool.runescape.wiki/images/Rune_platebody.png', category: 'Armour' },
        oak_equip: { name: 'Oak Equipment', icon: 'https://oldschool.runescape.wiki/images/Oak_longbow.png', category: 'Armour' },
        willow_equip: { name: 'Willow Equipment', icon: 'https://oldschool.runescape.wiki/images/Willow_longbow.png', category: 'Armour' },
        maple_equip: { name: 'Maple Equipment', icon: 'https://oldschool.runescape.wiki/images/Maple_longbow.png', category: 'Armour' },

        // Weapons
        bronze_weapon: { name: 'Bronze Weapons', icon: 'https://oldschool.runescape.wiki/images/Bronze_sword.png', category: 'Weapons' },
        iron_weapon: { name: 'Iron Weapons', icon: 'https://oldschool.runescape.wiki/images/Iron_sword.png', category: 'Weapons' },
        steel_weapon: { name: 'Steel Weapons', icon: 'https://oldschool.runescape.wiki/images/Steel_sword.png', category: 'Weapons' },
        black_weapon: { name: 'Black Weapons', icon: 'https://oldschool.runescape.wiki/images/Black_sword.png', category: 'Weapons' },
        mithril_weapon: { name: 'Mithril Weapons', icon: 'https://oldschool.runescape.wiki/images/Mithril_sword.png', category: 'Weapons' },
        adamant_weapon: { name: 'Adamant Weapons', icon: 'https://oldschool.runescape.wiki/images/Adamant_sword.png', category: 'Weapons' },
        rune_weapon: { name: 'Rune Weapons', icon: 'https://oldschool.runescape.wiki/images/Rune_sword.png', category: 'Weapons' },

        // Other
        standard_spellbook: { name: 'Standard Spellbook', icon: 'https://oldschool.runescape.wiki/images/Standard_spellbook.png', category: 'Magic' },
        magic_teleports: { name: 'Teleports', icon: 'https://oldschool.runescape.wiki/images/Lumbridge_Teleport_icon.png', category: 'Magic' },
        high_alchemy: { name: 'High Alchemy', icon: 'https://oldschool.runescape.wiki/images/High_Alchemy.png', category: 'Magic' },
        enchantment: { name: 'Enchantment', icon: 'https://oldschool.runescape.wiki/images/Enchant_level_3_jewellery.png', category: 'Magic' },

        // Raids
        chambers_of_xeric: { name: 'Chambers of Xeric', icon: 'https://oldschool.runescape.wiki/images/thumb/Raids.png/120px-Raids.png?68e3d', category: 'Raids' },
        theatre_of_blood: { name: 'Theatre of Blood', icon: 'https://oldschool.runescape.wiki/images/thumb/Raids.png/120px-Raids.png?68e3d', category: 'Raids' },
        tombs_of_amascut: { name: 'Tombs of Amascut', icon: 'https://oldschool.runescape.wiki/images/thumb/Raids.png/120px-Raids.png?68e3d', category: 'Raids' },

        // Minigames
        barbarian_assault: { name: 'Barbarian Assault', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        barrows: { name: 'Barrows', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        blast_furnace: { name: 'Blast Furnace', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        blast_mine: { name: 'Blast Mine', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        bounty_hunter: { name: 'Bounty Hunter', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        brimhaven_agility_arena: { name: 'Brimhaven Agility Arena', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        castle_wars: { name: 'Castle Wars', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        clan_wars: { name: 'Clan Wars', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        fight_pits: { name: 'Fight Pits', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        fishing_trawler: { name: 'Fishing Trawler', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        forestry: { name: 'Forestry', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        games_room: { name: 'Games Room', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        giants_foundry: { name: 'Giants\' Foundry', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        gnome_ball: { name: 'Gnome Ball', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        gnome_restaurant: { name: 'Gnome Restaurant', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        guardians_of_the_rift: { name: 'Guardians of the Rift', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        hallowed_sepulchre: { name: 'Hallowed Sepulchre', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        last_man_standing: { name: 'Last Man Standing', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        mage_arena: { name: 'Mage Arena', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        mage_training_arena: { name: 'Mage Training Arena', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        mahogany_homes: { name: 'Mahogany Homes', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        nightmare_zone: { name: 'Nightmare Zone', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        pest_control: { name: 'Pest Control', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        pyramid_plunder: { name: 'Pyramid Plunder', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        rat_pits: { name: 'Rat Pits', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        rogues_den: { name: 'Rogues\' Den', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        shades_of_mortton: { name: 'Shades of Mort\'ton', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        sorceress_garden: { name: 'Sorceress\'s Garden', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        stealing_artefacts: { name: 'Stealing Artefacts', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        tai_bwo_wannai_cleanup: { name: 'Tai Bwo Wannai Cleanup', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        tears_of_guthix: { name: 'Tears of Guthix', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        temple_trekking: { name: 'Temple Trekking', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        the_gauntlet: { name: 'The Gauntlet', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        the_inferno: { name: 'The Inferno', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        tithe_farm: { name: 'Tithe Farm', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        trouble_brewing: { name: 'Trouble Brewing', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        tzhaar_fight_caves: { name: 'TzHaar Fight Caves', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        volcanic_mine: { name: 'Volcanic Mine', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },
        warriors_guild: { name: 'Warriors\' Guild', icon: 'https://oldschool.runescape.wiki/images/Minigame_icon.png', category: 'Minigames' },

        // Bosses
        chaos_elemental: { name: 'Chaos Elemental', icon: 'https://oldschool.runescape.wiki/images/Skull_icon.png', category: 'Bosses' },
        callisto: { name: 'Callisto', icon: 'https://oldschool.runescape.wiki/images/Skull_icon.png', category: 'Bosses' },
        artio: { name: 'Artio', icon: 'https://oldschool.runescape.wiki/images/Skull_icon.png', category: 'Bosses' },
        venenatis: { name: 'Venenatis', icon: 'https://oldschool.runescape.wiki/images/Skull_icon.png', category: 'Bosses' },
        spindel: { name: 'Spindel', icon: 'https://oldschool.runescape.wiki/images/Skull_icon.png', category: 'Bosses' },
        vetion: { name: 'Vet\'ion', icon: 'https://oldschool.runescape.wiki/images/Skull_icon.png', category: 'Bosses' },
        calvarion: { name: 'Calvar\'ion', icon: 'https://oldschool.runescape.wiki/images/Skull_icon.png', category: 'Bosses' },
        chaos_fanatic: { name: 'Chaos Fanatic', icon: 'https://oldschool.runescape.wiki/images/Skull_icon.png', category: 'Bosses' },
        crazy_archaeologist: { name: 'Crazy Archaeologist', icon: 'https://oldschool.runescape.wiki/images/Skull_icon.png', category: 'Bosses' },

        // God Wars Dungeon
        general_graardor: { name: 'General Graardor', icon: 'https://oldschool.runescape.wiki/images/Skull_icon.png', category: 'Bosses' },
        kril_tsutsaroth: { name: 'K\'ril Tsutsaroth', icon: 'https://oldschool.runescape.wiki/images/Skull_icon.png', category: 'Bosses' },
        commander_zilyana: { name: 'Commander Zilyana', icon: 'https://oldschool.runescape.wiki/images/Skull_icon.png', category: 'Bosses' },
        kreearra: { name: 'Kree\'Arra', icon: 'https://oldschool.runescape.wiki/images/Skull_icon.png', category: 'Bosses' },
        nex: { name: 'Nex', icon: 'https://oldschool.runescape.wiki/images/Skull_icon.png', category: 'Bosses' },

        // Sporadic Bosses
        hespori: { name: 'Hespori', icon: 'https://oldschool.runescape.wiki/images/Skull_icon.png', category: 'Bosses' },
        skotizo: { name: 'Skotizo', icon: 'https://oldschool.runescape.wiki/images/Skull_icon.png', category: 'Bosses' },
    };

    const QUEST_LIST = ["X Marks the Spot", "Witch's Potion", "Vampyre Slayer", "Shield of Arrav", "Sheep Shearer", "Rune Mysteries", "Romeo & Juliet", "The Restless Ghost", "Prince Ali Rescue", "Pirate's Treasure", "Misthalin Mystery", "The Knight's Sword", "Imp Catcher", "Goblin Diplomacy", "Ernest the Chicken", "Dragon Slayer I", "Doric's Quest", "Demon Slayer", "The Corsair Curse", "Cook's Assistant", "Black Knights' Fortress", "Below Ice Mountain", "Druidic Ritual", "Lost City", "Witch's House", "Merlin's Crystal", "Heroes' Quest", "Scorpion Catcher", "Family Crest", "Fishing Contest", "Tribal Totem", "Monk's Friend", "Temple of Ikov", "Clock Tower", "Holy Grail", "Tree Gnome Village", "Fight Arena", "Hazeel Cult", "Sheep Herder", "Plague City", "Sea Slug", "Waterfall Quest", "Jungle Potion", "The Grand Tree", "Underground Pass", "Observatory Quest", "The Tourist Trap", "Watchtower", "Dwarf Cannon", "Murder Mystery", "The Dig Site", "Gertrude's Cat", "Legends' Quest", "Death Plateau", "Eadgar's Ruse", "Big Chompy Bird Hunting", "Elemental Workshop I", "Nature Spirit", "Priest in Peril", "Regicide", "Tai Bwo Wannai Trio", "Troll Stronghold", "Shades of Mort'ton", "The Fremennik Trials", "Horror from the Deep", "Throne of Miscellania", "Monkey Madness I", "Haunted Mine", "Troll Romance", "In Search of the Myreque", "Creature of Fenkenstrain", "Roving Elves", "Ghosts Ahoy", "One Small Favour", "Mountain Daughter", "Between a Rock...", "The Feud", "The Golem", "Desert Treasure I", "Icthlarin's Little Helper", "Tears of Guthix", "The Lost Tribe", "The Giant Dwarf", "Recruitment Drive", "Mourning's End Part I", "Forgettable Tale...", "Garden of Tranquillity", "A Tail of Two Cats", "Wanted!", "Mourning's End Part II", "Rum Deal", "Shadow of the Storm", "Making History", "Ratcatchers", "Spirits of the Elid", "Devious Minds", "The Hand in the Sand", "Enakhra's Lament", "Cabin Fever", "Fairytale I - Growing Pains", "Recipe for Disaster", "In Aid of the Myreque", "A Soul's Bane", "Rag and Bone Man", "Swan Song", "Royal Trouble", "Death to the Dorgeshuun", "Fairytale II - Cure a Queen", "Lunar Diplomacy", "The Eyes of Glouphrie", "Darkness of Hallowvale", "The Slug Menace", "Elemental Workshop II", "My Arm's Big Adventure", "Enlightened Journey", "Eagles' Peak", "Animal Magnetism", "Contact!", "Cold War", "The Fremennik Isles", "Tower of Life", "The Great Brain Robbery", "What Lies Below", "Olaf's Quest", "Another Slice of H.A.M.", "Dream Mentor", "Zogre Flesh Eaters", "The Lost City", "Dragon Slayer II", "Monkey Madness II", "Bone Voyage", "Client of Kourend", "The Queen of Thieves", "The Depths of Despair", "The Ascent of Arceuus", "The Forsaken Tower", "Tale of the Righteous", "A Taste of Hope", "Making Friends with My Arm", "The Fremennik Exiles", "Sins of the Father", "A Porcine of Interest", "Getting Ahead", "The Garden of Death", "Below Ice Mountain", "Secrets of the North", "Desert Treasure II - The Fallen Empire", "Sleeping Giants", "The Path of Glouphrie", "Children of the Sun"];

    QUEST_LIST.forEach(q => {
        const id = 'quest_' + q.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
        if (!MASTER_NODE_LIBRARY[id]) {
            MASTER_NODE_LIBRARY[id] = { name: q, icon: 'https://oldschool.runescape.wiki/images/Quest_point_icon.png', category: 'Quests' };
        }
    });

    const TREE_DATA = {
        genesis: { type: 'major', name: 'Genesis', desc: 'The origin point of your journey.', cost: 0, status: 'unlocked', deps: [], pos: { x: '50%', y: '50%' }, icon: 'https://oldschool.runescape.wiki/images/Achievement_Diaries_icon.png' }
    };
    const treePanel = document.getElementById('tree-panel');
    const treeCanvas = document.getElementById('tree-canvas');
    const treeContainer = document.getElementById('tree-container');
    const treeSvg = document.getElementById('tree-svg');
    const saveBtn = document.getElementById('save-btn');
    const loadBtn = document.getElementById('load-btn');
    const fileLoader = document.getElementById('file-loader');
    const infoNodeName = document.getElementById('info-node-name');
    const infoNodeX = document.getElementById('info-node-x');
    const infoNodeY = document.getElementById('info-node-y');
    const nodeList = document.getElementById('node-list');
    const createNodeBtn = document.getElementById('create-node-btn');
    const newNodeNameInput = document.getElementById('new-node-name');
    const editNodePanel = document.getElementById('edit-node-panel');
    const editNodeNameInput = document.getElementById('edit-node-name');
    const renameNodeBtn = document.getElementById('rename-node-btn');
    const editNodeDesc = document.getElementById('edit-node-desc');
    const cannedDescButtons = document.getElementById('canned-desc-buttons');
    const updateDescBtn = document.getElementById('update-desc-btn');
    const resizePanel = document.getElementById('resize-panel');
    const selectionBox = document.getElementById('selection-box');
    const snapToGridCheckbox = document.getElementById('snap-to-grid');
    const deleteNodeBtn = document.getElementById('delete-node-btn');
    const linkModeBtn = document.getElementById('link-mode-btn');
    const iconPickerPanel = document.getElementById('icon-picker-panel');
    const iconPool = document.getElementById('icon-pool');
    const unlinkAllBtn = document.getElementById('unlink-all-btn');
    const quickAddLinkBtn = document.getElementById('quick-add-link-btn');
    const nodeSearchInput = document.getElementById('node-search');
    const nodeCategoryFilters = document.getElementById('node-category-filters');
    const miniMap = document.getElementById('mini-map');
    const miniMapNodes = document.getElementById('mini-map-nodes');
    const miniMapViewport = document.getElementById('mini-map-viewport');
    const CANVAS_SIZE = 50000;

    let activeCategory = 'All';

    let isDragging = false;
    let isInLinkMode = false;
    let linkModeParent = null;
    let isQuickAddLinkMode = false;
    let quickAddLinkParent = null;
    let isPanning = false;
    let hasPanned = false;
    let isSelecting = false;
    let activeNodeEl = null;
    let isDraggingMiniMap = false;
    
    let selectedNodeIds = new Set();
    let initialMultiNodePositions = new Map();

    let startX, startY;
    let canvasX = 0, canvasY = 0;
    let initialCanvasX = 0, initialCanvasY = 0;
    let scale = 0.5;
    const scaleFactor = 0.1;
    const minScale = 0.2;
    const maxScale = 2.5;

    function renderMiniMap() {
        if (!miniMap) return;
        miniMapNodes.innerHTML = '';
        const miniScaleX = miniMap.clientWidth / CANVAS_SIZE;
        const miniScaleY = miniMap.clientHeight / CANVAS_SIZE;

        for (const id in TREE_DATA) {
            const node = TREE_DATA[id];
            const miniNode = document.createElement('div');
            miniNode.className = 'mini-node';
            
            const nodeX = parseFloat(node.pos.x) / 100 * CANVAS_SIZE;
            const nodeY = parseFloat(node.pos.y) / 100 * CANVAS_SIZE;

            miniNode.style.left = `${nodeX * miniScaleX}px`;
            miniNode.style.top = `${nodeY * miniScaleY}px`;
            
            const size = (node.type === 'minor' ? 2 : (node.type === 'major' ? 3 : (node.type === 'epic' ? 4 : 5)));
            miniNode.style.width = `${size}px`;
            miniNode.style.height = `${size}px`;

            miniMapNodes.appendChild(miniNode);
        }
    }

    function updateMiniMapViewPort() {
        if (!miniMap) return;
        const miniScaleX = miniMap.clientWidth / CANVAS_SIZE;
        const miniScaleY = miniMap.clientHeight / CANVAS_SIZE;

        const viewWidth = treePanel.clientWidth / scale;
        const viewHeight = treePanel.clientHeight / scale;
        const viewX = -canvasX / scale;
        const viewY = -canvasY / scale;

        miniMapViewport.style.width = `${viewWidth * miniScaleX}px`;
        miniMapViewport.style.height = `${viewHeight * miniScaleY}px`;
        miniMapViewport.style.left = `${viewX * miniScaleX}px`;
        miniMapViewport.style.top = `${viewY * miniScaleY}px`;
    }

    function moveCanvasFromMiniMap(e) {
        const miniMapRect = miniMap.getBoundingClientRect();
        const miniScaleX = miniMap.clientWidth / CANVAS_SIZE;
        const miniScaleY = miniMap.clientHeight / CANVAS_SIZE;

        const mouseX = e.clientX - miniMapRect.left;
        const mouseY = e.clientY - miniMapRect.top;

        const targetX = mouseX / miniScaleX;
        const targetY = mouseY / miniScaleY;

        canvasX = - (targetX * scale - treePanel.clientWidth / 2);
        canvasY = - (targetY * scale - treePanel.clientHeight / 2);
        
        applyTransform();
    }

    function applyTransform() {
        treeCanvas.style.transform = `translate(${canvasX}px, ${canvasY}px) scale(${scale})`;
        updateMiniMapViewPort();
    }

    function renderLines() {
        // Define arrowhead marker
        treeSvg.innerHTML = `
            <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                refX="9" refY="3.5" orient="auto" fill="var(--line-unlocked)">
                    <polygon points="0 0, 10 3.5, 0 7" />
                </marker>
            </defs>
        `;
        
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
                    line.setAttribute('marker-end', 'url(#arrowhead)');
                    treeSvg.appendChild(line);
                });
            }
        });
    }

    function populateCategoryFilters() {
        const categories = ['All', ...new Set(Object.values(MASTER_NODE_LIBRARY).map(n => n.category || 'Other'))].sort();
        nodeCategoryFilters.innerHTML = '';
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.textContent = category;
            if (category === activeCategory) {
                btn.classList.add('active');
            }
            btn.addEventListener('click', () => {
                activeCategory = category;
                // Update active class on buttons
                document.querySelectorAll('.category-btn.active').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderNodeList();
            });
            nodeCategoryFilters.appendChild(btn);
        });
    }

            function renderNodeList() {
                const searchTerm = nodeSearchInput.value.toLowerCase();
                const nodesOnCanvas = new Map(Object.entries(TREE_DATA).map(([id, node]) => [node.name, id]));
                const masterList = Object.entries(MASTER_NODE_LIBRARY).sort(([, a], [, b]) => a.name.localeCompare(b.name));
                
                // Filter based on category and search
                const filteredList = masterList.filter(([, node]) => {
                    const matchesCategory = activeCategory === 'All' || node.category === activeCategory;
                    const matchesSearch = node.name.toLowerCase().includes(searchTerm);
                    return matchesCategory && matchesSearch;
                });
    
                const totalNodesInFilter = filteredList.length;
                let usedNodesInFilter = 0;
                filteredList.forEach(([id, masterNode]) => {
                    if (nodesOnCanvas.has(masterNode.name)) {
                        usedNodesInFilter++;
                    }
                });
    
                const nodeCounter = document.getElementById('node-counter');
                if (nodeCounter) {
                    nodeCounter.textContent = `${usedNodesInFilter}/${totalNodesInFilter}`;
                }
    
                nodeList.innerHTML = '';        filteredList.forEach(([id, masterNode]) => {
            const li = document.createElement('li');
            const existingNodeId = nodesOnCanvas.get(masterNode.name);

            if (existingNodeId) {
                li.textContent = masterNode.name;
                li.dataset.nodeId = existingNodeId;
                li.style.color = 'var(--text-light-grey)';
                if (selectedNodeIds.has(existingNodeId)) {
                    li.classList.add('selected');
                }
                li.addEventListener('click', () => {
                    selectedNodeIds.clear();
                    selectedNodeIds.add(existingNodeId);
                    updateSelectionUI();
                });
            } else {
                li.innerHTML = `<span>${masterNode.name}</span><span style="color: var(--status-green);">[+]</span>`;
                li.style.color = 'var(--text-dark-grey)';
                li.title = 'Click to add to canvas';
                li.addEventListener('click', () => {
                    let newId = id;
                    let counter = 1;
                    while (TREE_DATA[newId]) {
                        newId = `${id}_${counter++}`;
                    }

                    if (isQuickAddLinkMode && quickAddLinkParent) {
                        const parentNode = TREE_DATA[quickAddLinkParent];
                        if (!parentNode.quickAddChildCount) parentNode.quickAddChildCount = 0;
                        
                        const parentX = parseFloat(parentNode.pos.x);
                        const parentY = parseFloat(parentNode.pos.y);
                        
                        // Place new nodes in a circle around the parent
                        const angle = parentNode.quickAddChildCount * (Math.PI / 4); // 45-degree increments
                        const radius = 0.3; // 0.3% of canvas width, which is 150px.
                        const newX = parentX + radius * Math.cos(angle);
                        const newY = parentY + radius * Math.sin(angle);

                        TREE_DATA[newId] = {
                            type: 'minor', name: masterNode.name, desc: `The '${masterNode.name}' node.`, cost: 1, status: 'locked',
                            deps: [quickAddLinkParent], pos: { x: `${newX.toFixed(2)}%`, y: `${newY.toFixed(2)}%` },
                            icon: masterNode.icon
                        };
                        parentNode.quickAddChildCount++;
                    } else {
                        const canvasWidth = treeCanvas.offsetWidth;
                        const canvasHeight = treeCanvas.offsetHeight;
                        const centerX = ((-canvasX + treePanel.clientWidth / 2) / scale);
                        const centerY = ((-canvasY + treePanel.clientHeight / 2) / scale);
                        const xPercent = (centerX / canvasWidth * 100).toFixed(2);
                        const yPercent = (centerY / canvasHeight * 100).toFixed(2);

                        TREE_DATA[newId] = {
                            type: 'minor', name: masterNode.name, desc: `The '${masterNode.name}' node.`, cost: 1, status: 'locked',
                            deps: [], pos: { x: `${xPercent}%`, y: `${yPercent}%` },
                            icon: masterNode.icon
                        };
                    }

                    renderNodes();
                    renderLines();
                    renderNodeList();
                    selectedNodeIds.clear();
                    selectedNodeIds.add(newId);
                    updateSelectionUI();
                });
            }
            nodeList.appendChild(li);
        });
    }

    nodeSearchInput.addEventListener('input', renderNodeList);

    function populateIconPicker() {
        iconPool.innerHTML = '';
        ICON_POOL.forEach(iconUrl => {
            const img = document.createElement('img');
            img.src = iconUrl;
            img.addEventListener('click', () => {
                if (selectedNodeIds.size !== 1) return;
                const [nodeId] = selectedNodeIds;
                TREE_DATA[nodeId].icon = iconUrl;
                updateNodeIcon(nodeId, iconUrl);
            });
            iconPool.appendChild(img);
        });
    }

    function updateNodeIcon(nodeId, iconUrl) {
        const nodeEl = document.getElementById(nodeId);
        if (nodeEl) {
            const imgEl = nodeEl.querySelector('.node-icon');
            if (imgEl) {
                imgEl.src = iconUrl;
            }
        }
    }

    function updateSelectionUI() {
        // Update selection on canvas
        document.querySelectorAll('.node.selected').forEach(n => n.classList.remove('selected'));
        selectedNodeIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('selected');
        });

        // Update selection in the node list
        document.querySelectorAll('#node-list li').forEach(li => {
            if (selectedNodeIds.has(li.dataset.nodeId)) {
                li.classList.add('selected');
            } else {
                li.classList.remove('selected');
            }
        });

        // Update panels
        deleteNodeBtn.style.display = selectedNodeIds.size > 0 ? 'block' : 'none';
        linkModeBtn.style.display = selectedNodeIds.size === 1 ? 'block' : 'none';

        if (selectedNodeIds.size === 1) {
            const [nodeId] = selectedNodeIds;
            const nodeData = TREE_DATA[nodeId];
            infoNodeName.textContent = nodeData.name;
            infoNodeX.textContent = nodeData.pos.x;
            infoNodeY.textContent = nodeData.pos.y;
            
            if (!isQuickAddLinkMode) {
                editNodePanel.style.display = 'flex';
                iconPickerPanel.style.display = 'block';
            } else {
                editNodePanel.style.display = 'none';
                iconPickerPanel.style.display = 'none';
            }

            editNodeNameInput.value = nodeData.name;
            editNodeDesc.value = nodeData.desc || '';
        } else {
            infoNodeName.textContent = selectedNodeIds.size > 1 ? `${selectedNodeIds.size} nodes selected` : 'None';
            infoNodeX.textContent = '--';
            infoNodeY.textContent = '--';
            editNodePanel.style.display = 'none';
            iconPickerPanel.style.display = 'none';
        }
    }

    function renderNodes() {
        const parentIds = new Set();
        Object.values(TREE_DATA).forEach(node => {
            if (node.deps) {
                node.deps.forEach(depId => parentIds.add(depId));
            }
        });

        treeContainer.innerHTML = '';
        Object.keys(TREE_DATA).forEach(id => {
            const node = TREE_DATA[id];
            const nodeEl = document.createElement('div');
            nodeEl.id = id;
            nodeEl.className = `node node-${node.type}`;

            if (parentIds.has(id)) {
                nodeEl.classList.add('is-parent');
            } else if (node.deps && node.deps.length > 0) {
                nodeEl.classList.add('is-leaf');
            }

            nodeEl.style.left = node.pos.x;
            nodeEl.style.top = node.pos.y;
            nodeEl.style.transform = 'translate(-50%, -50%)';
            nodeEl.innerHTML = `<img src="${node.icon}" class="node-icon" alt="${node.name}">`;
            
            nodeEl.addEventListener('mousedown', (e) => {
                if (isQuickAddLinkMode) {
                    if (!quickAddLinkParent) {
                        quickAddLinkParent = id;
                        quickAddLinkBtn.textContent = `Adding to ${TREE_DATA[id].name}`;
                        document.querySelectorAll('.node').forEach(el => el.classList.remove('dimmed'));
                    }
                    return;
                }

                e.stopPropagation();
                isDragging = true;
                activeNodeEl = e.currentTarget;
                
                if (e.shiftKey) {
                    if (selectedNodeIds.has(id)) {
                        selectedNodeIds.delete(id);
                    } else {
                        selectedNodeIds.add(id);
                    }
                } else if (!selectedNodeIds.has(id)) {
                    selectedNodeIds.clear();
                    selectedNodeIds.add(id);
                }
                updateSelectionUI();

                initialMultiNodePositions.clear();
                selectedNodeIds.forEach(selectedId => {
                     const el = document.getElementById(selectedId);
                     initialMultiNodePositions.set(selectedId, {
                        left: (parseFloat(el.style.left) / 100) * treeCanvas.offsetWidth,
                        top: (parseFloat(el.style.top) / 100) * treeCanvas.offsetHeight
                     });
                });
                
                startX = e.clientX;
                startY = e.clientY;
            });
            treeContainer.appendChild(nodeEl);
        });
        updateSelectionUI();
        renderMiniMap();
    }
    
    miniMap.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDraggingMiniMap = true;
        moveCanvasFromMiniMap(e);
    });

    treePanel.addEventListener('mousedown', (e) => {
        if (e.target.closest('.node')) return;

        if (isInLinkMode) {
            exitLinkMode();
            return;
        }

        if (e.shiftKey) {
            isSelecting = true;
            isPanning = false;
            selectedNodeIds.clear();
            updateSelectionUI();

            const rect = treePanel.getBoundingClientRect();
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
            selectionBox.style.left = `${startX}px`;
            selectionBox.style.top = `${startY}px`;
            selectionBox.style.width = '0px';
            selectionBox.style.height = '0px';
            selectionBox.style.display = 'block';
        } else {
            isPanning = true;
            hasPanned = false;
            isSelecting = false;
            startX = e.clientX;
            startY = e.clientY;
            initialCanvasX = canvasX;
            initialCanvasY = canvasY;
        }
    });

    window.addEventListener('mousemove', (e) => {
        if (isDraggingMiniMap) {
            e.preventDefault();
            moveCanvasFromMiniMap(e);
            return;
        }

        if (isPanning) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                hasPanned = true;
            }
             e.preventDefault();
            canvasX = initialCanvasX + dx;
            canvasY = initialCanvasY + dy;
            applyTransform();
        } else if (isSelecting) {
            e.preventDefault();
            const rect = treePanel.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;

            const left = Math.min(startX, currentX);
            const top = Math.min(startY, currentY);
            const width = Math.abs(startX - currentX);
            const height = Math.abs(startY - currentY);

            selectionBox.style.left = `${left}px`;
            selectionBox.style.top = `${top}px`;
            selectionBox.style.width = `${width}px`;
            selectionBox.style.height = `${height}px`;

            const selectionRect = selectionBox.getBoundingClientRect();
            document.querySelectorAll('.node').forEach(nodeEl => {
                const nodeRect = nodeEl.getBoundingClientRect();
                if (
                    nodeRect.left < selectionRect.right &&
                    nodeRect.right > selectionRect.left &&
                    nodeRect.top < selectionRect.bottom &&
                    nodeRect.bottom > selectionRect.top
                ) {
                    selectedNodeIds.add(nodeEl.id);
                } else if (!e.shiftKey) {
                     selectedNodeIds.delete(nodeEl.id);
                }
            });
            updateSelectionUI();
        }
        else if (isDragging && !isInLinkMode) {
            e.preventDefault();
            const dx = (e.clientX - startX) / scale;
            const dy = (e.clientY - startY) / scale;
            const gridSize = 25;

            selectedNodeIds.forEach(id => {
                const el = document.getElementById(id);
                const initialPos = initialMultiNodePositions.get(id);
                if (!el || !initialPos) return;

                let newLeft = initialPos.left + dx;
                let newTop = initialPos.top + dy;

                if (snapToGridCheckbox.checked) {
                    newLeft = Math.round(newLeft / gridSize) * gridSize;
                    newTop = Math.round(newTop / gridSize) * gridSize;
                }
                
                newLeft = Math.max(0, Math.min(treeCanvas.offsetWidth, newLeft));
                newTop = Math.max(0, Math.min(treeCanvas.offsetHeight, newTop));

                const xPercent = (newLeft / treeCanvas.offsetWidth * 100).toFixed(2);
                const yPercent = (newTop / treeCanvas.offsetHeight * 100).toFixed(2);
                
                el.style.left = `${xPercent}%`;
                el.style.top = `${yPercent}%`;
                TREE_DATA[id].pos.x = `${xPercent}%`;
                TREE_DATA[id].pos.y = `${yPercent}%`;
            });
            
            if (selectedNodeIds.size === 1) {
                const [nodeId] = selectedNodeIds;
                infoNodeX.textContent = TREE_DATA[nodeId].pos.x;
                infoNodeY.textContent = TREE_DATA[nodeId].pos.y;
            }
            renderLines();
        }
    });

    window.addEventListener('mouseup', () => {
        if (isPanning && !hasPanned) {
            selectedNodeIds.clear();
            updateSelectionUI();
        }

        isDragging = false;
        isPanning = false;
        hasPanned = false;
        isSelecting = false;
        isDraggingMiniMap = false;
        selectionBox.style.display = 'none';
    });

    treePanel.addEventListener('wheel', (e) => {
        e.preventDefault();
        const rect = treePanel.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
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
    
    createNodeBtn.addEventListener('click', () => {
        const name = newNodeNameInput.value.trim();
        if (!name) {
            newNodeNameInput.style.boxShadow = 'inset 0 0 0 2px red';
            return;
        }
        newNodeNameInput.style.boxShadow = 'inset 0 0 0 1px var(--border-bevel)';
        let baseId = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
        let newId = baseId;
        let counter = 1;
        while (TREE_DATA[newId]) {
            newId = `${baseId}_${counter++}`;
        }
        
        const canvasWidth = treeCanvas.offsetWidth;
        const canvasHeight = treeCanvas.offsetHeight;
        const gridSize = 25;
        let centerX = ((-canvasX + treePanel.clientWidth / 2) / scale);
        let centerY = ((-canvasY + treePanel.clientHeight / 2) / scale);

        if (snapToGridCheckbox.checked) {
            centerX = Math.round(centerX / gridSize) * gridSize;
            centerY = Math.round(centerY / gridSize) * gridSize;
        }

        const xPercent = (centerX / canvasWidth * 100).toFixed(2);
        const yPercent = (centerY / canvasHeight * 100).toFixed(2);

        TREE_DATA[newId] = {
            type: 'minor', name: name, desc: 'A new node.', cost: 1, status: 'locked',
            deps: [], pos: { x: `${xPercent}%`, y: `${yPercent}%` },
            icon: 'https://oldschool.runescape.wiki/images/Quest_point_icon.png'
        };
        renderNodes();
        selectedNodeIds.clear();
        selectedNodeIds.add(newId);
        updateSelectionUI();
        renderNodeList();
        newNodeNameInput.value = '';
    });

    renameNodeBtn.addEventListener('click', () => {
        if (selectedNodeIds.size !== 1) return;
        const [nodeId] = selectedNodeIds;
        const newName = editNodeNameInput.value.trim();
        if (newName && newName !== TREE_DATA[nodeId].name) {
            TREE_DATA[nodeId].name = newName;
            infoNodeName.textContent = newName;
            renderNodeList();
        }
    });

    updateDescBtn.addEventListener('click', () => {
        if (selectedNodeIds.size !== 1) return;
        const [nodeId] = selectedNodeIds;
        TREE_DATA[nodeId].desc = editNodeDesc.value;
        // Maybe add a small visual confirmation later
    });

    cannedDescButtons.addEventListener('click', (e) => {
        if (e.target.classList.contains('canned-btn')) {
            if (selectedNodeIds.size !== 1) return;
            const [nodeId] = selectedNodeIds;
            const template = e.target.dataset.template;
            const nodeName = TREE_DATA[nodeId].name;
            editNodeDesc.value = template.replace('[NAME]', nodeName);
        }
    });

    function updateNodeType(nodeId, newType) {
        const nodeEl = document.getElementById(nodeId);
        if (nodeEl) {
            nodeEl.classList.remove('node-minor', 'node-major', 'node-epic', 'node-legendary');
            nodeEl.classList.add(`node-${newType}`);
        }
    }

    resizePanel.addEventListener('click', (e) => {
        if (e.target.dataset.size) {
            if (selectedNodeIds.size !== 1) return;
            const [nodeId] = selectedNodeIds;
            const newSize = e.target.dataset.size;
            TREE_DATA[nodeId].type = newSize;
            updateNodeType(nodeId, newSize);
        }
    });

    deleteNodeBtn.addEventListener('click', () => {
        if (selectedNodeIds.size === 0) return;
        if (confirm(`Are you sure you want to delete ${selectedNodeIds.size} node(s)? This cannot be undone.`)) {
            selectedNodeIds.forEach(nodeId => {
                if (nodeId === 'genesis') {
                    alert("Cannot delete the Genesis node.");
                    return;
                };

                delete TREE_DATA[nodeId];
                
                Object.keys(TREE_DATA).forEach(otherId => {
                    const otherNode = TREE_DATA[otherId];
                    if (otherNode.deps) {
                        const index = otherNode.deps.indexOf(nodeId);
                        if (index > -1) {
                            otherNode.deps.splice(index, 1);
                        }
                    }
                });
            });
            selectedNodeIds.clear();
            renderNodes();
            renderLines();
            renderNodeList();
            updateSelectionUI();
        }
    });

    function linkModeClickHandler(e) {
        e.stopPropagation();

        const clickedId = e.currentTarget.id;
        if (clickedId === linkModeParent) return;

        const childNode = TREE_DATA[clickedId];
        if (!childNode) return;

        const depIndex = childNode.deps.indexOf(linkModeParent);

        if (depIndex > -1) {
            childNode.deps.splice(depIndex, 1);
        } else {
            childNode.deps.push(linkModeParent);
        }
        renderLines();
    }

    function exitLinkMode() {
        if (!isInLinkMode) return;
        isInLinkMode = false;
        
        document.body.classList.remove('link-mode-active');
        document.querySelectorAll('.node').forEach(el => {
            el.classList.remove('dimmed');
            el.removeEventListener('click', linkModeClickHandler);
        });

        linkModeBtn.textContent = 'Link/Unlink Children';
        linkModeBtn.style.backgroundColor = '';
        unlinkAllBtn.style.display = 'none';
        linkModeParent = null;

        if(selectedNodeIds.size !== 1) {
            linkModeBtn.style.display = 'none';
        }
    }

    function toggleQuickAddLinkMode() {
        if (isInLinkMode) exitLinkMode();
        isQuickAddLinkMode = !isQuickAddLinkMode;

        if (isQuickAddLinkMode) {
            // Hide other panels to give space to the node list
            editNodePanel.style.display = 'none';
            iconPickerPanel.style.display = 'none';

            quickAddLinkBtn.textContent = 'Click Parent Node...';
            quickAddLinkBtn.style.backgroundColor = '#5cb85c';
            document.body.classList.add('link-mode-active'); // Reuse for cursor style
        } else {
            quickAddLinkBtn.textContent = 'Quick-Add & Link';
            quickAddLinkBtn.style.backgroundColor = '';
            document.body.classList.remove('link-mode-active');
            quickAddLinkParent = null;
            
            // Restore panel visibility based on selection
            updateSelectionUI();
        }
    }

    quickAddLinkBtn.addEventListener('click', toggleQuickAddLinkMode);

    linkModeBtn.addEventListener('click', () => {
        if (isQuickAddLinkMode) toggleQuickAddLinkMode();
        if (isInLinkMode) {
            exitLinkMode();
            return;
        }

        if (selectedNodeIds.size === 1) {
            isInLinkMode = true;
            [linkModeParent] = selectedNodeIds;
            
            document.body.classList.add('link-mode-active');
            document.querySelectorAll('.node').forEach(el => {
                if (el.id !== linkModeParent) {
                    el.classList.add('dimmed');
                }
                el.addEventListener('click', linkModeClickHandler);
            });

            linkModeBtn.textContent = 'Finish Linking';
            linkModeBtn.style.backgroundColor = '#5cb85c';
            unlinkAllBtn.style.display = 'block';
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Universal "reset" or "deselect" action
            e.preventDefault();

            if (isQuickAddLinkMode) {
                toggleQuickAddLinkMode();
            }

            // Exit link mode if active
            if (isInLinkMode) {
                exitLinkMode();
            }

            // Clear any active text input focus
            if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
                document.activeElement.blur();
            }

            // Clear node selection
            if (selectedNodeIds.size > 0) {
                selectedNodeIds.clear();
                updateSelectionUI();
            }
        }
    });

    unlinkAllBtn.addEventListener('click', () => {
        if (!isInLinkMode || !linkModeParent) return;

        if (confirm(`Are you sure you want to unlink all children from "${TREE_DATA[linkModeParent].name}"?`)) {
            Object.keys(TREE_DATA).forEach(id => {
                const node = TREE_DATA[id];
                if (node.deps) {
                    const index = node.deps.indexOf(linkModeParent);
                    if (index > -1) {
                        node.deps.splice(index, 1);
                    }
                }
            });
            renderLines();
        }
    });

    saveBtn.addEventListener('click', () => {
        try {
            const dataStr = JSON.stringify(TREE_DATA, null, 4);
            const dataBlob = new Blob([dataStr], {type: "application/json"});
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.download = 'skill-tree.json';
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            alert("Error saving file: " + error.message);
        }
    });

    loadBtn.addEventListener('click', () => {
        fileLoader.click();
    });

    fileLoader.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const loadedData = JSON.parse(event.target.result);
                
                // Basic validation
                if (typeof loadedData === 'object' && loadedData.genesis) {
                    // It's a valid tree, overwrite the current data
                    Object.keys(TREE_DATA).forEach(key => delete TREE_DATA[key]);
                    Object.assign(TREE_DATA, loadedData);

                    // Full UI refresh
                    renderNodes();
                    renderLines();
                    renderNodeList();
                    populateCategoryFilters();
                    updateSelectionUI();
                    alert('Tree loaded successfully!');
                } else {
                    alert('Error: Invalid or corrupted tree file.');
                }
            } catch (error) {
                alert('Error parsing file: ' + error.message);
            }
        };
        reader.readAsText(file);
        
        // Reset the input so the change event fires even if the same file is selected again
        e.target.value = '';
    });

    const panelRect = treePanel.getBoundingClientRect();
    const canvasSize = 50000;
    canvasX = (panelRect.width / 2) - (canvasSize * 0.5 * scale);
    canvasY = (panelRect.height / 2) - (canvasSize * 0.5 * scale);

    renderNodes();
    renderLines();
    renderNodeList();
    populateIconPicker();
    populateCategoryFilters();
    applyTransform();
});
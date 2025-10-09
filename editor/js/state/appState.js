export const state = {
    TREE_DATA: {
        genesis: { type: 'major', name: 'Genesis', desc: 'The origin point of your journey.', cost: 0, status: 'unlocked', deps: [], pos: { x: '50%', y: '50%' }, icon: 'https://oldschool.runescape.wiki/images/Achievement_Diaries_icon.png' }
    },
    activeCategory: 'All',
    shapeNodeList: [],
    isShapeListBuildingMode: false,
    isDragging: false,
    isInLinkMode: false,
    linkModeParent: null,
    isQuickAddLinkMode: false,
    quickAddLinkParent: null,
    isPanning: false,
    hasPanned: false,
    isSelecting: false,
    activeNodeEl: null,
    isDraggingMiniMap: false,
    selectedNodeIds: new Set(),
    initialMultiNodePositions: new Map(),
    startX: 0,
    startY: 0,
    canvasX: 0,
    canvasY: 0,
    initialCanvasX: 0,
    initialCanvasY: 0,
    scale: 0.5,
};

export const CANVAS_SIZE = 50000;
export const scaleFactor = 0.1;
export const minScale = 0.2;
export const maxScale = 2.5;

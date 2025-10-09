import { state } from '../state/appState.js';
import * as dom from '../dom/elements.js';
import { MASTER_NODE_LIBRARY } from '../constants/masterNodeLibrary.js';
import { renderAll, renderShapeNodeList } from './renderer.js';

function toggleShapeListBuildMode() {
    state.isShapeListBuildingMode = !state.isShapeListBuildingMode;

    if (state.isShapeListBuildingMode) {
        dom.buildShapeListBtn.textContent = 'Finish Selecting';
        dom.buildShapeListBtn.style.backgroundColor = '#5cb85c';
        dom.nodeList.style.cursor = 'copy';
        dom.nodeList.classList.add('shape-building-active');
    } else {
        dom.buildShapeListBtn.textContent = 'Select Nodes for Shape';
        dom.buildShapeListBtn.style.backgroundColor = '';
        dom.nodeList.style.cursor = '';
        dom.nodeList.classList.remove('shape-building-active');
    }
}

function createNodeShape() {
    const shape = dom.shapePresetSelect.value;
    const nodeNames = [...state.shapeNodeList];

    if (nodeNames.length === 0) {
        alert('Please build a list of nodes first.');
        return;
    }

    const masterNodeMap = new Map();
    Object.entries(MASTER_NODE_LIBRARY).forEach(([key, node]) => {
        masterNodeMap.set(node.name.toLowerCase(), { key, node });
    });

    const nodesToCreate = nodeNames.map(name => {
        const trimmedName = name.trim().toLowerCase();
        return masterNodeMap.get(trimmedName);
    }).filter(Boolean);

    if (nodesToCreate.length !== nodeNames.length) {
        const notFound = nodeNames.filter(name => !masterNodeMap.has(name.trim().toLowerCase()));
        alert(`Warning: ${nodesToCreate.length} / ${nodeNames.length} nodes found in the library. The following were not found and will be skipped:\n\n- ${notFound.join('\n- ')}`);
    }

    if (nodesToCreate.length === 0) {
        return;
    }

    const canvasWidth = dom.treeCanvas.offsetWidth;
    const canvasHeight = dom.treeCanvas.offsetHeight;
    const centerX = ((-state.canvasX + dom.treePanel.clientWidth / 2) / state.scale);
    const centerY = ((-state.canvasY + dom.treePanel.clientHeight / 2) / state.scale);
    const spacing = 150;

    nodesToCreate.forEach(({ key: masterId, node: masterNode }, index) => {
        let x, y;

        switch (shape) {
            case 'circle': {
                const radius = (nodesToCreate.length * spacing) / (2 * Math.PI) / 2;
                const angle = (index / nodesToCreate.length) * 2 * Math.PI;
                x = centerX + radius * Math.cos(angle);
                y = centerY + radius * Math.sin(angle);
                break;
            }
            case 'line': {
                x = centerX + (index - (nodesToCreate.length - 1) / 2) * spacing;
                y = centerY;
                break;
            }
            case 'grid': {
                const cols = Math.ceil(Math.sqrt(nodesToCreate.length));
                const row = Math.floor(index / cols);
                const col = index % cols;
                const gridWidth = (cols - 1) * spacing;
                x = (centerX - gridWidth / 2) + col * spacing;
                y = centerY + row * spacing;
                break;
            }
            case 'spiral': {
                const spiralSpacing = spacing / 2;
                const angle2 = 0.5 * index;
                x = centerX + spiralSpacing * angle2 * Math.cos(angle2);
                y = centerY + spiralSpacing * angle2 * Math.sin(angle2);
                break;
            }
            case 'wheel': {
                if (nodesToCreate.length <= 1) {
                    x = centerX;
                    y = centerY;
                } else {
                    if (index === 0) { // Center node
                        x = centerX;
                        y = centerY;
                    } else { // Outer nodes
                        const wheelNodeCount = nodesToCreate.length - 1;
                        const radius = spacing * 0.75;
                        const angle = ((index - 1) / wheelNodeCount) * 2 * Math.PI;
                        x = centerX + radius * Math.cos(angle);
                        y = centerY + radius * Math.sin(angle);
                    }
                }
                break;
            }
            case 'arc': {
                const arcNodeCount = nodesToCreate.length;
                if (arcNodeCount <= 1) {
                    x = centerX;
                    y = centerY;
                } else {
                    const totalAngle = Math.PI;
                    const radius = (arcNodeCount * spacing) / (2 * totalAngle);
                    const angle = (index / (arcNodeCount - 1)) * totalAngle - (totalAngle / 2);
                    x = centerX + radius * Math.cos(angle);
                    y = centerY + radius * Math.sin(angle);
                }
                break;
            }
            case 'triangle': {
                const sideLength = spacing * 1.5;
                const triHeight = sideLength * Math.sqrt(3) / 2;
                switch (index) {
                    case 0: x = centerX; y = centerY - triHeight / 2; break;
                    case 1: x = centerX - sideLength / 2; y = centerY + triHeight / 2; break;
                    case 2: x = centerX + sideLength / 2; y = centerY + triHeight / 2; break;
                    case 3: x = centerX - sideLength / 4; y = centerY; break;
                    case 4: x = centerX + sideLength / 4; y = centerY; break;
                    case 5: x = centerX; y = centerY + triHeight / 2; break;
                    default: x = centerX; y = centerY; break;
                }
                break;
            }
        }

        let newId = masterId;
        let counter = 1;
        while (state.TREE_DATA[newId]) {
            newId = `${masterId}_${counter++}`;
        }

        const xPercent = (x / canvasWidth * 100).toFixed(2);
        const yPercent = (y / canvasHeight * 100).toFixed(2);

        state.TREE_DATA[newId] = {
            type: 'minor',
            name: masterNode.name,
            desc: `The '${masterNode.name}' node.`, 
            cost: 1,
            status: 'locked',
            deps: [],
            pos: { x: `${xPercent}%`, y: `${yPercent}%` },
            icon: masterNode.icon
        };
    });

    renderAll();
    alert(`Created ${nodesToCreate.length} nodes in a ${shape} shape.`);
}

export function initShapes() {
    dom.buildShapeListBtn.addEventListener('click', toggleShapeListBuildMode);
    dom.clearShapeListBtn.addEventListener('click', () => {
        state.shapeNodeList = [];
        renderShapeNodeList();
    });
    dom.createShapeBtn.addEventListener('click', createNodeShape);

    document.addEventListener('shapelistadd', (e) => {
        state.shapeNodeList.push(e.detail.name);
        renderShapeNodeList();
    });

    document.addEventListener('shapelistupdated', renderShapeNodeList);
}

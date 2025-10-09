import { state } from '../state/appState.js';
import * as dom from '../dom/elements.js';
import { renderAll, renderNodes, renderLines, updateSelectionUI } from './renderer.js';

function createNode(masterId, masterNode) {
    let newId = masterId;
    let counter = 1;
    while (state.TREE_DATA[newId]) {
        newId = `${masterId}_${counter++}`;
    }

    if (state.isQuickAddLinkMode && state.quickAddLinkParent) {
        const parentNode = state.TREE_DATA[state.quickAddLinkParent];
        if (!parentNode.quickAddChildCount) parentNode.quickAddChildCount = 0;
        
        const parentX = parseFloat(parentNode.pos.x);
        const parentY = parseFloat(parentNode.pos.y);
        
        const angle = parentNode.quickAddChildCount * (Math.PI / 4);
        const radius = 0.3;
        const newX = parentX + radius * Math.cos(angle);
        const newY = parentY + radius * Math.sin(angle);

        state.TREE_DATA[newId] = {
            type: 'minor', name: masterNode.name, desc: `The '${masterNode.name}' node.`, cost: 1, status: 'locked',
            deps: [state.quickAddLinkParent], pos: { x: `${newX.toFixed(2)}%`, y: `${newY.toFixed(2)}%` },
            icon: masterNode.icon
        };
        parentNode.quickAddChildCount++;
    } else {
        const canvasWidth = dom.treeCanvas.offsetWidth;
        const canvasHeight = dom.treeCanvas.offsetHeight;
        const centerX = ((-state.canvasX + dom.treePanel.clientWidth / 2) / state.scale);
        const centerY = ((-state.canvasY + dom.treePanel.clientHeight / 2) / state.scale);
        const xPercent = (centerX / canvasWidth * 100).toFixed(2);
        const yPercent = (centerY / canvasHeight * 100).toFixed(2);

        state.TREE_DATA[newId] = {
            type: 'minor', name: masterNode.name, desc: `The '${masterNode.name}' node.`, cost: 1, status: 'locked',
            deps: [], pos: { x: `${xPercent}%`, y: `${yPercent}%` },
            icon: masterNode.icon
        };
    }

    renderNodes();
    renderLines();
    document.dispatchEvent(new CustomEvent('nodesupdated'));
    state.selectedNodeIds.clear();
    state.selectedNodeIds.add(newId);
    updateSelectionUI();
}

function createCustomNode() {
    const name = dom.newNodeNameInput.value.trim();
    if (!name) {
        dom.newNodeNameInput.style.boxShadow = 'inset 0 0 0 2px red';
        return;
    }
    dom.newNodeNameInput.style.boxShadow = 'inset 0 0 0 1px var(--border-bevel)';
    let baseId = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
    let newId = baseId;
    let counter = 1;
    while (state.TREE_DATA[newId]) {
        newId = `${baseId}_${counter++}`;
    }
    
    const canvasWidth = dom.treeCanvas.offsetWidth;
    const canvasHeight = dom.treeCanvas.offsetHeight;
    const gridSize = 25;
    let centerX = ((-state.canvasX + dom.treePanel.clientWidth / 2) / state.scale);
    let centerY = ((-state.canvasY + dom.treePanel.clientHeight / 2) / state.scale);

    if (dom.snapToGridCheckbox.checked) {
        centerX = Math.round(centerX / gridSize) * gridSize;
        centerY = Math.round(centerY / gridSize) * gridSize;
    }

    const xPercent = (centerX / canvasWidth * 100).toFixed(2);
    const yPercent = (centerY / canvasHeight * 100).toFixed(2);

    state.TREE_DATA[newId] = {
        type: 'minor', name: name, desc: 'A new node.', cost: 1, status: 'locked',
        deps: [], pos: { x: `${xPercent}%`, y: `${yPercent}%` },
        icon: 'https://oldschool.runescape.wiki/images/Quest_point_icon.png'
    };
    renderNodes();
    state.selectedNodeIds.clear();
    state.selectedNodeIds.add(newId);
    updateSelectionUI();
    document.dispatchEvent(new CustomEvent('nodesupdated'));
    dom.newNodeNameInput.value = '';
}

function deleteSelectedNodes() {
    if (state.selectedNodeIds.size === 0) return;

    state.selectedNodeIds.forEach(nodeId => {
        if (nodeId === 'genesis') {
            console.log("Cannot delete the Genesis node.");
            return;
        };

        if (state.TREE_DATA[nodeId]) {
            delete state.TREE_DATA[nodeId];
        }
        
        Object.values(state.TREE_DATA).forEach(otherNode => {
            if (otherNode.deps) {
                const index = otherNode.deps.indexOf(nodeId);
                if (index > -1) {
                    otherNode.deps.splice(index, 1);
                }
            }
        });
    });

    state.selectedNodeIds.clear();
    renderAll();
}

function renameSelectedNode() {
    if (state.selectedNodeIds.size !== 1) return;
    const [nodeId] = state.selectedNodeIds;
    const newName = dom.editNodeNameInput.value.trim();
    if (newName && newName !== state.TREE_DATA[nodeId].name) {
        state.TREE_DATA[nodeId].name = newName;
        dom.infoNodeName.textContent = newName;
        document.dispatchEvent(new CustomEvent('nodesupdated'));
    }
}

function updateNodeDescription() {
    if (state.selectedNodeIds.size !== 1) return;
    const [nodeId] = state.selectedNodeIds;
    state.TREE_DATA[nodeId].desc = dom.editNodeDesc.value;
}

function useCannedDescription(e) {
    if (e.target.classList.contains('canned-btn')) {
        if (state.selectedNodeIds.size !== 1) return;
        const [nodeId] = state.selectedNodeIds;
        const template = e.target.dataset.template;
        const nodeName = state.TREE_DATA[nodeId].name;
        dom.editNodeDesc.value = template.replace('[NAME]', nodeName);
    }
}

function resizeNode(e) {
    if (e.target.dataset.size) {
        if (state.selectedNodeIds.size !== 1) return;
        const [nodeId] = state.selectedNodeIds;
        const newSize = e.target.dataset.size;
        state.TREE_DATA[nodeId].type = newSize;
        
        const nodeEl = document.getElementById(nodeId);
        if (nodeEl) {
            nodeEl.classList.remove('node-minor', 'node-major', 'node-epic', 'node-legendary');
            nodeEl.classList.add(`node-${newSize}`);
        }
    }
}

function handleNodeDrag(e) {
    const dx = (e.clientX - state.startX) / state.scale;
    const dy = (e.clientY - state.startY) / state.scale;
    const gridSize = 25;

    state.selectedNodeIds.forEach(id => {
        const el = document.getElementById(id);
        const initialPos = state.initialMultiNodePositions.get(id);
        if (!el || !initialPos) return;

        let newLeft = initialPos.left + dx;
        let newTop = initialPos.top + dy;

        if (dom.snapToGridCheckbox.checked) {
            newLeft = Math.round(newLeft / gridSize) * gridSize;
            newTop = Math.round(newTop / gridSize) * gridSize;
        }
        
        newLeft = Math.max(0, Math.min(dom.treeCanvas.offsetWidth, newLeft));
        newTop = Math.max(0, Math.min(dom.treeCanvas.offsetHeight, newTop));

        const xPercent = (newLeft / dom.treeCanvas.offsetWidth * 100).toFixed(2);
        const yPercent = (newTop / dom.treeCanvas.offsetHeight * 100).toFixed(2);
        
        el.style.left = `${xPercent}%`;
        el.style.top = `${yPercent}%`;
        state.TREE_DATA[id].pos.x = `${xPercent}%`;
        state.TREE_DATA[id].pos.y = `${yPercent}%`;
    });
    
    if (state.selectedNodeIds.size === 1) {
        const [nodeId] = state.selectedNodeIds;
        dom.infoNodeX.textContent = state.TREE_DATA[nodeId].pos.x;
        dom.infoNodeY.textContent = state.TREE_DATA[nodeId].pos.y;
    }
    renderLines();
}

export function initNodes() {
    dom.createNodeBtn.addEventListener('click', createCustomNode);
    dom.deleteNodeBtn.addEventListener('click', deleteSelectedNodes);
    dom.renameNodeBtn.addEventListener('click', renameSelectedNode);
    dom.updateDescBtn.addEventListener('click', updateNodeDescription);
    dom.cannedDescButtons.addEventListener('click', useCannedDescription);
    dom.resizePanel.addEventListener('click', resizeNode);

    document.addEventListener('createnode', (e) => {
        createNode(e.detail.masterId, e.detail.masterNode);
    });

    window.addEventListener('mousemove', (e) => {
        if (state.isDragging && !state.isInLinkMode) {
            e.preventDefault();
            handleNodeDrag(e);
        }
    });

    dom.treeContainer.addEventListener('mousedown', (e) => {
        const nodeEl = e.target.closest('.node');
        if (!nodeEl) return;

        const id = nodeEl.id;

        if (state.isQuickAddLinkMode) {
            if (!state.quickAddLinkParent) {
                state.quickAddLinkParent = id;
                dom.quickAddLinkBtn.textContent = `Parent: ${state.TREE_DATA[id].name}`;
                document.querySelectorAll('.node').forEach(el => el.classList.remove('dimmed'));
            }
            return;
        }

        if (!state.isInLinkMode) {
            e.stopPropagation();
            state.isDragging = true;
            state.activeNodeEl = nodeEl;
            
            if (e.shiftKey) {
                if (state.selectedNodeIds.has(id)) {
                    state.selectedNodeIds.delete(id);
                } else {
                    state.selectedNodeIds.add(id);
                }
            } else if (!state.selectedNodeIds.has(id)) {
                state.selectedNodeIds.clear();
                state.selectedNodeIds.add(id);
            }
            updateSelectionUI();

            state.initialMultiNodePositions.clear();
            state.selectedNodeIds.forEach(selectedId => {
                 const el = document.getElementById(selectedId);
                 state.initialMultiNodePositions.set(selectedId, {
                    left: (parseFloat(el.style.left) / 100) * dom.treeCanvas.offsetWidth,
                    top: (parseFloat(el.style.top) / 100) * dom.treeCanvas.offsetHeight
                 });
            });
            
            state.startX = e.clientX;
            state.startY = e.clientY;
        }
    });
}

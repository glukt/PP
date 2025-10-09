import { state, CANVAS_SIZE } from '../state/appState.js';
import * as dom from '../dom/elements.js';
import { MASTER_NODE_LIBRARY } from '../constants/masterNodeLibrary.js';
import { ICON_POOL, CLAN_ICONS } from '../constants/icons.js';

export function applyTransform() {
    dom.treeCanvas.style.transform = `translate(${state.canvasX}px, ${state.canvasY}px) scale(${state.scale})`;
    updateMiniMapViewPort();
}

export function renderLines() {
    dom.treeSvg.innerHTML = `
        <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
            refX="9" refY="3.5" orient="auto" fill="var(--line-unlocked)">
                <polygon points="0 0, 10 3.5, 0 7" />
            </marker>
        </defs>
    `;
    
    Object.keys(state.TREE_DATA).forEach(id => {
        const node = state.TREE_DATA[id];
        if (node.deps && node.deps.length > 0) {
            node.deps.forEach(depId => {
                const parentNode = state.TREE_DATA[depId];
                if (!parentNode) return;

                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', parentNode.pos.x);
                line.setAttribute('y1', parentNode.pos.y);
                line.setAttribute('x2', node.pos.x);
                line.setAttribute('y2', node.pos.y);
                line.setAttribute('marker-end', 'url(#arrowhead)');
                dom.treeSvg.appendChild(line);
            });
        }
    });
}

export function renderMiniMap() {
    if (!dom.miniMap) return;
    dom.miniMapNodes.innerHTML = '';
    const miniScaleX = dom.miniMap.clientWidth / CANVAS_SIZE;
    const miniScaleY = dom.miniMap.clientHeight / CANVAS_SIZE;

    for (const id in state.TREE_DATA) {
        const node = state.TREE_DATA[id];
        const miniNode = document.createElement('div');
        miniNode.className = 'mini-node';
        
        const nodeX = parseFloat(node.pos.x) / 100 * CANVAS_SIZE;
        const nodeY = parseFloat(node.pos.y) / 100 * CANVAS_SIZE;

        miniNode.style.left = `${nodeX * miniScaleX}px`;
        miniNode.style.top = `${nodeY * miniScaleY}px`;
        
        const size = (node.type === 'minor' ? 2 : (node.type === 'major' ? 3 : (node.type === 'epic' ? 4 : 5)));
        miniNode.style.width = `${size}px`;
        miniNode.style.height = `${size}px`;

        dom.miniMapNodes.appendChild(miniNode);
    }
}

function updateMiniMapViewPort() {
    if (!dom.miniMap) return;
    const miniScaleX = dom.miniMap.clientWidth / CANVAS_SIZE;
    const miniScaleY = dom.miniMap.clientHeight / CANVAS_SIZE;

    const viewWidth = dom.treePanel.clientWidth / state.scale;
    const viewHeight = dom.treePanel.clientHeight / state.scale;
    const viewX = -state.canvasX / state.scale;
    const viewY = -state.canvasY / state.scale;

    dom.miniMapViewport.style.width = `${viewWidth * miniScaleX}px`;
    dom.miniMapViewport.style.height = `${viewHeight * miniScaleY}px`;
    dom.miniMapViewport.style.left = `${viewX * miniScaleX}px`;
    dom.miniMapViewport.style.top = `${viewY * miniScaleY}px`;
}

export function renderNodes() {
    const parentIds = new Set();
    Object.values(state.TREE_DATA).forEach(node => {
        if (node.deps) {
            node.deps.forEach(depId => parentIds.add(depId));
        }
    });

    dom.treeContainer.innerHTML = '';
    Object.keys(state.TREE_DATA).forEach(id => {
        const node = state.TREE_DATA[id];
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
        
        dom.treeContainer.appendChild(nodeEl);
    });
    updateSelectionUI();
    renderMiniMap();
}

export function updateSelectionUI() {
    document.querySelectorAll('.node.selected').forEach(n => n.classList.remove('selected'));
    state.selectedNodeIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('selected');
    });

    document.querySelectorAll('#node-list li').forEach(li => {
        if (state.selectedNodeIds.has(li.dataset.nodeId)) {
            li.classList.add('selected');
        } else {
            li.classList.remove('selected');
        }
    });

    dom.deleteNodeBtn.style.display = state.selectedNodeIds.size > 0 ? 'block' : 'none';
    dom.linkModeBtn.style.display = state.selectedNodeIds.size === 1 ? 'block' : 'none';
    dom.unlinkAllBtn.style.display = state.isInLinkMode ? 'block' : 'none';

    if (state.selectedNodeIds.size === 1) {
        const [nodeId] = state.selectedNodeIds;
        const nodeData = state.TREE_DATA[nodeId];
        dom.infoNodeName.textContent = nodeData.name;
        dom.infoNodeX.textContent = nodeData.pos.x;
        dom.infoNodeY.textContent = nodeData.pos.y;
        
        if (!state.isQuickAddLinkMode) {
            dom.editNodePanel.style.display = 'flex';
            dom.iconPickerPanel.style.display = 'block';
        } else {
            dom.editNodePanel.style.display = 'none';
            dom.iconPickerPanel.style.display = 'none';
        }

        dom.editNodeNameInput.value = nodeData.name;
        dom.editNodeDesc.value = nodeData.desc || '';
    } else {
        dom.infoNodeName.textContent = state.selectedNodeIds.size > 1 ? `${state.selectedNodeIds.size} nodes selected` : 'None';
        dom.infoNodeX.textContent = '--';
        dom.infoNodeY.textContent = '--';
        dom.editNodePanel.style.display = 'none';
        dom.iconPickerPanel.style.display = 'none';
        dom.multiSelectActionsPanel.style.display = state.selectedNodeIds.size > 1 ? 'block' : 'none';
    }
}

export function renderNodeList() {
    const searchTerm = dom.nodeSearchInput.value.toLowerCase();
    const nodesOnCanvas = new Map(Object.entries(state.TREE_DATA).map(([id, node]) => [node.name, id]));
    const masterList = Object.entries(MASTER_NODE_LIBRARY).sort(([, a], [, b]) => a.name.localeCompare(b.name));
    
    const filteredList = masterList.filter(([, node]) => {
        const matchesCategory = state.activeCategory === 'All' || node.category === state.activeCategory;
        const matchesSearch = node.name.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    const totalNodesInFilter = filteredList.length;
    let usedNodesInFilter = 0;
    filteredList.forEach(([, masterNode]) => {
        if (nodesOnCanvas.has(masterNode.name)) {
            usedNodesInFilter++;
        }
    });

    const nodeCounter = document.getElementById('node-counter');
    if (nodeCounter) {
        nodeCounter.textContent = `${usedNodesInFilter}/${totalNodesInFilter}`;
    }

    dom.nodeList.innerHTML = '';      

    filteredList.forEach(([id, masterNode]) => {
        const li = document.createElement('li');
        const existingNodeId = nodesOnCanvas.get(masterNode.name);

        if (existingNodeId) {
            li.textContent = masterNode.name;
            li.dataset.nodeId = existingNodeId;
            li.style.color = 'var(--text-light-grey)';
            if (state.selectedNodeIds.has(existingNodeId)) {
                li.classList.add('selected');
            }
            li.addEventListener('click', () => {
                state.selectedNodeIds.clear();
                state.selectedNodeIds.add(existingNodeId);
                updateSelectionUI();
            });
        } else {
            li.innerHTML = `<span>${masterNode.name}</span><span style="color: var(--status-green);">[+]</span>`;
            li.style.color = 'var(--text-dark-grey)';
            li.title = state.isShapeListBuildingMode ? 'Click to add to shape list' : 'Click to add to canvas';
            
            li.addEventListener('click', () => {
                if (state.isShapeListBuildingMode) {
                    if (!state.shapeNodeList.includes(masterNode.name)) {
                        state.shapeNodeList.push(masterNode.name);
                        document.dispatchEvent(new CustomEvent('shapelistupdated'));
                    }
                } else {
                    document.dispatchEvent(new CustomEvent('createnode', { detail: { masterId: id, masterNode } }));
                }
            });
        }
        dom.nodeList.appendChild(li);
    });
}

export function populateCategoryFilters() {
    const categories = ['All', ...new Set(Object.values(MASTER_NODE_LIBRARY).map(n => n.category || 'Other'))].sort();
    dom.nodeCategoryFilters.innerHTML = '';
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = category;
        if (category === state.activeCategory) {
            btn.classList.add('active');
        }
        btn.addEventListener('click', () => {
            state.activeCategory = category;
            document.querySelectorAll('.category-btn.active').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderNodeList();
        });
        dom.nodeCategoryFilters.appendChild(btn);
    });
}

export function populateIconPicker() {
    dom.iconPool.innerHTML = '';
    const masterIcons = Object.values(MASTER_NODE_LIBRARY).map(node => node.icon).filter(Boolean);
    const allIcons = [...masterIcons, ...CLAN_ICONS];
    const uniqueIcons = [...new Set(allIcons)];
    uniqueIcons.sort();

    uniqueIcons.forEach(iconUrl => {
        const img = document.createElement('img');
        img.src = iconUrl;
        img.addEventListener('click', () => {
            if (state.selectedNodeIds.size !== 1) return;
            const [nodeId] = state.selectedNodeIds;
            state.TREE_DATA[nodeId].icon = iconUrl;
            updateNodeIcon(nodeId, iconUrl);
        });
        dom.iconPool.appendChild(img);
    });
}

export function updateNodeIcon(nodeId, iconUrl) {
    const nodeEl = document.getElementById(nodeId);
    if (nodeEl) {
        const imgEl = nodeEl.querySelector('.node-icon');
        if (imgEl) {
            imgEl.src = iconUrl;
        }
    }
}

export function renderShapeNodeList() {
    dom.shapeNodeListContainer.innerHTML = '';
    if (state.shapeNodeList.length === 0) {
        dom.shapeNodeListContainer.innerHTML = `<p id="shape-list-placeholder" style="color: var(--text-light-grey); font-size: 10px; text-align: center; margin: 15px 0;">Click "Select Nodes" then pick from the 'All Nodes' list.</p>`;
    } else {
        state.shapeNodeList.forEach((nodeName, index) => {
            const pill = document.createElement('div');
            pill.style.cssText = 'display: inline-flex; align-items: center; background-color: var(--osrs-dark-grey); color: var(--text-yellow); padding: 2px 8px; margin: 2px; border-radius: 3px; font-size: 10px;';
            pill.textContent = nodeName;
            
            const removeBtn = document.createElement('span');
            removeBtn.textContent = '×';
            removeBtn.style.cssText = 'margin-left: 8px; cursor: pointer; color: var(--text-light-grey);';
            removeBtn.onclick = (e) => {
                e.stopPropagation();
                state.shapeNodeList.splice(index, 1);
                renderShapeNodeList();
            };
            
            pill.appendChild(removeBtn);
            dom.shapeNodeListContainer.appendChild(pill);
        });
    }
}

export function renderAll() {
    renderNodes();
    renderLines();
    renderNodeList();
    updateSelectionUI();
    renderMiniMap();
}
import { state } from '../state/appState.js';
import { treeCanvas, rotateRightBtn, rotateLeftBtn, flipHorizontalBtn, flipVerticalBtn, expandNodesBtn, contractNodesBtn } from '../dom/elements.js';

function transformSelectedNodes(action) {
    if (state.selectedNodeIds.size < 2) return;

    const nodes = [];
    state.selectedNodeIds.forEach(id => nodes.push(state.TREE_DATA[id]));

    const canvasWidth = treeCanvas.offsetWidth;
    const canvasHeight = treeCanvas.offsetHeight;

    // 1. Calculate centroid in pixels
    let sumX = 0, sumY = 0;
    nodes.forEach(node => {
        sumX += parseFloat(node.pos.x) / 100 * canvasWidth;
        sumY += parseFloat(node.pos.y) / 100 * canvasHeight;
    });
    const centerX = sumX / nodes.length;
    const centerY = sumY / nodes.length;

    // 2. Apply transformation
    const angle = 45 * (Math.PI / 180); // 45 degrees in radians
    const scaleFactor = action === 'expand' ? 1.1 : 0.9;

    nodes.forEach(node => {
        const nodeX = parseFloat(node.pos.x) / 100 * canvasWidth;
        const nodeY = parseFloat(node.pos.y) / 100 * canvasHeight;

        const relX = nodeX - centerX;
        const relY = nodeY - centerY;

        let newRelX, newRelY;

        switch (action) {
            case 'rotate-right':
                newRelX = relX * Math.cos(angle) - relY * Math.sin(angle);
                newRelY = relX * Math.sin(angle) + relY * Math.cos(angle);
                break;
            case 'rotate-left':
                newRelX = relX * Math.cos(-angle) - relY * Math.sin(-angle);
                newRelY = relX * Math.sin(-angle) + relY * Math.cos(-angle);
                break;
            case 'flip-horizontal':
                newRelX = -relX;
                newRelY = relY;
                break;
            case 'flip-vertical':
                newRelX = relX;
                newRelY = -relY;
                break;
            case 'expand':
            case 'contract':
                newRelX = relX * scaleFactor;
                newRelY = relY * scaleFactor;
                break;
        }

        const newAbsX = centerX + newRelX;
        const newAbsY = centerY + newRelY;

        node.pos.x = (newAbsX / canvasWidth * 100).toFixed(2) + '%';
        node.pos.y = (newAbsY / canvasHeight * 100).toFixed(2) + '%';
    });

    // 3. Dispatch event to re-render
    document.dispatchEvent(new CustomEvent('nodesupdated'));
}

export function initTransformations() {
    rotateRightBtn.addEventListener('click', () => transformSelectedNodes('rotate-right'));
    rotateLeftBtn.addEventListener('click', () => transformSelectedNodes('rotate-left'));
    flipHorizontalBtn.addEventListener('click', () => transformSelectedNodes('flip-horizontal'));
    flipVerticalBtn.addEventListener('click', () => transformSelectedNodes('flip-vertical'));
    expandNodesBtn.addEventListener('click', () => transformSelectedNodes('expand'));
    contractNodesBtn.addEventListener('click', () => transformSelectedNodes('contract'));
}

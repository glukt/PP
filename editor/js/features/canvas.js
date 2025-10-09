import { state, CANVAS_SIZE, scaleFactor, minScale, maxScale } from '../state/appState.js';
import { treePanel, miniMap } from '../dom/elements.js';
import { applyTransform, renderMiniMap } from './renderer.js';

function moveCanvasFromMiniMap(e) {
    const miniMapRect = miniMap.getBoundingClientRect();
    const miniScaleX = miniMap.clientWidth / CANVAS_SIZE;
    const miniScaleY = miniMap.clientHeight / CANVAS_SIZE;

    const mouseX = e.clientX - miniMapRect.left;
    const mouseY = e.clientY - miniMapRect.top;

    const targetX = mouseX / miniScaleX;
    const targetY = mouseY / miniScaleY;

    state.canvasX = - (targetX * state.scale - treePanel.clientWidth / 2);
    state.canvasY = - (targetY * state.scale - treePanel.clientHeight / 2);
    
    applyTransform();
}

function handlePanning(e) {
    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        state.hasPanned = true;
    }
    e.preventDefault();
    state.canvasX = state.initialCanvasX + dx;
    state.canvasY = state.initialCanvasY + dy;
    applyTransform();
}

function handleZoom(e) {
    e.preventDefault();
    const rect = treePanel.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const delta = e.deltaY * -0.01;
    const newScale = Math.min(Math.max(minScale, state.scale + delta * scaleFactor), maxScale);
    if (newScale !== state.scale) {
        const scaleChange = newScale / state.scale;
        state.canvasX = mouseX - (mouseX - state.canvasX) * scaleChange;
        state.canvasY = mouseY - (mouseY - state.canvasY) * scaleChange;
        state.scale = newScale;
        applyTransform();
    }
}

export function initCanvas() {
    const panelRect = treePanel.getBoundingClientRect();
    state.canvasX = (panelRect.width / 2) - (CANVAS_SIZE * 0.5 * state.scale);
    state.canvasY = (panelRect.height / 2) - (CANVAS_SIZE * 0.5 * state.scale);
    applyTransform();
    renderMiniMap();

    miniMap.addEventListener('mousedown', (e) => {
        e.preventDefault();
        state.isDraggingMiniMap = true;
        moveCanvasFromMiniMap(e);
    });

    treePanel.addEventListener('wheel', handleZoom);

    window.addEventListener('mousemove', (e) => {
        if (state.isDraggingMiniMap) {
            e.preventDefault();
            moveCanvasFromMiniMap(e);
        } else if (state.isPanning) {
            handlePanning(e);
        }
    });

    window.addEventListener('mouseup', () => {
        state.isDraggingMiniMap = false;
    });
}
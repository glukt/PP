import { state } from './state/appState.js';
import * as dom from './dom/elements.js';
import { initCanvas } from './features/canvas.js';
import { initIO } from './features/io.js';
import { initNodes } from './features/nodes.js';
import { initLinking, linkModeClickHandler, exitLinkMode } from './features/linking.js';
import { initShapes } from './features/shapes.js';
import { initUI } from './features/ui.js';
import { initTransformations } from './utils/transformations.js';
import { renderAll, populateCategoryFilters, populateIconPicker, updateSelectionUI } from './features/renderer.js';

document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    initIO();
    initNodes();
    initLinking();
    initShapes();
    initUI();
    initTransformations();

    populateCategoryFilters();
    populateIconPicker();
    renderAll();

    dom.treePanel.addEventListener('mousedown', (e) => {
        if (e.target.closest('.node')) return;

        if (state.isInLinkMode) {
            exitLinkMode();
            return;
        }

        if (e.shiftKey) {
            state.isSelecting = true;
            state.isPanning = false;
            state.selectedNodeIds.clear();
            updateSelectionUI();

            const rect = dom.treePanel.getBoundingClientRect();
            state.startX = e.clientX - rect.left;
            state.startY = e.clientY - rect.top;
            dom.selectionBox.style.left = `${state.startX}px`;
            dom.selectionBox.style.top = `${state.startY}px`;
            dom.selectionBox.style.width = '0px';
            dom.selectionBox.style.height = '0px';
            dom.selectionBox.style.display = 'block';
        } else {
            state.isPanning = true;
            state.hasPanned = false;
            state.isSelecting = false;
            state.startX = e.clientX;
            state.startY = e.clientY;
            state.initialCanvasX = state.canvasX;
            state.initialCanvasY = state.canvasY;
        }
    });

    window.addEventListener('mousemove', (e) => {
        if (state.isSelecting) {
            e.preventDefault();
            const rect = dom.treePanel.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;

            const left = Math.min(state.startX, currentX);
            const top = Math.min(state.startY, currentY);
            const width = Math.abs(state.startX - currentX);
            const height = Math.abs(state.startY - currentY);

            dom.selectionBox.style.left = `${left}px`;
            dom.selectionBox.style.top = `${top}px`;
            dom.selectionBox.style.width = `${width}px`;
            dom.selectionBox.style.height = `${height}px`;

            const selectionRect = dom.selectionBox.getBoundingClientRect();
            document.querySelectorAll('.node').forEach(nodeEl => {
                const nodeRect = nodeEl.getBoundingClientRect();
                if (
                    nodeRect.left < selectionRect.right &&
                    nodeRect.right > selectionRect.left &&
                    nodeRect.top < selectionRect.bottom &&
                    nodeRect.bottom > selectionRect.top
                ) {
                    state.selectedNodeIds.add(nodeEl.id);
                } else if (!e.shiftKey) {
                     state.selectedNodeIds.delete(nodeEl.id);
                }
            });
            updateSelectionUI();
        }
    });

    window.addEventListener('mouseup', () => {
        if (state.isPanning && !state.hasPanned) {
            state.selectedNodeIds.clear();
            updateSelectionUI();
        }

        state.isDragging = false;
        state.isPanning = false;
        state.hasPanned = false;
        state.isSelecting = false;
        dom.selectionBox.style.display = 'none';
    });

    document.addEventListener('linkmodeentered', () => {
        document.querySelectorAll('.node').forEach(el => {
            el.addEventListener('click', linkModeClickHandler);
        });
    });

    document.addEventListener('treeloaded', renderAll);
    document.addEventListener('nodesupdated', renderAll);
});

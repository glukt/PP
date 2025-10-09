import * as dom from '../dom/elements.js';

export function initUI() {
    initFloatingPanel();
    dom.nodeSearchInput.addEventListener('input', () => {
        document.dispatchEvent(new CustomEvent('nodesupdated'));
    });
}

function initFloatingPanel() {
    const nodeListHeader = dom.nodeListPanel.querySelector('h3');
    let isNodeListFloating = false;
    const originalParent = dom.nodeListPanel.parentElement;
    const originalNextSibling = dom.nodeListPanel.nextElementSibling;
    let isDraggingPanel = false;
    let panelDragOffsetX = 0;
    let panelDragOffsetY = 0;

    dom.toggleNodeListSizeBtn.addEventListener('click', () => {
        isNodeListFloating = !isNodeListFloating;
        if (isNodeListFloating) {
            const rect = dom.nodeListPanel.getBoundingClientRect();
            document.body.appendChild(dom.nodeListPanel);
            dom.nodeListPanel.style.cssText = `
                position: fixed;
                top: ${rect.top}px;
                left: ${rect.left}px;
                width: 350px;
                height: 400px;
                z-index: 9999;
                background-color: #1e1e1e;
                border: 1px solid var(--border-bevel);
                box-shadow: 0 5px 15px rgba(0,0,0,0.5);
                display: flex;
                flex-direction: column;
                transform: translateZ(0);
            `;
            nodeListHeader.style.cursor = 'move';
            document.getElementById('node-list').style.overflowY = 'auto';
            document.getElementById('node-list').style.flexGrow = '1';
            dom.toggleNodeListSizeBtn.innerHTML = '&#x21E2;';
            dom.toggleNodeListSizeBtn.title = 'Dock Panel';
        } else {
            dom.nodeListPanel.style.cssText = '';
            originalParent.insertBefore(dom.nodeListPanel, originalNextSibling);
            nodeListHeader.style.cursor = '';
            dom.toggleNodeListSizeBtn.innerHTML = '&#x2750;';
            dom.toggleNodeListSizeBtn.title = 'Pop-out Panel';
        }
    });

    nodeListHeader.addEventListener('mousedown', (e) => {
        if (isNodeListFloating && e.target.tagName !== 'BUTTON') {
            isDraggingPanel = true;
            const rect = dom.nodeListPanel.getBoundingClientRect();
            panelDragOffsetX = e.clientX - rect.left;
            panelDragOffsetY = e.clientY - rect.top;
            e.preventDefault();
        }
    });

    window.addEventListener('mousemove', (e) => {
        if (isDraggingPanel) {
            dom.nodeListPanel.style.left = `${e.clientX - panelDragOffsetX}px`;
            dom.nodeListPanel.style.top = `${e.clientY - panelDragOffsetY}px`;
        }
    });

    window.addEventListener('mouseup', () => {
        isDraggingPanel = false;
    });
}

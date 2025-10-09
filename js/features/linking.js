import { state } from '../state/appState.js';
import * as dom from '../dom/elements.js';
import { renderLines, updateSelectionUI } from './renderer.js';

export function linkModeClickHandler(e) {
    e.stopPropagation();

    const clickedId = e.currentTarget.id;
    if (clickedId === state.linkModeParent) return;

    const childNode = state.TREE_DATA[clickedId];
    if (!childNode) return;

    const depIndex = childNode.deps.indexOf(state.linkModeParent);

    if (depIndex > -1) {
        childNode.deps.splice(depIndex, 1);
    } else {
        childNode.deps.push(state.linkModeParent);
    }
    renderLines();
}

export function exitLinkMode() {
    if (!state.isInLinkMode) return;
    state.isInLinkMode = false;
    
    document.body.classList.remove('link-mode-active');
    document.querySelectorAll('.node').forEach(el => {
        el.classList.remove('dimmed');
    });

    dom.linkModeBtn.textContent = 'Link/Unlink Children';
    dom.linkModeBtn.style.backgroundColor = '';
    dom.unlinkAllBtn.style.display = 'none';
    state.linkModeParent = null;

    if(state.selectedNodeIds.size !== 1) {
        dom.linkModeBtn.style.display = 'none';
    }
}

function toggleQuickAddLinkMode() {
    if (state.isInLinkMode) exitLinkMode();
    state.isQuickAddLinkMode = !state.isQuickAddLinkMode;

    if (state.isQuickAddLinkMode) {
        dom.editNodePanel.style.display = 'none';
        dom.iconPickerPanel.style.display = 'none';

        dom.quickAddLinkBtn.textContent = 'Click Parent Node...';
        dom.quickAddLinkBtn.style.backgroundColor = '#5cb85c';
        document.body.classList.add('link-mode-active');
    } else {
        dom.quickAddLinkBtn.textContent = 'Quick-Add & Link';
        dom.quickAddLinkBtn.style.backgroundColor = '';
        document.body.classList.remove('link-mode-active');
        state.quickAddLinkParent = null;
        
        updateSelectionUI();
    }
}

function unlinkAll() {
    if (!state.isInLinkMode || !state.linkModeParent) return;

    Object.values(state.TREE_DATA).forEach(node => {
        if (node.deps && Array.isArray(node.deps)) {
            node.deps = node.deps.filter(dep => dep !== state.linkModeParent);
        }
    });
    
    renderLines();
}

export function initLinking() {
    dom.quickAddLinkBtn.addEventListener('click', toggleQuickAddLinkMode);
    dom.unlinkAllBtn.addEventListener('click', unlinkAll);

    dom.linkModeBtn.addEventListener('click', () => {
        if (state.isQuickAddLinkMode) toggleQuickAddLinkMode();
        if (state.isInLinkMode) {
            exitLinkMode();
            return;
        }

        if (state.selectedNodeIds.size === 1) {
            state.isInLinkMode = true;
            [state.linkModeParent] = state.selectedNodeIds;
            
            document.body.classList.add('link-mode-active');
            document.querySelectorAll('.node').forEach(el => {
                if (el.id !== state.linkModeParent) {
                    el.classList.add('dimmed');
                }
            });

            dom.linkModeBtn.textContent = 'Finish Linking';
            dom.linkModeBtn.style.backgroundColor = '#5cb85c';
            dom.unlinkAllBtn.style.display = 'block';
            document.dispatchEvent(new CustomEvent('linkmodeentered'));
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (state.isQuickAddLinkMode) {
                toggleQuickAddLinkMode();
            }
            if (state.isInLinkMode) {
                exitLinkMode();
            }
        }
    });
}

import { state } from '../state/appState.js';
import { fileLoader, loadBtn, saveBtn } from '../dom/elements.js';

function saveTree() {
    try {
        const dataStr = JSON.stringify(state.TREE_DATA, null, 4);
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
}

function loadTree() {
    fileLoader.click();
}

function handleFileLoad(e) {
    const file = e.target.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const loadedData = JSON.parse(event.target.result);
            
            if (typeof loadedData === 'object' && loadedData.genesis) {
                Object.keys(state.TREE_DATA).forEach(key => delete state.TREE_DATA[key]);
                Object.assign(state.TREE_DATA, loadedData);

                document.dispatchEvent(new CustomEvent('treeloaded'));

                alert('Tree loaded successfully!');
            } else {
                alert('Error: Invalid or corrupted tree file.');
            }
        } catch (error) {
            alert('Error parsing file: ' + error.message);
        }
    };
    reader.readAsText(file);
    
    e.target.value = '';
}

export function initIO() {
    saveBtn.addEventListener('click', saveTree);
    loadBtn.addEventListener('click', loadTree);
    fileLoader.addEventListener('change', handleFileLoad);
}

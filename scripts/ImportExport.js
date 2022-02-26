import { appState } from "./AppState.js";
import { setDirtyState } from "./DirtyState.js";
import { getItems, getSettings } from "./ItemManager.js";

let _fileHandler;

window.addEventListener("load", () => {
    _fileHandler = _addLoadFile();
});

export function importData () {
    _fileHandler.value = "";
    _fileHandler.click();
}

function _addLoadFile () {
    const _fileHandler = document.createElement("input");
    _fileHandler.setAttribute("id", "FileHandler");
    _fileHandler.setAttribute("type", "file");
    _fileHandler.setAttribute("accept", ".json,.txt");
    _fileHandler.setAttribute("multiple", "false");
    document.getElementById("hidden").appendChild(_fileHandler);

    _fileHandler.onchange = _handleFileSelect.bind(this);

    return _fileHandler;
}

function _handleFileSelect (event) {
    const file = event.target.files[0];
    if (file) {
        const fileName = file.name;
        const reader = new FileReader();
        reader.onload = function () {
            try {
                const importedData = JSON.parse(reader.result);
                appState.dispatch("importData", importedData);
            }
            catch (error){
                console.log(error);
                // err handling
            }
        };
        reader.readAsText(file);
    }
}

export function exportData () {
    const data = {
        items: getItems(),
        settings: getSettings(),
    };
    const text = JSON.stringify(data);
    download(text, "ProjectOverview.json", "text/plain");
    setDirtyState(false);
}

function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

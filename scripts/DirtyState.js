import { appState } from "./AppState.js";

let dirty = false;

window.addEventListener("beforeunload", (event) => {
    if (getDirtyState()) {
        const message = "You may export the latest changes";
        event.returnValue = message;
    }
});

export function getDirtyState () {
    if (appState.state.ignoreDirtyState) {
        return false;
    }
    return dirty;
}

export function setDirtyState (value) {
    dirty = value;
}

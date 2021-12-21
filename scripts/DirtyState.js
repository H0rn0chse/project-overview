var dirty = false;

window.addEventListener("beforeunload", (event) => {
    if (getDirtyState()) {
        var message = "You may export the latest changes";
        event.returnValue = message;
        return message;
    }
});

export function getDirtyState () {
    return dirty;
}

export function setDirtyState (value) {
    dirty = value;
}

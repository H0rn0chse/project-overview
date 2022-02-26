import { setDirtyState } from "./DirtyState.js";

let items = null;
let settings = null;

loadFromLocalStorage();

function loadFromLocalStorage () {
    items = JSON.parse(localStorage.getItem("items_projectoverview")) || [];
    settings = JSON.parse(localStorage.getItem("settings_projectoverview")) || {};
}

export function getItems () {
    return items;
}

export function setItems (newItems){
    items = newItems;
}

export function saveItems () {
    setDirtyState(true);
    localStorage.setItem("items_projectoverview", JSON.stringify(items));
}

export function getSettings () {
    return settings;
}

export function setSettings (newSettings){
    settings = newSettings;
}

export function saveSettings () {
    setDirtyState(true);
    localStorage.setItem("settings_projectoverview", JSON.stringify(settings));
}

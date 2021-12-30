import { setDirtyState } from "./DirtyState.js";
import { getItems, getSettings, setItems, setSettings, saveItems, saveSettings } from "./ItemManager.js";
import { deepClone } from "./utils.js";

const { Vuex } = globalThis;

const items = getItems();
const settings = getSettings();

export const appState = new Vuex.Store({
    state: {
        searchTerms: [],
        itemCopy: items[0],
        filteredItems: items,
        devFolder: settings.devFolder || "C:\\User\\Dev\\",
        lastItemId: typeof settings.lastItemId === "number" ? settings.lastItemId : 0,
        ignoreDirtyState: typeof settings.ignoreDirtyState === "boolean" ? settings.ignoreDirtyState : false,
        items
    },
    mutations: {
        setDevFolder (state, devFolder) {
            state.devFolder = devFolder;
        },
        setIgnoreDirtyState (state, ignoreDirtyState) {
            state.ignoreDirtyState = ignoreDirtyState;
        },
        setSearchTerms (state, searchTerms) {
            state.searchTerms = searchTerms;
        },
        createDefaultItemCopy (state) {
            const newItem = {
                id: state.lastItemId + 1,
                title: "new Project",
                repoUrl: "https://github.com/user/new-project",
                repoType: "github",
                localPath: "new-project",
                pathType: "relative",
                npm: "",
                demo: "",
                description: "",
                tags: [],
            };
            state.itemCopy = newItem;
        },
        copyItem (state, itemId) {
            const item = state.items.find((item) => {
                return item.id === itemId;
            });
            state.itemCopy = deepClone(item);
        },
        addCopyToItems (state) {
            const itemId = state.itemCopy.id;
            const itemIndex = state.items.findIndex((item) => {
                return item.id === itemId;
            });
            if (itemIndex === -1) {
                state.lastItemId = state.itemCopy.id;
                state.items.push(deepClone(state.itemCopy));
            } else {
                console.error(`The itemId "${itemId}" is in use!, please use "saveCopyToItem"`);
            }
        },
        saveCopyToItem (state) {
            const itemId = state.itemCopy.id;
            const itemIndex = state.items.findIndex((item) => {
                return item.id === itemId;
            });
            if (itemIndex > -1) {
                state.items[itemIndex] = deepClone(state.itemCopy);
            } else {
                console.error(`The itemId "${itemId}" is unused!, please use "addCopyToItems"`);
            }
        },
        deleteCopiedItem (state) {
            const itemId = state.itemCopy.id;
            const itemIndex = state.items.findIndex((item) => {
                return item.id === itemId;
            });
            state.items.splice(itemIndex, 1);
        },
        applySearch (state) {
            state.filteredItems = deepClone(state.items)
                .filter((item) => {
                    if (state.searchTerms.length === 0) {
                        return true;
                    }

                    const matchesAllTerms = state.searchTerms.reduce((matches, term) => {
                        const lowerCaseTerm = term.toLowerCase();
                        // results should match all terms
                        if (!matches) {
                            return false;
                        }

                        let matchesTerm = item.title.toLowerCase().includes(lowerCaseTerm);
                        matchesTerm = matchesTerm || item.description.toLowerCase().includes(lowerCaseTerm);
                        matchesTerm = matchesTerm || item.tags.reduce((result, tag) => {
                            return result || tag.toLowerCase().includes(lowerCaseTerm);
                        }, false);
                        return matchesTerm;
                    }, true);
                    return matchesAllTerms;
                })
                .sort((itemA, itemB) => {
                    return itemA.title.localeCompare(itemB.title);
                });
        },
        saveItems (state) {
            const items = deepClone(state.items);
            setItems(items);
            saveItems();
        },
        saveSettings (state) {
            const settings = {
                devFolder: state.devFolder,
                lastItemId: state.lastItemId,
                ignoreDirtyState: state.ignoreDirtyState,
            };
            setSettings(settings);
            saveSettings();
        },
        importData (state, data) {
            state.items = deepClone(data.items);
            state.devFolder = data.settings.devFolder;
            state.lastItemId = data.settings.lastItemId;
            state.ignoreDirtyState = data.settings.ignoreDirtyState;
        },
    },
    actions: {
        setSearchTerms (context, searchTerms) {
            context.commit("setSearchTerms", searchTerms);
            context.commit("applySearch");
        },
        createDefaultItemCopy (context) {
            context.commit("createDefaultItemCopy");
        },
        copyItem (context, itemId) {
            context.commit("copyItem", itemId);
        },
        addCopyToItems (context) {
            context.commit("addCopyToItems");
            context.commit("saveItems");
            context.commit("saveSettings");
            context.commit("applySearch");
        },
        saveCopyToItem (context) {
            context.commit("saveCopyToItem");
            context.commit("saveItems");
            context.commit("applySearch");
        },
        deleteCopiedItem (context) {
            context.commit("deleteCopiedItem");
            context.commit("saveItems");
            context.commit("applySearch");
        },
        setDevFolder (context, devFolder) {
            context.commit("setDevFolder", devFolder);
            context.commit("saveSettings");
            context.commit("applySearch");
        },
        setIgnoreDirtyState (context, ignoreDirtyState) {
            context.commit("setIgnoreDirtyState", ignoreDirtyState);
            context.commit("saveSettings");
        },
        importData (context, data) {
            context.commit("importData", data);
            context.commit("saveItems");
            context.commit("saveSettings");
            setDirtyState(false);
            context.commit("applySearch");
        }
    },
});

appState.commit("applySearch");

globalThis.AppState = appState;

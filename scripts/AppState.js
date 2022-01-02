import { setDirtyState } from "./DirtyState.js";
import { getItems, getSettings, setItems, setSettings, saveItems, saveSettings } from "./ItemManager.js";
import { deepClone } from "./utils.js";
import { defaults } from "./AppStateDefaults.js";

const { Vuex } = globalThis;

const items = getItems();
const settings = getSettings();

/*========================== CONVERSION ==========================*/
items.forEach((item) => {
    if (item.npm) {
        item.packageUrl = item.npm;
        item.packageType = "npm";
        delete item.npm;
    // eslint-disable-next-line no-prototype-builtins
    } else if (item.hasOwnProperty("npm")) {
        item.packageType = "";
        item.packageUrl = "";
        delete item.npm;
    }

    // eslint-disable-next-line no-prototype-builtins
    if (!item.hasOwnProperty("packageType")) {
        item.packageType = "";
        item.packageUrl = "";
    }

    if (item.packageType === "npm" && item.packageUrl === "") {
        item.packageType = "";
    }

    // eslint-disable-next-line no-prototype-builtins
    if (!item.hasOwnProperty("boardType")) {
        item.boardType = "";
        item.boardUrl = "";
    }

    // eslint-disable-next-line no-prototype-builtins
    if (!item.hasOwnProperty("wikiUrl")) {
        item.wikiUrl = "";
    }

    // eslint-disable-next-line no-prototype-builtins
    if (item.hasOwnProperty("demo")) {
        item.demoUrl = item.demo;
        delete item.demo;
    }

    // eslint-disable-next-line no-prototype-builtins
    if (!item.hasOwnProperty("isFavorite")) {
        item.isFavorite = false;
    }

    // eslint-disable-next-line no-prototype-builtins
    if (!item.hasOwnProperty("localProtocol")) {
        item.localProtocol = "vscode";
    }
});

/*================================================================*/

export const appState = new Vuex.Store({
    state: {
        searchTerms: [],
        itemCopy: items[0],
        filteredItems: items,
        devFolder: settings.devFolder || defaults.devFolder,
        lastItemId: typeof settings.lastItemId === "number" ? settings.lastItemId : 0,
        ignoreDirtyState: typeof settings.ignoreDirtyState === "boolean" ? settings.ignoreDirtyState : false,
        customTypes: settings.customTypes || defaults.customTypes,
        previewMarkdown: true,
        items
    },
    getters: {
        protocols: (state) => {
            return defaults.protocols.concat(state.customTypes.protocols || []);
        },
        repoTypes: (state) => {
            return defaults.repoTypes.concat(state.customTypes.repoTypes || []);
        },
        packageTypes: (state) => {
            return defaults.packageTypes.concat(state.customTypes.packageTypes || []);
        },
        boardTypes: (state) => {
            return defaults.boardTypes.concat(state.customTypes.boardTypes || []);
        },
    },
    mutations: {
        setSearchTerms (state, searchTerms) {
            state.searchTerms = searchTerms;
        },
        setFavorite (state, options) {
            const itemIndex = state.items.findIndex((item) => {
                return item.id === options.itemId;
            });
            if (itemIndex > -1) {
                state.items[itemIndex].isFavorite = !!options.value;
            }
        },
        createDefaultItemCopy (state) {
            const newItem = {
                id: state.lastItemId + 1,
                title: "new Project",
                repoUrl: "https://github.com/user/new-project",
                repoType: "github",
                localProtocol: "vscode",
                localPath: "new-project",
                pathType: "relative",
                packageUrl: "",
                packageType: "",
                boardUrl: "",
                boardType: "default",
                demoUrl: "",
                wikiUrl: "",
                description: "",
                tags: [],
                isFavorite: false,
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
                    if (itemA.isFavorite && !itemB.isFavorite) {
                        return -1;
                    }
                    if (!itemA.isFavorite && itemB.isFavorite) {
                        return 1;
                    }
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
                customTypes: state.customTypes,
            };
            setSettings(settings);
            saveSettings();
        },
        importData (state, data) {
            state.items = deepClone(data.items);
            state.devFolder = data.settings.devFolder || defaults.devFolder;
            state.lastItemId = data.settings.lastItemId;
            state.ignoreDirtyState = !!data.settings.ignoreDirtyState;
            state.customTypes = data.settings.customTypes || defaults.customTypes;
            // Ensure new customTypes get added properly
            Object.keys(defaults.customTypes).forEach((key) => {
                if (!state.customTypes[key]) {
                    state.customTypes[key] = [];
                }
            });
        },
        setDevFolder (state, devFolder) {
            state.devFolder = devFolder;
        },
        setIgnoreDirtyState (state, ignoreDirtyState) {
            state.ignoreDirtyState = ignoreDirtyState;
        },
        setCustomTypes (state, customTypes) {
            state.customTypes = customTypes;
            // Ensure customTypes don't get deleted
            Object.keys(defaults.customTypes).forEach((key) => {
                if (!state.customTypes[key]) {
                    state.customTypes[key] = [];
                }
            });
        },
        setPreviewMarkdown (state, value) {
            state.previewMarkdown = value;
        },
    },
    actions: {
        setSearchTerms (context, searchTerms) {
            context.commit("setSearchTerms", searchTerms);
            context.commit("applySearch");
        },
        setFavorite (context, options) {
            context.commit("setFavorite", options);
            context.commit("saveItems");
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
        setCustomTypes (context, customTypes) {
            context.commit("setCustomTypes", customTypes);
            context.commit("saveSettings");
        },
        importData (context, data) {
            context.commit("importData", data);
            context.commit("saveItems");
            context.commit("saveSettings");
            setDirtyState(false);
            context.commit("applySearch");
        },
        setPreviewMarkdown (context, value) {
            context.commit("setPreviewMarkdown", value);
        },
    },
});

appState.commit("applySearch");

globalThis.AppState = appState;

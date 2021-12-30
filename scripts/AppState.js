import { setDirtyState } from "./DirtyState.js";
import { getItems } from "./ItemManger.js";
import { deepClone } from "./utils.js";

const { Vuex } = globalThis;

const items = new Array(20)
    .fill()
    .map((value, index) => {
        return {
            id: index,
            title: `Lorem Ipsum ${index}`,
            repoUrl: "https://github.com/H0rn0chse/project-overview",
            repoType: "github",
            localPath: "socket-server",
            pathType: "relative",
            npm: "",
            demo: "https://h0rn0chse.github.io/project-overview/",
            description: "",
            tags: ["test123"],
        };
    });

export const appState = new Vuex.Store({
    state: {
        searchTerms: [],
        itemCopy: items[0],
        filteredItems: items,
        devFolder: "D:\\Aaron\\Dev\\",
        lastItemId: items.length,
        items
    },
    mutations: {
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
        }
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
            context.commit("applySearch");
        },
        saveCopyToItem (context) {
            context.commit("saveCopyToItem");
            context.commit("applySearch");
        },
        deleteCopiedItem (context) {
            context.commit("deleteCopiedItem");
            context.commit("applySearch");
        },
    },
});

appState.commit("applySearch");

globalThis.AppState = appState;

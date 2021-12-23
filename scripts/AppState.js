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
        items
    },
    mutations: {
        setSearchTerms (state, searchTerms) {
            state.searchTerms = searchTerms;
        },
        copyItem (state, itemId) {
            const item = state.items.find((item) => {
                return item.id === itemId;
            });
            state.itemCopy = deepClone(item);
        },
        saveCopyToItem (state) {
            const itemId = state.itemCopy.id;
            const itemIndex = state.items.findIndex((item) => {
                return item.id === itemId;
            });
            state.items[itemIndex] = deepClone(state.itemCopy);
        },
        deleteCopiedItem (state) {
            const itemId = state.itemCopy.id;
            const itemIndex = state.items.findIndex((item) => {
                return item.id === itemId;
            });
            state.items.splice(itemIndex, 1);
        },
        applySearch (state) {
            state.filteredItems = deepClone(state.items);
        }
    },
    actions: {
        setSearchTerms (context, searchTerms) {
            context.commit("setSearchTerms", searchTerms);
            context.commit("applySearch");
        },
        copyItem (context, itemId) {
            context.commit("copyItem", itemId);
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

globalThis.AppState = appState;

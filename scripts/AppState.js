import { setDirtyState } from "./DirtyState.js";
import { getItems } from "./ItemManger.js";

const { Vuex } = globalThis;

export const appState = new Vuex.Store({
    state: {
        searchTerms: [],
        filteredItems: new Array(10)
            .fill()
            .map((value, index) => {
                return {
                    id: index,
                    title: `Lorem Ipsum ${index}`,
                    github: "https://github.com/H0rn0chse/project-overview",
                };
            })
    },
    mutations: {
        /*updateAll (state) {
            state.entries = getItems();
        },
        updateRow (state, param) {
            const index = -1; //indexByProperty(state.entries, "id", param.id);
            if (index > -1) {
                state.entries[index][param.property] = param.value;
            }
        }*/
        setSearchTerms (state, searchTerms) {
            state.searchTerms = searchTerms;
        },
    },
    actions: {
        /*updateAll (context) {
            context.commit('updateAll');
        },*/
        setSearchTerms (context, searchTerms) {
            context.commit("setSearchTerms", searchTerms);
        },
    },
});

globalThis.AppState = appState;

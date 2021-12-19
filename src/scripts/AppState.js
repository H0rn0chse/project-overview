import { setDirtyState } from "./DirtyState.js";
import { getItems } from "./ItemManger.js";

const { createStore } = globalThis.Vuex;

export const appState = createStore({
    state: {
        title: "Lorem Ipsum",
        items: getItems(),
    },
    mutations: {
        updateAll (state) {
            state.entries = getItems();
        },
        updateRow (state, param) {
            const index = -1; //indexByProperty(state.entries, "id", param.id);
            if (index > -1) {
                state.entries[index][param.property] = param.value;
            }
        }
    },
    actions: {
        /*updateAll (context) {
            context.commit('updateAll');
        },*/
    },
});

globalThis.AppState = appState;

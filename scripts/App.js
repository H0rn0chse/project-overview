import { appState } from "./AppState.js";
import { ListItem } from "./components/ListItem.js";
import { ItemList } from "./components/ItemList.js";
import { SearchBar } from "./components/SearchBar.js";

const { Vue, Vuex } = globalThis;
const { mapState } = Vuex;

const componentList = [
    SearchBar,
    ItemList,
    ListItem
];

const app = new Vue({
    el: "#app",
    template: `
        <b-container
            id="app"
            fluid
            class="d-flex flex-column justify-content-start align-items-center"
        >
            <search-bar/>
            <item-list/>
        </b-container>
    `,
    store: appState,
    computed: {
        ...mapState([
        ]),
    }
});

globalThis.App = app;
globalThis.AppState = appState;

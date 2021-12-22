import { appState } from "./AppState.js";
import { ListItem } from "./components/ListItem.js";
import { ItemList } from "./components/ItemList.js";
import { SearchBar } from "./components/SearchBar.js";
import { SideBar } from "./components/SideBar.js";

const { Vue, Vuex } = globalThis;
const { mapState } = Vuex;

const componentList = [
    SideBar,
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
            <side-bar/>
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

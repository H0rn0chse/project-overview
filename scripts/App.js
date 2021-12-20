import { appState } from "./AppState.js";
import { SearchBar } from "./components/SearchBar.js";

const { Vue, Vuex } = globalThis;
const { mapState } = Vuex;

const componentList = [
    SearchBar
];

const app = new Vue({
    el: "#app",
    template: `
        <b-container
            id="app"
            fluid
            class="w-100 h-100"
        >
            <search-bar/>
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

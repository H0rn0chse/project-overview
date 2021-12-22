import { appState } from "./AppState.js";
import { ListItem } from "./components/ListItem.js";
import { ItemList } from "./components/ItemList.js";
import { SearchBar } from "./components/SearchBar.js";
import { SideBar } from "./components/SideBar.js";
import { ItemDescription } from "./components/ItemDescription.js";
import { SettingsDialog } from "./components/SettingsDialog.js";

const { Vue, Vuex, vueScrollbar } = globalThis;
const { mapState, mapActions } = Vuex;

const componentList = [
    SideBar,
    SearchBar,
    ItemList,
    ListItem,
    ItemDescription,
    SettingsDialog,
];

Vue.component("vue-custom-scrollbar", vueScrollbar);

const app = new Vue({
    el: "#app",
    template: `

        <b-container
            id="app"
            fluid
            class="position-relative d-flex flex-column justify-content-start align-items-center"
        >
            <search-bar/>
            <vue-custom-scrollbar
                :settings="scrollSettings"
                class="itemScrollArea d-flex flex-column justify-content-start align-items-center"
            >
                <item-list/>
            </vue-custom-scrollbar>
            <side-bar/>

        </b-container>
    `,
    store: appState,
    computed: {
        ...mapState([
        ]),
    },
    data () {
        return {
            scrollSettings: {
                suppressScrollY: false,
                suppressScrollX: true,
                wheelPropagation: true
            }
        };
    },
    methods: {
        ...mapActions([]),
    },
});

globalThis.App = app;
globalThis.AppState = appState;

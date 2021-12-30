import { appState } from "./AppState.js";
import { ListItem } from "./components/ListItem.js";
import { ItemList } from "./components/ItemList.js";
import { SearchBar } from "./components/SearchBar.js";
import { SideBar } from "./components/SideBar.js";
import { SettingsModal } from "./components/SettingsModal.js";
import { EditItemGroup } from "./components/EditItemGroup.js";
import { EditItemModal } from "./components/EditItemModal.js";
import { AddItemModal } from "./components/AddItemModal.js";

const { Vue, Vuex, vueScrollbar } = globalThis;
const { mapState, mapActions } = Vuex;

const componentList = [
    SideBar,
    SearchBar,
    ItemList,
    ListItem,
    EditItemGroup,
    EditItemModal,
    AddItemModal,
    SettingsModal,
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
                ref="scrollbar"
            >
                <item-list/>
            </vue-custom-scrollbar>
            <side-bar/>
            <edit-item-modal/>
            <add-item-modal/>
            <settings-modal/>
        </b-container>
    `,
    store: appState,
    mounted () {
        appState.watch(() => {
            return this.filteredItems;
        },
        () => {
            this.$refs.scrollbar.update();
        });
    },
    computed: {
        ...mapState([
            "filteredItems"
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

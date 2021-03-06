import { appState } from "./AppState.js";
import { ListItem } from "./components/ListItem.js";
import { ItemList } from "./components/ItemList.js";
import { SearchBar } from "./components/SearchBar.js";
import { SideBar } from "./components/SideBar.js";
import { SettingsModal } from "./components/SettingsModal.js";
import { EditItemGroup } from "./components/EditItemGroup.js";
import { EditItemModal } from "./components/EditItemModal.js";
import { AddItemModal } from "./components/AddItemModal.js";
import { JsonEditor } from "./components/JsonEditor.js";
import { replaceSvgWithFeather } from "./utils.js";

const { Vue, Vuex, vueScrollbar, VueMarkdown } = globalThis;
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
    JsonEditor,
];

Vue.component("vue-custom-scrollbar", vueScrollbar);
Vue.use(VueMarkdown);

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
            <b-button
                id="btn-toTop"
                title="Scroll to Top"
                @click="scrollTop"
                pill
            >
                <svg ref="top"></svg>
            </b-button>
        </b-container>
    `,
    store: appState,
    mounted () {
        const options = {
            width: "2em",
            height: "2em",
        };

        replaceSvgWithFeather(this.$refs.top, "chevrons-up", options);

        appState.watch(
            () => {
                return this.filteredItems;
            },
            () => {
                this.$refs.scrollbar.update();
            }
        );
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
        scrollTop () {
            this.$refs.scrollbar.$el.scrollTop = 0;
        },
    },
});

globalThis.App = app;
globalThis.AppState = appState;

import { getColor, replaceSvgWithFeather } from "../utils.js";

const { Vue, Vuex } = globalThis;
const { mapState, mapActions } = Vuex;

export const SideBar = Vue.component("side-bar", {
    template: `
        <div
            class="sideBar d-flex flex-column align-items-center justify-content-between"
        >
            <div
                class="top d-flex flex-column align-items-center"
            >
                <div
                    title="Settings"
                    class="sideItem"
                >
                    <svg ref="settings"></svg>
                </div>
            </div>
            <div
                class="bottom d-flex flex-column align-items-center"
            >
                <div
                    title="Add new Project"
                    class="sideItem"
                >
                    <svg ref="add"></svg>
                </div>
            </div>
        </div>
    `,
    props: [],
    mounted () {
        const options = {
            width: "3em",
            height: "3em",
            color: getColor("--common-font-primary")
        };

        replaceSvgWithFeather(this.$refs.settings, "settings", options);
        replaceSvgWithFeather(this.$refs.add, "plus-square", options);
    },
    computed: {
        ...mapState([]),
    },
    data () {
        return {};
    },
    methods: {
        ...mapActions([]),
    }
});

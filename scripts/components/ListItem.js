import { replaceSvgWithFeather, replaceSvgWithSimpleIcons } from "../utils.js";

const { Vue, Vuex } = globalThis;
const { mapState, mapActions, mapGetters } = Vuex;

export const ListItem = Vue.component("list-item", {
    template: `
        <div
            class="listItem"
            @click="showEditItemModal"
        >
            <h3>{{data.title}}</h3>
            <div
                class="linkList"
            >
                <b-link
                    showif="data.localPath"
                    @click="stopPropagation"
                    :href="vscodePath"
                    target="_blank"
                >
                    <svg ref="vscode"></svg>
                </b-link>
                <b-link
                showif="data.repoUrl"
                    @click="stopPropagation"
                    :href="data.repoUrl"
                    target="_blank"
                >
                    <svg ref="repo"></svg>
                </b-link>
                <b-link
                    v-show="data.packageUrl"
                    @click="stopPropagation"
                    :href="data.packageUrl"
                    target="_blank"
                >
                    <svg ref="package"></svg>
                </b-link>
                <b-link
                    v-show="data.boardUrl"
                    @click="stopPropagation"
                    :href="data.boardUrl"
                    target="_blank"
                >
                    <svg ref="board"></svg>
                </b-link>
                <b-link
                    v-show="data.demo"
                    @click="stopPropagation"
                    :href="data.demo"
                    target="_blank"
                >
                    <svg ref="demo"></svg>
                    Demo
                </b-link>
            </div>
        </div>
    `,
    props: [
        "data",
    ],
    mounted () {
        const options = {
            width: "1.5em",
            height: "1.5em",
        };

        replaceSvgWithSimpleIcons(this.$refs.vscode, "visualstudiocode", options);

        this.updateTypes();

        options.width = "1em",
        options.height = "1em",
        replaceSvgWithFeather(this.$refs.demo, "play-circle", options);
    },
    updated () {
        this.updateTypes();
    },
    computed: {
        ...mapState([
            "devFolder",
        ]),
        ...mapGetters([
            "repoTypes",
            "packageTypes",
            "boardTypes",
        ]),
        modalId: {
            get () {
                return `${this.data.id}_detailModal`;
            }
        },
        vscodePath: {
            get () {
                if (this.data.pathType === "relative") {
                    return `vscode://file/${this.devFolder}${this.data.localPath}`;
                }
                return `vscode://file/${this.data.localPath}`;
            }
        }
    },
    data () {
        return {};
    },
    methods: {
        ...mapActions([
            "copyItem"
        ]),
        stopPropagation (evt) {
            evt.stopPropagation();
        },
        showEditItemModal () {
            this.copyItem(this.data.id);
            this.$bvModal.show("editItemModal");
        },
        updateTypes () {
            const options = {
                width: "1.5em",
                height: "1.5em",
            };

            [{
                types: this.repoTypes,
                typeId: this.data.repoType,
                ref: "repo"
            }, {
                types: this.packageTypes,
                typeId: this.data.packageType,
                ref: "package"
            }, {
                types: this.boardTypes,
                typeId: this.data.boardType,
                ref: "board"
            }].forEach((data) => {
                const type = data.types.find((types) => {
                    return types.id === data.typeId;
                });
                const icon = type && type.icon || {};

                switch (icon.src) {
                    case "SimpleIcons":
                        this.$refs[data.ref] = replaceSvgWithSimpleIcons(this.$refs[data.ref], icon.key, options);
                        break;
                    case "Feather":
                        this.$refs[data.ref] = replaceSvgWithFeather(this.$refs[data.ref], icon.key, options);
                        break;
                    default:
                        this.$refs[data.ref].style.display = "none";
                }
            });
        },
    }
});

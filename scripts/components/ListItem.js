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

        this.updateIcons();

        options.width = "1em",
        options.height = "1em",
        replaceSvgWithFeather(this.$refs.demo, "play-circle", options);
    },
    updated () {
        this.updateIcons();
    },
    computed: {
        ...mapState([
            "devFolder",
        ]),
        ...mapGetters([
            "repoTypes",
            "packageTypes",
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
        updateIcons () {
            const options = {
                width: "1.5em",
                height: "1.5em",
            };

            [{
                icons: this.repoTypes,
                iconKey: this.data.repoType,
                ref: "repo"
            }, {
                icons: this.packageTypes,
                iconKey: this.data.packageType,
                ref: "package"
            }].forEach((data) => {
                const icon = data.icons.find((icon) => {
                    return icon.iconKey === data.iconKey;
                });

                if (icon && icon.iconSrc === "SimpleIcons") {
                    this.$refs[data.ref] = replaceSvgWithSimpleIcons(this.$refs[data.ref], icon.iconKey, options);
                } else if (icon && icon.iconSrc === "Feather") {
                    this.$refs[data.ref] = replaceSvgWithFeather(this.$refs[data.ref], icon.iconKey, options);
                } else {
                    this.$refs[data.ref].style.display = "none";
                }
            });
        },
    }
});

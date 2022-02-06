import { getColor, replaceSvgWithFeather, replaceSvgWithSimpleIcons } from "../utils.js";

const { Vue, Vuex } = globalThis;
const { mapState, mapActions, mapGetters } = Vuex;

export const ListItem = Vue.component("list-item", {
    template: `
        <div
            class="listItem d-flex flex-row justify-content-between align-items-center"
            @click="showEditItemModal"
        >
            <div
                class="d-flex flex-column"
            >
                <h3>{{data.title}}</h3>
                <div
                    class="linkList"
                >
                    <b-link
                        showif="data.localPath"
                        @click="stopPropagation"
                        :href="localPath"
                        target="_blank"
                    >
                        <svg ref="ide"></svg>
                    </b-link>
                    <b-link
                    showif="data.repoUrl"
                        @click="stopPropagation"
                        :href="data.repoUrl"
                        target="_blank"
                        title="Repository"
                    >
                        <svg ref="repo"></svg>
                    </b-link>
                    <b-link
                        v-show="data.packageUrl"
                        @click="stopPropagation"
                        :href="data.packageUrl"
                        target="_blank"
                        title="Package"
                    >
                        <svg ref="package"></svg>
                    </b-link>
                    <b-link
                        v-show="data.boardUrl"
                        @click="stopPropagation"
                        :href="data.boardUrl"
                        target="_blank"
                        title="Board"
                    >
                        <svg ref="board"></svg>
                    </b-link>
                    <b-link
                        v-show="data.demoUrl"
                        @click="stopPropagation"
                        :href="data.demoUrl"
                        target="_blank"
                        title="Demo"
                    >
                        <svg ref="demo"></svg>
                        Demo
                    </b-link>
                    <b-link
                        v-show="data.wikiUrl"
                        @click="stopPropagation"
                        :href="data.wikiUrl"
                        target="_blank"
                        title="Wiki"
                    >
                        Wiki
                    </b-link>
                </div>
            </div>
            <div
                class="favorite"
                title="Mark as Favorite"
                @click="handleFavoriteClick"
            >
                <svg ref="favorite"></svg>
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

        this.updateFavoriteIcon();
        this.updateTypes();

        options.width = "1em",
        options.height = "1em",
        replaceSvgWithFeather(this.$refs.demo, "play-circle", options);
    },
    updated () {
        this.updateFavoriteIcon();
        this.updateTypes();
    },
    computed: {
        ...mapState([
            "devFolder",
        ]),
        ...mapGetters([
            "protocols",
            "repoTypes",
            "packageTypes",
            "boardTypes",
        ]),
        modalId: {
            get () {
                return `${this.data.id}_detailModal`;
            }
        },
        localPath: {
            get () {
                let path = this.data.localPath;
                if (this.data.pathType === "relative") {
                    path = `${this.devFolder}${this.data.localPath}`;
                }

                const protocol = this.protocols.find((protocol) => {
                    return protocol.id === this.data.localProtocol;
                });
                if (!protocol) {
                    return `file://${path}`;
                }

                return protocol.schema.replaceAll("{{PATH}}", path);
            }
        },
    },
    data () {
        return {};
    },
    methods: {
        ...mapActions([
            "copyItem",
            "setFavorite"
        ]),
        stopPropagation (evt) {
            evt.stopPropagation();
        },
        showEditItemModal () {
            this.copyItem(this.data.id);
            this.$bvModal.show("editItemModal");
        },
        handleFavoriteClick (evt) {
            const options = {
                itemId: this.data.id,
                value: !this.data.isFavorite,
            };
            this.setFavorite(options);
            this.stopPropagation(evt);
        },
        updateFavoriteIcon () {
            const options = {
                width: "1.5em",
                height: "1.5em",
            };

            if (this.data.isFavorite) {
                options.stroke = getColor("--common-favorite");
                options.fill = getColor("--common-favorite");
            }

            this.$refs.favorite = replaceSvgWithFeather(this.$refs.favorite, "star", options);
        },
        updateTypes () {
            const options = {
                width: "1.5em",
                height: "1.5em",
            };

            [{
                types: this.protocols,
                typeId: this.data.localProtocol,
                ref: "ide"
            }, {
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

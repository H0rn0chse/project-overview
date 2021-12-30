import { replaceSvgWithFeather, replaceSvgWithSimpleIcons } from "../utils.js";

const { Vue, Vuex } = globalThis;
const { mapState, mapActions } = Vuex;

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
                    v-show="data.repoType === 'github'"
                    @click="stopPropagation"
                    :href="data.repoUrl"
                    target="_blank"
                >
                    <svg ref="github"></svg>
                </b-link>
                <b-link
                    v-show="data.repoType === 'gitlab'"
                    @click="stopPropagation"
                    :href="data.repoUrl"
                    target="_blank"
                >
                    <svg ref="gitlab"></svg>
                </b-link>
                <b-link
                    v-show="data.repoType === 'bitbucket'"
                    @click="stopPropagation"
                    :href="data.repoUrl"
                    target="_blank"
                >
                    <svg ref="bitbucket"></svg>
                </b-link>
                <b-link
                    v-show="data.repoType === 'git'"
                    @click="stopPropagation"
                    :href="data.repoUrl"
                    target="_blank"
                >
                    <svg ref="git"></svg>
                </b-link>
                <b-link
                    v-show="data.npm"
                    @click="stopPropagation"
                    :href="data.npm"
                    target="_blank"
                >
                    <svg ref="npm"></svg>
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
        replaceSvgWithSimpleIcons(this.$refs.github, "github", options);
        replaceSvgWithSimpleIcons(this.$refs.gitlab, "gitlab", options);
        replaceSvgWithSimpleIcons(this.$refs.bitbucket, "bitbucket", options);
        replaceSvgWithSimpleIcons(this.$refs.git, "git", options);
        replaceSvgWithSimpleIcons(this.$refs.npm, "npm", options);

        options.width = "1em",
        options.height = "1em",
        replaceSvgWithFeather(this.$refs.demo, "play-circle", options);
    },
    computed: {
        ...mapState([
            "devFolder"
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
    }
});

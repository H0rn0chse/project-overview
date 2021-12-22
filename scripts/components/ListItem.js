import { replaceSvgWithFeather, replaceSvgWithSimpleIcons } from "../utils.js";

const { Vue, Vuex } = globalThis;
const { mapState, mapActions } = Vuex;

export const ListItem = Vue.component("list-item", {
    template: `
        <div
            class="listItem"
            v-b-modal="modalId"
        >
            <h3>{{data.title}}</h3>
            <div
                class="linkList"
            >
                <b-link
                    v-if="data.relativePath"
                    v-on:click="stopPropagation"
                    :href="absolutePath"
                    target="_blank"
                >
                    <svg ref="vscode"></svg>
                </b-link>
                <b-link
                    v-if="data.github"
                    v-on:click="stopPropagation"
                    :href="data.repository"
                    target="_blank"
                >
                    <svg ref="github"></svg>
                </b-link>
                <b-link
                    v-if="data.gitlab"
                    v-on:click="stopPropagation"
                    :href="data.repository"
                    target="_blank"
                >
                    <svg ref="gitlab"></svg>
                </b-link>
                <b-link
                    v-if="data.bitbucket"
                    v-on:click="stopPropagation"
                    :href="data.repository"
                    target="_blank"
                >
                    <svg ref="bitbucket"></svg>
                </b-link>
                <b-link
                    v-if="data.git"
                    v-on:click="stopPropagation"
                    :href="data.repository"
                    target="_blank"
                >
                    <svg ref="git"></svg>
                </b-link>
                <b-link
                    v-if="data.npm"
                    v-on:click="stopPropagation"
                    :href="data.npm"
                    target="_blank"
                >
                    <svg ref="npm"></svg>
                </b-link>
                <b-link
                    v-if="data.demo"
                    v-on:click="stopPropagation"
                    :href="data.demo"
                    target="_blank"
                >
                    <svg ref="demo"></svg>
                    Demo
                </b-link>
            </div>
            <item-description
                :id="modalId"
                :data="data"
            />
        </div>
    `,
    props: [
        "data"
    ],
    mounted () {
        const options = {
            width: "1.5em",
            height: "1.5em",
        };

        this.$refs.vscode && replaceSvgWithSimpleIcons(this.$refs.vscode, "visualstudiocode", options);
        this.$refs.github && replaceSvgWithSimpleIcons(this.$refs.github, "github", options);
        this.$refs.gitlab && replaceSvgWithSimpleIcons(this.$refs.gitlab, "gitlab", options);
        this.$refs.bitbucket && replaceSvgWithSimpleIcons(this.$refs.bitbucket, "bitbucket", options);
        this.$refs.git && replaceSvgWithSimpleIcons(this.$refs.git, "git", options);
        this.$refs.npm && replaceSvgWithSimpleIcons(this.$refs.npm, "npm", options);

        options.width = "1em",
        options.height = "1em",
        this.$refs.demo && replaceSvgWithFeather(this.$refs.demo, "play-circle", options);
    },
    computed: {
        ...mapState([]),
        modalId: {
            get () {
                return `${this.data.id}_detailModal`;
            }
        },
        absolutePath: {
            get () {
                return `vscode://file/${this.data.relativePath}`;
            }
        }
    },
    data () {
        return {};
    },
    methods: {
        ...mapActions([]),
        stopPropagation (evt) {
            evt.stopPropagation();
        }
    }
});

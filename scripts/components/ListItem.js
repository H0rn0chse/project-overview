import { replaceSvgWithFeather, replaceSvgWithSimpleIcons } from "../utils.js";

const { Vue, Vuex } = globalThis;
const { mapState, mapActions } = Vuex;

export const ListItem = Vue.component("list-item", {
    template: `
        <div
            class="listItem"
        >
            <div
                v-b-modal="modalId"
            >
                <h3>{{data.title}}</h3>
                <div
                    class="linkList"
                >
                    <b-link
                        v-if="data.github"
                        :href="data.repository"
                        target="_blank"
                    >
                        <svg ref="github"></svg>
                    </b-link>
                    <b-link
                        v-if="data.gitlab"
                        :href="data.repository"
                        target="_blank"
                    >
                        <svg ref="gitlab"></svg>
                    </b-link>
                    <b-link
                        v-if="data.bitbucket"
                        :href="data.repository"
                        target="_blank"
                    >
                        <svg ref="bitbucket"></svg>
                    </b-link>
                    <b-link
                        v-if="data.git"
                        :href="data.repository"
                        target="_blank"
                    >
                        <svg ref="git"></svg>
                    </b-link>
                    <b-link
                        v-if="data.npm"
                        :href="data.npm"
                        target="_blank"
                    >
                        <svg ref="npm"></svg>
                    </b-link>
                    <b-link
                        v-if="data.demo"
                        :href="data.demo"
                        target="_blank"
                    >
                        <svg ref="demo"></svg>
                        Demo
                    </b-link>
                </div>
            </div>
            <b-modal
                :id="modalId"
            >
                <template #modal-title>
                    {{data.title}}
                </template>
                <div class="d-block text-center">
                    <h3>{{data.title}}</h3>
                </div>
            </b-modal>
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
        }
    },
    data () {
        return {};
    },
    methods: {
        ...mapActions([]),
    }
});

import { replaceSvgWithFeather } from "../utils.js";

const { Vue, Vuex } = globalThis;
const { mapState, mapActions } = Vuex;

export const SearchBar = Vue.component("search-bar", {
    template: `
        <b-form-group
            class="searchBar d-flex justify-content-center align-items-center"
        >
            <b-form-tags
                placeholder="Enter search terms..."
                input-id="search-terms"
                v-model="searchTermsLocal"
                separator=" ,;"
                remove-on-delete
            />
            <b-button
                size="m"
                title="Clear All Tags"
                @click="clearTags"
                variant="primary"
            >
                <svg ref="clearTags"></svg>
            </b-button>
        </b-form-group>
    `,
    props: [],
    mounted () {
        replaceSvgWithFeather(this.$refs.clearTags, "x-circle");
    },
    computed: {
        ...mapState([
            "searchTerms"
        ]),
        searchTermsLocal: {
            get () {
                return this.searchTerms;
            },
            set (newSearchTerms) {
                this.setSearchTerms(newSearchTerms);
            }
        }
    },
    data () {
        return {};
    },
    methods: {
        ...mapActions([
            "setSearchTerms"
        ]),
        clearTags () {
            this.searchTermsLocal = [];
        }
    },
});

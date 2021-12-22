const { Vue, Vuex } = globalThis;
const { mapState, mapActions } = Vuex;

export const ListItem = Vue.component("list-item", {
    template: `
        <div
            class="listItem"
        >
            <h3>{{data.title}}</h3>
        </div>
    `,
    props: [
        "data"
    ],
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

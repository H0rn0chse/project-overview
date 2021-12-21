const { Vue, Vuex } = globalThis;
const { mapState, mapActions } = Vuex;

export const ListItem = Vue.component("list-item", {
    template: `
        <div>
            <h1>ListItem</h1>
            <h2>{{data.title}}</h2>
        </div>
    `,
    props: [
        "data"
    ],
    computed: {
        ...mapState([]),
    },
    data () {
        return {}
    },
    methods: {
        ...mapActions([]),
    }
});

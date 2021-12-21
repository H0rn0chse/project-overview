const { Vue, Vuex } = globalThis;
const { mapState, mapActions } = Vuex;

export const ItemList = Vue.component("item-list", {
    template: `
        <div>
            <list-item v-for="item in filteredItems" :key="item.id" :data="item"/>
        </div>
    `,
    props: [],
    computed: {
        ...mapState([
            "filteredItems"
        ]),
    },
    data () {
        return {}
    },
    methods: {
        ...mapActions([]),
    }
});

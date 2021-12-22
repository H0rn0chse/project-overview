const { Vue, Vuex } = globalThis;
const { mapState, mapActions } = Vuex;

export const ItemList = Vue.component("item-list", {
    template: `
        <div
            class="itemList d-flex flex-column justify-content-center align-items-center"
        >
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
        return {};
    },
    methods: {
        ...mapActions([]),
    }
});

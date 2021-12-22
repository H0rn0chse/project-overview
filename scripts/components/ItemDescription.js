const { Vue, Vuex } = globalThis;
const { mapState, mapActions } = Vuex;

export const ItemDescription = Vue.component("item-description", {
    template: `
        <b-modal
            :id="id"
            class="itemDescription"
        >
            <template #modal-title>
                {{data.title}}
            </template>
            <div class="d-block text-center">
                <h3>{{data.title}}</h3>
            </div>
        </b-modal>
    `,
    props: [
        "id",
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

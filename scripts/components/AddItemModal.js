const { Vue, Vuex } = globalThis;
const { mapState, mapActions } = Vuex;

export const AddItemModal = Vue.component("add-item-modal", {
    template: `
        <b-modal
            id="addItemModal"
            class="addItemModal"
            size="lg"
            @show="createDefaultItemCopy"
        >
            <template #modal-title>
                <b-form-input
                    v-model="data.title"
                    style="width:30em;"
                />
            </template>
            <edit-item-group/>
            <template #modal-footer="{ hide, cancel }">
                <b-button
                    @click="saveItem(hide)"
                    variant="success"
                >
                    Add
                </b-button>
                <b-button
                    @click="cancel"
                >
                    Cancel
                </b-button>
            </template>
        </b-modal>
    `,
    props: [],
    computed: {
        ...mapState({
            data: "itemCopy"
        }),
    },
    data () {
        return {};
    },
    methods: {
        ...mapActions([
            "createDefaultItemCopy",
            "addCopyToItems",
        ]),
        saveItem (hide) {
            this.addCopyToItems();
            hide();
        },
    }
});

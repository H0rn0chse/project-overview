const { Vue, Vuex } = globalThis;
const { mapState, mapActions } = Vuex;

export const EditItemModal = Vue.component("edit-item-modal", {
    template: `
        <b-modal
            id="editItemModal"
            class="editItemModal"
            size="lg"
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
                    Save
                </b-button>
                <b-button
                    @click="cancel"
                >
                    Cancel
                </b-button>
                <b-button
                    @click="deleteItem(hide)"
                    variant="danger"
                >
                    Delete
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
            "saveCopyToItem",
            "deleteCopiedItem"
        ]),
        saveItem (hide) {
            this.saveCopyToItem();
            hide();
        },
        deleteItem (hide) {
            this.$bvModal.msgBoxConfirm("This Action will permanently delete the item.\nAre you sure?")
                .then((value) => {
                    if (value) {
                        this.deleteCopiedItem();
                    }
                    hide();
                })
                .catch((err) => {
                    // An error occurred
                });
        },
    }
});

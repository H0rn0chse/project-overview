const { Vue, Vuex } = globalThis;
const { mapState, mapActions } = Vuex;

export const EditItemModal = Vue.component("edit-item-modal", {
    template: `
        <b-modal
            id="editItemModal"
            ref="modal"
            class="editItemModal"
            size="lg"
            @show="handleShow"
            @hide="handleHide"
        >
            <template #modal-title>
                <b-form-input
                    v-model="data.title"
                    style="width:30em;"
                />
            </template>
            <edit-item-group/>
            <template #modal-footer="{ cancel }">
                <b-button
                    @click="saveItem"
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
                    @click="deleteItem"
                    variant="danger"
                >
                    Delete
                </b-button>
            </template>
        </b-modal>
    `,
    props: [],
    mounted () {
        document.addEventListener("keydown", (evt) => {
            if (this.$refs.modal.isVisible && (evt.metaKey || evt.ctrlKey) && evt.key === "s") {
                evt.preventDefault();
                this.saveItem();
            }
        });
    },
    computed: {
        ...mapState({
            data: "itemCopy"
        }),
        dirtyState: {
            get () {
                return this.localCopy !== JSON.stringify(this.data);
            }
        },
    },
    data () {
        return {
            localCopy: {},
        };
    },
    methods: {
        ...mapActions([
            "saveCopyToItem",
            "deleteCopiedItem"
        ]),
        saveItem () {
            if (this.dirtyState) {
                this.saveCopyToItem();
                this.updateLocalCopy();
            }
            this.$refs.modal.hide();
        },
        deleteItem () {
            this.$bvModal.msgBoxConfirm("This Action will permanently delete the item.\nAre you sure?")
                .then((value) => {
                    if (value) {
                        this.deleteCopiedItem();
                        this.updateLocalCopy();
                    }
                    this.$refs.modal.hide();
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        handleShow () {
            this.updateLocalCopy();
        },
        updateLocalCopy () {
            this.localCopy = JSON.stringify(this.data);
        },
        handleHide (evt) {
            if (this.dirtyState) {
                evt.preventDefault();
                this.$bvModal.msgBoxConfirm("You have unsaved changes.\nContinue?")
                    .then((value) => {
                        if (value) {
                            this.updateLocalCopy();
                            this.$refs.modal.hide();
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        },
    }
});

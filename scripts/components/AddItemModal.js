const { Vue, Vuex } = globalThis;
const { mapState, mapActions } = Vuex;

export const AddItemModal = Vue.component("add-item-modal", {
    template: `
        <b-modal
            id="addItemModal"
            ref="modal"
            class="addItemModal"
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
                    title="Add Item"
                    @click="saveItem"
                    variant="success"
                >
                    Add
                </b-button>
                <b-button
                    title="Cancel"
                    @click="cancel"
                >
                    Cancel
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
            "createDefaultItemCopy",
            "addCopyToItems",
        ]),
        saveItem () {
            this.addCopyToItems();
            this.updateLocalCopy();
            this.$refs.modal.hide();
        },
        handleShow () {
            this.createDefaultItemCopy();
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

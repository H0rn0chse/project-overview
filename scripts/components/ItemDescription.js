const { Vue, Vuex } = globalThis;
const { mapState, mapActions } = Vuex;

export const ItemDescription = Vue.component("item-description", {
    template: `
        <b-modal
            :id="modalId"
            class="itemDescription"
            size="lg"
            @show="copyItem(itemId)"
        >
            <template #modal-title>
                <b-form-input
                    v-model="data.title"
                    style="width:30em;"
                />
            </template>
            <div
                class="d-flex flex-column justify-content-center align-items-center"
            >
                <b-form-group
                    id="fieldset-horizontal"
                    label-cols="auto"
                    label="Repository URL"
                    label-for="input-repository"
                    class="w-100"
                >
                    <b-input-group
                        id="input-repository"
                    >
                        <b-input-group-prepend>
                            <b-form-select
                                v-model="data.repoType"
                                :options="repoOptions"
                            />
                        </b-input-group-prepend>
                        <b-form-input
                            v-model="data.repoUrl"
                        />
                    </b-input-group>
                </b-form-group>
                <b-form-group
                    id="fieldset-horizontal"
                    label-cols="auto"
                    label="Local Path"
                    label-for="input-localPath"
                    class="w-100"
                >
                    <b-input-group
                        id="input-localPath"
                    >
                        <b-input-group-prepend>
                            <b-form-select
                                v-model="data.pathType"
                                :options="pathOptions"
                            />
                        </b-input-group-prepend>
                        <b-form-input
                            v-model="data.localPath"
                        />
                    </b-input-group>
                </b-form-group>
                <b-form-group
                    id="fieldset-horizontal"
                    label-cols="auto"
                    label="npm URL"
                    label-for="input-npm"
                    class="w-100"
                >
                    <b-form-input
                        id="input-npm"
                        v-model="data.npm"
                    />
                </b-form-group>
                <b-form-group
                    id="fieldset-horizontal"
                    label-cols="auto"
                    label="Demo URL"
                    label-for="input-demo"
                    class="w-100"
                >
                    <b-form-input
                        id="input-demo"
                        v-model="data.demo"
                    />
                </b-form-group>
                <b-form-group
                    id="fieldset-horizontal"
                    label-cols="auto"
                    label="Description"
                    label-for="input-description"
                    class="w-100"
                >
                    <b-form-textarea
                        id="input-description"
                        v-model="data.description"
                        placeholder="Enter something..."
                        rows="3"
                        max-rows="7"
                    />
                </b-form-group>
                <b-form-group
                    id="fieldset-horizontal"
                    label-cols="auto"
                    label="Tags"
                    label-for="input-tags"
                    class="w-100"
                >
                    <b-form-tags
                        input-id="input-tags"
                        v-model="data.tags"
                        separator=" ,;"
                        remove-on-delete

                        style="min-height:6em;"
                    />
                </b-form-group>
            </div>
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
    props: [
        "modalId",
        "itemId"
    ],
    computed: {
        ...mapState({
            data: "itemCopy"
        }),
    },
    data () {
        return {
            url: "",
            selected: "github",
            repoOptions: [
                { value: "github", text: "GitHub" },
                { value: "gitlab", text: "GitLab" },
                { value: "bitbucket", text: "Bitbucket" },
                { value: "git", text: "git" },
            ],
            pathOptions: [
                { value: "relative", text: "relative" },
                { value: "absolute", text: "absolute" },
            ],
        };
    },
    methods: {
        ...mapActions([
            "copyItem",
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

const { Vue, Vuex } = globalThis;
const { mapState, mapActions, mapGetters } = Vuex;

export const EditItemGroup = Vue.component("edit-item-group", {
    template: `
    <div
        class="editItemGroup d-flex flex-column justify-content-center align-items-center"
    >
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
                        v-model="data.localProtocol"
                        :options="protocolOptions"
                    />
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
            label="Package URL"
            label-for="input-package"
            class="w-100"
        >
            <b-input-group
                id="input-package"
            >
                <b-input-group-prepend>
                    <b-form-select
                        v-model="data.packageType"
                        :options="packageOptions"
                    />
                </b-input-group-prepend>
                <b-form-input
                    v-model="data.packageUrl"
                />
            </b-input-group>
        </b-form-group>
        <b-form-group
            id="fieldset-horizontal"
            label-cols="auto"
            label="Board URL"
            label-for="input-board"
            class="w-100"
        >
            <b-input-group
                id="input-board"
            >
                <b-input-group-prepend>
                    <b-form-select
                        v-model="data.boardType"
                        :options="boardOptions"
                    />
                </b-input-group-prepend>
                <b-form-input
                    v-model="data.boardUrl"
                />
            </b-input-group>
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
                v-model="data.demoUrl"
            />
        </b-form-group>
        <b-form-group
            id="fieldset-horizontal"
            label-cols="auto"
            label="Wiki URL"
            label-for="input-wiki"
            class="w-100"
        >
            <b-form-input
                id="input-wiki"
                v-model="data.wikiUrl"
            />
        </b-form-group>
        <b-form-group
            id="fieldset-horizontal"
            label-cols="auto"
            label="Description"
            label-for="textarea-description"
            class="w-100 flex-nowrap"
        >
            <div
                id="textarea-description"
            >
                <b-button-group
                    class="toggleGroup"
                >
                    <b-button
                        size="sm"
                        variant="primary"
                        :pressed.sync="editPressed"
                    >
                        Edit
                    </b-button>
                    <b-button
                        size="sm"
                        variant="primary"
                        :pressed.sync="previewPressed"
                    >
                        Preview
                    </b-button>
                </b-button-group>
                <vue-markdown
                    v-if="previewPressed"
                    :source="data.description"
                    class="itemDescription"
                />
                <b-form-textarea
                    v-if="editPressed"
                    v-model="data.description"
                    placeholder="Enter something..."
                    rows="3"
                    max-rows="7"
                />
            </div>
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
    `,
    props: [],
    computed: {
        ...mapState({
            data: "itemCopy",
            previewMarkdown: "previewMarkdown"
        }),
        ...mapGetters([
            "protocols",
            "repoTypes",
            "packageTypes",
            "boardTypes",
        ]),
        protocolOptions: {
            get () {
                return this.mapIcons(this.protocols);
            }
        },
        repoOptions: {
            get () {
                return this.mapIcons(this.repoTypes);
            }
        },
        packageOptions: {
            get () {
                return this.mapIcons(this.packageTypes);
            }
        },
        boardOptions: {
            get () {
                return this.mapIcons(this.boardTypes);
            }
        },
        previewPressed: {
            get () {
                return this.previewMarkdown;
            },
            set (newValue) {
                if (newValue) {
                    this.setPreviewMarkdown(newValue);
                }
            }
        },
        editPressed: {
            get () {
                return !this.previewMarkdown;
            },
            set (newValue) {
                if (newValue) {
                    this.setPreviewMarkdown(!newValue);
                }
            }
        },
    },
    data () {
        return {
            pathOptions: [
                { value: "relative", text: "relative" },
                { value: "absolute", text: "absolute" },
            ],
        };
    },
    methods: {
        ...mapActions([
            "setPreviewMarkdown"
        ]),
        mapIcons (icons) {
            return icons.map((icon) => {
                return {
                    value: icon.id,
                    text: icon.text
                };
            });
        }
    }
});

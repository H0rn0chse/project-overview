const { Vue, Vuex } = globalThis;
const { mapState, mapActions } = Vuex;

export const SettingsModal = Vue.component("settings-modal", {
    template: `
        <b-modal
            id="settingsModal"
            class="settingsModal"
            @show="handleShow"
        >
            <template #modal-title>
                Settings
            </template>
            <b-form-group
                id="fieldset-horizontal"
                label-cols="auto"
                label="Local Dev Folder"
                label-for="input-devFolder"
                class="w-100"
            >
                <b-form-input
                    id="input-devFolder"
                    v-model="devFolderLocal"
                />
            </b-form-group>
            <b-form-group
                id="fieldset-horizontal"
                label-cols="auto"
                label="IgnoreDirtyState"
                label-for="checkbox-ignoreDirtyState"
                class="w-100 align-items-center"
            >
                <b-form-checkbox
                    id="checkbox-ignoreDirtyState"
                    v-model="ignoreDirtyStateLocal"
                />
            </b-form-group>
            <b-form-group
                id="fieldset-horizontal"
                label-cols="auto"
                label="Custom Repo Type List"
                label-for="textarea-customRepoTypes"
                class="w-100"
            >
                <b-form-textarea
                    id="textarea-customRepoTypes"
                    v-model="customRepoTypesLocal"
                    placeholder="Enter something..."
                    rows="3"
                    max-rows="7"
                />
            </b-form-group>
            <template #modal-footer="{ hide, cancel }">
                <b-button
                    @click="saveSettings(hide)"
                    variant="success"
                >
                    Save
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
        ...mapState([
            "devFolder",
            "ignoreDirtyState",
            "customRepoTypes"
        ]),
    },
    data () {
        return {
            devFolderLocal: "",
            ignoreDirtyStateLocal: false,
            customRepoTypesLocal: "",
        };
    },
    methods: {
        ...mapActions([
            "setDevFolder",
            "setIgnoreDirtyState",
            "setCustomRepoTypes",
        ]),
        handleShow () {
            this.ignoreDirtyStateLocal = this.ignoreDirtyState;
            this.devFolderLocal = this.devFolder;
            this.customRepoTypesLocal = JSON.stringify(this.customRepoTypes, null, 4);
        },
        saveSettings (hide) {
            this.setDevFolder(this.devFolderLocal);
            this.setIgnoreDirtyState(this.ignoreDirtyStateLocal);
            try {
                this.customRepoTypesLocal = this.customRepoTypesLocal === "" ? "[]" : this.customRepoTypesLocal;
                const customRepoTypes = JSON.parse(this.customRepoTypesLocal);
                this.setCustomRepoTypes(customRepoTypes);
            } catch (err) {
                console.error(err, "customRepoTypes contained invalid JSON");
            }
            hide();
        }
    }
});

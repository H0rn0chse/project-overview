const { Vue, Vuex } = globalThis;
const { mapState, mapActions } = Vuex;

export const SettingsModal = Vue.component("settings-modal", {
    template: `
        <b-modal
            id="settingsModal"
            class="settingsModal"
            size="lg"
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
                label="Custom Types"
                label-for="textarea-customTypes"
                class="w-100"
            >
                <b-form-textarea
                    id="textarea-customTypes"
                    v-model="customTypesLocal"
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
            "customTypes"
        ]),
    },
    data () {
        return {
            devFolderLocal: "",
            ignoreDirtyStateLocal: false,
            customTypesLocal: "",
        };
    },
    methods: {
        ...mapActions([
            "setDevFolder",
            "setIgnoreDirtyState",
            "setCustomTypes",
        ]),
        handleShow () {
            this.ignoreDirtyStateLocal = this.ignoreDirtyState;
            this.devFolderLocal = this.devFolder;
            this.customTypesLocal = JSON.stringify(this.customTypes, null, 2);
        },
        saveSettings (hide) {
            this.setDevFolder(this.devFolderLocal);
            this.setIgnoreDirtyState(this.ignoreDirtyStateLocal);
            try {
                this.customTypesLocal = this.customTypesLocal === "" ? "{}" : this.customTypesLocal;
                const customTypes = JSON.parse(this.customTypesLocal);
                this.setCustomTypes(customTypes);
            } catch (err) {
                console.error(err, "customTypes contained invalid JSON");
            }
            hide();
        }
    }
});

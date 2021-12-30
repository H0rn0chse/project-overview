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
                class="w-100"
            >
                <b-form-checkbox
                    id="checkbox-ignoreDirtyState"
                    v-model="ignoreDirtyStateLocal"
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
            "ignoreDirtyState"
        ]),
    },
    data () {
        return {
            devFolderLocal: "",
            ignoreDirtyStateLocal: false,
        };
    },
    methods: {
        ...mapActions([
            "setDevFolder",
            "setIgnoreDirtyState",
        ]),
        handleShow () {
            this.ignoreDirtyStateLocal = this.ignoreDirtyState;
            this.devFolderLocal = this.devFolder;
        },
        saveSettings (hide) {
            this.setDevFolder(this.devFolderLocal);
            this.setIgnoreDirtyState(this.ignoreDirtyStateLocal);
            hide();
        }
    }
});

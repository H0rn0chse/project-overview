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
            "devFolder"
        ]),
    },
    data () {
        return {
            devFolderLocal: ""
        };
    },
    methods: {
        ...mapActions([
            "setDevFolder"
        ]),
        handleShow () {
            this.devFolderLocal = this.devFolder;
        },
        saveSettings (hide) {
            this.setDevFolder(this.devFolderLocal);
            hide();
        }
    }
});

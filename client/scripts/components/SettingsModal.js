import { deepClone } from "../utils.js";

const { Vue, Vuex } = globalThis;
const { mapState, mapActions } = Vuex;

export const SettingsModal = Vue.component("settings-modal", {
    template: `
        <b-modal
            id="settingsModal"
            ref="modal"
            class="settingsModal"
            size="lg"
            @show="handleShow"
            @hide="handleHide"
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
                <json-editor
                    id="textarea-customTypes"
                    ref="customTypes"
                    :data="customTypesLocal"
                    @update="onTypesUpdate"
                />
            </b-form-group>
            <b-form-group
                id="fieldset-horizontal"
                label-cols="auto"
                label="Custom Types"
                label-for="btn-autoFormat"
                class="w-100 invisbibleLabel"
            >
                <div
                    id="btn-autoFormat"
                >
                    <b-button
                        @click="reset"
                    >
                        Reset
                    </b-button>
                    <b-button
                        @click="autoFormat"
                        :disabled="!enableSave"
                    >
                        AutoFormat
                    </b-button>
                </div>
            </b-form-group>
            <template #modal-footer="{ hide, cancel }">
                <b-button
                    @click="saveSettings(hide)"
                    variant="success"
                    :disabled="!enableSave"
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
        dirtyState: {
            get () {
                return this.devFolder !== this.devFolderLocal
                || this.ignoreDirtyState !== this.ignoreDirtyStateLocal
                || JSON.stringify(this.customTypes) !== this.$refs.customTypes.getJSON();
            }
        },
    },
    data () {
        return {
            enableSave: true,
            devFolderLocal: "",
            ignoreDirtyStateLocal: false,
            customTypesLocal: "",
            editorOptions: {
                showBtns: false,
                mode: "code",
                modes: ["code"]
            }
        };
    },
    methods: {
        ...mapActions([
            "setDevFolder",
            "setIgnoreDirtyState",
            "setCustomTypes",
        ]),
        onTypesUpdate (evt) {
            this.enableSave = !evt.error;
        },
        updateLocalCustomTypes () {
            this.customTypesLocal = deepClone(this.customTypes);
            this.$refs?.customTypes?.reset();
        },
        handleShow () {
            this.ignoreDirtyStateLocal = this.ignoreDirtyState;
            this.devFolderLocal = this.devFolder;
            this.updateLocalCustomTypes();
        },
        autoFormat () {
            this.$refs.customTypes.autoFormat();
        },
        reset () {
            this.$refs?.customTypes?.reset();
        },
        saveSettings (hide) {
            this.setDevFolder(this.devFolderLocal);
            this.setIgnoreDirtyState(this.ignoreDirtyStateLocal);

            const customTypes = this.$refs.customTypes.getObject();
            this.setCustomTypes(customTypes);
            this.updateLocalCustomTypes();
            hide();
        },
        handleHide (evt) {
            if (this.dirtyState) {
                evt.preventDefault();
                this.$bvModal.msgBoxConfirm("You have unsaved changes.\nContinue?")
                    .then((value) => {
                        if (value) {
                            this.handleShow();
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

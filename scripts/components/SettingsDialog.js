const { Vue, Vuex } = globalThis;
const { mapState, mapActions } = Vuex;

export const SettingsDialog = Vue.component("settings-dialog", {
    template: `
        <b-modal
            :id="'settingsDialog'"
            class="settingsDialog"
        >
            <template #modal-title>
                Settings
            </template>
            <div class="d-block text-center">
                Settings Stuff
            </div>
        </b-modal>
    `,
    props: [],
    computed: {
        ...mapState([]),
    },
    data () {
        return {};
    },
    methods: {
        ...mapActions([]),
    }
});

const { Vue, Vuex } = globalThis;
const { mapState, mapActions } = Vuex;

export const EditItemGroup = Vue.component("edit-item-group", {
    template: `
    <div
        class="editItemGroup d-flex flex-column justify-content-center align-items-center"
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
    `,
    props: [],
    computed: {
        ...mapState({
            data: "itemCopy"
        }),
    },
    data () {
        return {
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
        ]),
    }
});

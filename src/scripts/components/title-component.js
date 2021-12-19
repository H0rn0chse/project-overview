const { mapState } = globalThis.Vuex;

export const titleComponent = {
    data() {
        return {};
    },
    computed: {
        ...mapState([
            "title"
        ])
    },
    template: `
        <h1>{{ title }}</h1>
    `
};

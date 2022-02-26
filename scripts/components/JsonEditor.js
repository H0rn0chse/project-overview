import { deepClone, typeInTextarea } from "../utils.js";

const { Vue } = globalThis;

export const JsonEditor = Vue.component("json-editor", {
    template: `
        <div
            class="jsonEditor "
        >
            <div
                class="textareaContainer"
            >
                <div
                    class="scrollContainer"
                    ref="scrollContainer"
                >
                    <div
                        class="highlights"
                        ref="highlights"
                    />
                </div>
                <textarea
                    spellcheck="false"
                    ref="editor"
                    @input="onLiveChange"
                    @scroll="handleScroll"
                    @keydown="handleKeyDown"
                    @keyup="handleKeyUp"
                />
            </div>
        </div>
    `,
    props: [
        "data"
    ],
    computed: {},
    data () {
        return {
            localData: {},
            errorPos: null
        };
    },
    mounted () {
        this.localData = deepClone(this.data);
        this.autoFormat();
    },
    methods: {
        validate () {
            const json = this.$refs.editor.value;
            try {
                const obj = JSON.parse(json);
                this.errorPos = null;
                this.localData = obj;
                return true;
            } catch (err) {
                const position = parseInt(err.message.split("at position ")[1], 10);
                this.errorPos = position;
                return false;
            }
        },
        handleKeyDown (evt) {
            if (evt.code === "Tab") {
                evt.preventDefault();
                typeInTextarea("  ");
                this.onLiveChange();
            }
        },
        handleKeyUp (evt) {
            if (evt.code === "Tab") {
                evt.preventDefault();

            }
        },
        onLiveChange (evt = {}) {
            const valid = this.validate();
            this.applyHighlights();

            this.$emit("update", { error: !valid });
        },
        applyHighlights () {
            const pos = this.errorPos;
            let text = this.$refs.editor.value;

            if (pos !== null) {
                text = `${text.substring(0, pos)}<mark>${text[pos]}</mark>${text.substring(pos + 1)}`;
            }

            this.$refs.highlights.innerHTML = text;
        },
        handleScroll() {
            var scrollTop = this.$refs.editor.scrollTop;
            this.$refs.scrollContainer.scrollTop = scrollTop;

            var scrollLeft = this.$refs.editor.scrollLeft;
            this.$refs.scrollContainer.scrollLeft = scrollLeft;
        },
        autoFormat () {
            if (this.errorPos !== null) {
                return;
            }

            const json = JSON.stringify(this.localData, null, 2);
            this.$refs.editor.value = json;
            this.onLiveChange();
        },
        getObject () {
            return deepClone(this.localData);
        },
        getJSON () {
            return JSON.stringify(this.localData);
        },
        reset () {
            this.localData = deepClone(this.data);
            this.autoFormat();
        },
    }
});

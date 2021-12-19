import { appState } from "./AppState.js";
import { titleComponent } from "./components/title-component.js"

const { createApp } = globalThis.Vue;

export const app = createApp({})
    .use(appState)
    .component("title-component", titleComponent)
    .mount("#app");

import { startServer } from "@h0rn0chse/socket-server";

startServer({
    publicPaths: [[
        "/client", "/"
    ], [
        "/node_modules/bootstrap/dist", "/libs/bootstrap"
    ], [
        "/node_modules/bootstrap-vue/dist", "/libs/bootstrap-vue"
    ], [
        "/node_modules/vue-custom-scrollbar/dist", "/libs/vue-custom-scrollbar"
    ], [
        "/node_modules/vue/dist", "/libs/vue"
    ], [
        "/node_modules/vuex/dist", "/libs/vuex"
    ], [
        "/node_modules/feather-icons/dist", "/libs/feather-icons"
    ], [
        "/node_modules/vue-markdown/dist", "/libs/vue-markdown"
    ], [
        "/node_modules/simple-icons", "/libs/simple-icons"
    ], [
        "/node_modules/wc-github-corners/dist", "/libs/wc-github-corners"
    ]]
});

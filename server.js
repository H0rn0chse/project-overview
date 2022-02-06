import { startServer } from "@h0rn0chse/socket-server";

startServer({
    publicPaths: [[
        "/client", "/"
    ], [
        "/node_modules/bootstrap/dist", "/bootstrap"
    ], [
        "/node_modules/bootstrap-vue/dist", "/bootstrap-vue"
    ], [
        "/node_modules/vue-custom-scrollbar/dist", "/vue-custom-scrollbar"
    ], [
        "/node_modules/vue/dist", "/vue"
    ], [
        "/node_modules/vuex/dist", "/vuex"
    ], [
        "/node_modules/feather-icons/dist", "/feather-icons"
    ], [
        "/node_modules/vue-markdown/dist", "/vue-markdown"
    ]]
});

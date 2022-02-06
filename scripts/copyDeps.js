import fs from "fs";
import path from "path";

const dependencies = [[
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
]];

// copy dependencies to client
dependencies.forEach((dep) => {
    const pathFrom = dep[0];
    const pathTo = `client/${dep[1]}`;
    copyRecursiveSync(pathFrom, pathTo);
});

// remove everything except client
fs.readdirSync("/").forEach((childItemName) => {
    if (childItemName !== "client") {
        fs.rmdirSync(path.join("/", childItemName), { recursive: true, force: true });
    }
});

// https://stackoverflow.com/a/22185855/14887710
function copyRecursiveSync (src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        fs.mkdirSync(dest, );
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

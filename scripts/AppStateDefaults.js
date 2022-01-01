export const defaults = {
    devFolder: "C:\\User\\Dev\\",
    customTypes: {
        repoTypes: [],
        packageTypes: [],
        boardTypes: [],
    },
    repoTypes: [{
        id: "",
        text: "None",
    }, {
        id: "github",
        text: "GitHub",
        icon: {
            src: "SimpleIcons",
            key: "github",
        }
    }, {
        id: "gitlab",
        text: "GitLab",
        icon: {
            src: "SimpleIcons",
            key: "gitlab",
        }
    }, {
        id: "bitbucket",
        text: "Bitbucket",
        icon: {
            src: "SimpleIcons",
            key: "bitbucket",
        }
    }, {
        id: "git",
        text: "git",
        icon: {
            src: "SimpleIcons",
            key: "git",
        }
    }],
    packageTypes: [{
        id: "",
        text: "None",
    }, {
        id: "npm",
        text: "npm",
        icon: {
            src: "SimpleIcons",
            key: "npm",
        }
    }, {
        id: "godotassetlibary",
        text: "Godot AL",
        icon: {
            src: "SimpleIcons",
            key: "godotengine",
        }
    }, {
        id: "nuget",
        text: "NuGet",
        icon: {
            src: "SimpleIcons",
            key: "nuget",
        }
    }],
    boardTypes: [{
        id: "",
        text: "None",
    }, {
        id: "trello",
        text: "Trello",
        icon: {
            src: "SimpleIcons",
            key: "trello",
        }
    }, {
        id: "jira",
        text: "Jira",
        icon: {
            src: "SimpleIcons",
            key: "jira",
        }
    }]
};

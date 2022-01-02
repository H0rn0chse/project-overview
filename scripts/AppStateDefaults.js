export const defaults = {
    devFolder: "C:\\User\\Dev\\",
    customTypes: {
        protocols: [],
        repoTypes: [],
        packageTypes: [],
        boardTypes: [],
    },
    protocols: [{
        id: "vscode",
        text: "VSCode",
        schema: "vscode://file/{{PATH}}",
        icon: {
            src: "SimpleIcons",
            key: "visualstudiocode",
        }
    }],
    repoTypes: [{
        id: "",
        text: "None",
    }, {
        id: "generic",
        text: "Generic",
        icon: {
            src: "SimpleIcons",
            key: "git",
        }
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
    }],
    packageTypes: [{
        id: "",
        text: "None",
    }, {
        id: "generic",
        text: "Generic",
        icon: {
            src: "Feather",
            key: "package",
        }
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
        id: "generic",
        text: "Generic",
        icon: {
            src: "Feather",
            key: "columns",
        }
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

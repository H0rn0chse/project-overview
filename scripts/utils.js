import * as simpleIcons from "../libs/simple-icons/icons.mjs";

const { feather } = globalThis;

const dummy = document.createElement("div");
export function replaceSvgWithFeather (domRef, name, options = {}) {
    if (!domRef) {
        console.error("domRef was undefined!");
        return;
    }
    const svgContent = feather.icons[name].toSvg(options);
    dummy.innerHTML = svgContent;
    const svgNode = dummy.childNodes[0];
    dummy.innerHTML = "";
    domRef.replaceWith(svgNode);
    return svgNode;
}

export function getColor (sKey) {
    return window.getComputedStyle(document.documentElement).getPropertyValue(sKey);
}

export function replaceSvgWithSimpleIcons (domRef, name, options = {}) {
    if (!domRef) {
        console.error("domRef was undefined!");
        return;
    }
    const key = `si${name[0].toUpperCase()}${name.substring(1)}`;
    const icon = simpleIcons[key];
    const defaultColor = `#${icon.hex}`;
    const svgContent = icon.svg;
    dummy.innerHTML = svgContent;
    const svgNode = dummy.childNodes[0];
    dummy.innerHTML = "";
    svgNode.style.fill = defaultColor;

    if (options.width) {
        svgNode.style.width = options.width;
    }
    if (options.height) {
        svgNode.style.height = options.height;
    }
    if (options.color) {
        svgNode.style.fill = options.color;
    }

    domRef.replaceWith(svgNode);
    return svgNode;
}

export function deepClone (value) {
    return JSON.parse(JSON.stringify(value));
}

export function typeInTextarea(newText, elem = document.activeElement) {
    const [start, end] = [elem.selectionStart, elem.selectionEnd];
    elem.setRangeText(newText, start, end, "end");
}

export function extendObjectList (standardList = [], customList = []) {
    const list = deepClone(standardList);
    customList.forEach((item) => {
        const itemIndex = list.findIndex((listItem) => {
            return listItem.id === item.id;
        });

        if (itemIndex < 0) {
            list.push(deepClone(item));
        } else {
            list[itemIndex] = deepClone(item);
        }
    });

    return list;
}

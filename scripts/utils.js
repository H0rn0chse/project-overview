const { feather } = globalThis;

const dummy = document.createElement("div");
export function replaceSvg (domRef, name, options = {}) {
    const svgContent = feather.icons[name].toSvg(options);
    dummy.innerHTML = svgContent;
    const svgNode = dummy.childNodes[0];
    dummy.innerHTML = "";
    domRef.replaceWith(svgNode);
}
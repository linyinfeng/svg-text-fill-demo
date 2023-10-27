function bind(input, size, preview) {
    update(size, preview, input.value)
    input.addEventListener('input', (event) => update(size, preview, event.target.value));
}

const numDisplayDigit = 2;
function update(size, preview, text) {
    preview.textContent = text;
    bBox = preview.getBBox();
    w = bBox.width.toFixed(numDisplayDigit);
    h = bBox.height.toFixed(numDisplayDigit);
    ctl = preview.getComputedTextLength().toFixed(numDisplayDigit);
    size.textContent = `w: ${w}; h: ${h}; ctl: ${ctl}`;
}

function downloadURI(uri, name) {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

let input1 = document.getElementById("input-1");
let input2 = document.getElementById("input-2");
let input3 = document.getElementById("input-3");
let size1 = document.getElementById("size-1");
let size2 = document.getElementById("size-2");
let size3 = document.getElementById("size-3");

let previewObj = document.getElementById("preview");
let saveButton = document.getElementById("save-button");
previewObj.addEventListener('load', (_event) => {
    let svgDocument = previewObj.contentDocument;
    let preview1 = svgDocument.getElementById("tspan389");
    let preview2 = svgDocument.getElementById("tspan223");
    let preview3 = svgDocument.getElementById("tspan223-6");
    bind(input1, size1, preview1);
    bind(input2, size2, preview2);
    bind(input3, size3, preview3);

    saveButton.addEventListener("click", (_event) => {
        let serializer = new XMLSerializer();
        let svgData = serializer.serializeToString(svgDocument);
        let uri = 'data:image/svg+xml;charset=utf8,' + encodeURIComponent(svgData);
        downloadURI(uri, "demo.svg");
    })
})

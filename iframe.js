"use strict";
// iframe.ts
// this file is used to send and receive messages between the iframe and the parent window
window.iframePort = null;
// initialize iframe port shake
window.addEventListener("message", (event) => {
    if (event.data === "init" && event.ports.length > 0) {
        window.iframePort = event.ports[0];
        // Now the iframe can use iframePort to send and receive messages
        window.iframePort.onmessage = onMessage;
    }
});
window.addEventListener("load", () => {
    sendIframeHeight();
});
window.addEventListener("resize", () => {
    sendIframeHeight();
});
const sendIframeHeight = () => {
    if (!window.iframePort) {
        return;
    }
    const container = document.querySelector("[data-height]") || null;
    window.iframePort.postMessage({
        type: "setIframeHeight",
        data: {
            height: container && Number(container.offsetHeight),
        },
    });
};
const sendRoutePathname = (pathname) => {
    if (!window.iframePort) {
        return;
    }
    window.iframePort.postMessage({
        type: "route",
        data: { pathname },
    });
};
const sendReplacePathname = (pathname) => {
    if (!window.iframePort) {
        return;
    }
    window.iframePort.postMessage({
        type: "replace",
        data: { pathname },
    });
};
// Handle messages received on port2
function onMessage(event) {
    console.log("Message from parent:", event.data);
    const messageEventData = event.data;
    if (!window.iframePort) {
        return;
    }
    switch (messageEventData.type) {
        case "getIframeHeight":
            sendIframeHeight();
            break;
        default:
            console.log("default");
            break;
    }
}
//# sourceMappingURL=iframe.js.map
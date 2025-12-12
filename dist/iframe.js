"use strict";
// iframe.ts
// this file is used to send and receive messages between the iframe and the parent window
window.iframePort = null;
// initialize iframe port shake
window.addEventListener("message", (event) => {
    if (event.data === ACTION_TYPES.HANDSHAKE && event.ports.length > 0) {
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
    const setIframeHeight = Math.max(Number(container.dataset.height ?? 0), Number(container.offsetHeight));
    window.iframePort.postMessage({
        type: ACTION_TYPES.SET_IFRAME_HEIGHT,
        data: {
            height: setIframeHeight,
        },
    });
};
const sendRoutePathname = (pathname) => {
    if (!window.iframePort) {
        return;
    }
    window.iframePort.postMessage({
        type: ACTION_TYPES.ROUTE,
        data: { pathname },
    });
};
const sendReplacePathname = (pathname) => {
    if (!window.iframePort) {
        return;
    }
    window.iframePort.postMessage({
        type: ACTION_TYPES.REPLACE,
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
        case ACTION_TYPES.GET_IFRAME_HEIGHT:
            sendIframeHeight();
            break;
        default:
            console.log("default");
            break;
    }
}
const ACTION_TYPES = {
    HANDSHAKE: "init",
    GET_IFRAME_HEIGHT: "getIframeHeight",
    SET_IFRAME_HEIGHT: "setIframeHeight",
    ROUTE: "route",
    REPLACE: "replace",
};
//# sourceMappingURL=iframe.js.map
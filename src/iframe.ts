// iframe.ts
// this file is used to send and receive messages between the iframe and the parent window

window.iframePort = null;

document.addEventListener("load", () => {
  sendIframeHeight();
});

document.addEventListener("resize", () => {
  sendIframeHeight();
});

// initialize iframe port shake
window.addEventListener("message", (event: MessageEvent) => {
  if (event.data === "init" && event.ports.length > 0) {
    window.iframePort = event.ports[0];
    // Now the iframe can use iframePort to send and receive messages
    window.iframePort.onmessage = onMessage;
  }
});

const sendIframeHeight = () => {
  if (!window.iframePort) {
    return;
  }

  const container = document.querySelector("[data-height]") || null;
  window.iframePort.postMessage({
    type: "setIframeHeight",
    data: {
      height: container && Number((container as HTMLElement).dataset.height),
    },
  } as Partial<PostMessageEventData>);
};

const sendRoutePathname = (pathname: string) => {
  if (!window.iframePort) {
    return;
  }

  window.iframePort.postMessage({
    type: "route",
    data: { pathname },
  } as Partial<PostMessageEventData>);
};

const sendReplacePathname = (pathname: string) => {
  if (!window.iframePort) {
    return;
  }
  window.iframePort.postMessage({
    type: "replace",
    data: { pathname },
  } as Partial<PostMessageEventData>);
};

// Handle messages received on port2
function onMessage(event: MessageEvent) {
  console.log("Message from parent:", event.data);
  const messageEventData = event.data as ReceiveMessageEventData;

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

type ReceiveMessageEventData = {
  type: keyof ReceiveMessageEventDataTypes;
  data: ReceiveMessageEventDataTypes[keyof ReceiveMessageEventDataTypes]["data"];
};

type PostMessageEventData = {
  type: keyof PostMessageEventDataType;
  data: PostMessageEventDataType[keyof PostMessageEventDataType]["data"];
};

type ReceiveMessageEventDataTypes = {
  getIframeHeight: {
    data: {
      height: number;
    };
  };
};

type PostMessageEventDataType = {
  setIframeHeight: {
    data: {
      height: number;
    };
  };
  route: {
    data: {
      pathname: string;
    };
  };
  replace: {
    data: {
      pathname: string;
    };
  };
};

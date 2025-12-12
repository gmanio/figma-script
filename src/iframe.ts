export const ACTION_TYPES = {
  HANDSHAKE: "init",
  GET_IFRAME_HEIGHT: "getIframeHeight",
  SET_IFRAME_HEIGHT: "setIframeHeight",
  ROUTE: "route",
  REPLACE: "replace",
} as const;

export const WINDOW_EVENTS = {
  LOAD: "load",
  RESIZE: "resize",
  MESSAGE: "message",
} as const;

// iframe.ts
// this file is used to send and receive messages between the iframe and the parent window

window.iframePort = null;

// initialize iframe port shake
window.addEventListener(WINDOW_EVENTS.MESSAGE, (event: MessageEvent) => {
  if (event.data === ACTION_TYPES.HANDSHAKE && event.ports.length > 0) {
    window.iframePort = event.ports[0];
    // Now the iframe can use iframePort to send and receive messages
    window.iframePort.onmessage = onMessage;
  }
});

window.addEventListener(WINDOW_EVENTS.LOAD, () => {
  sendIframeHeight();
});

window.addEventListener(WINDOW_EVENTS.RESIZE, () => {
  sendIframeHeight();
});

const sendIframeHeight = () => {
  if (!window.iframePort) {
    return;
  }

  const container = document.querySelector("[data-height]") || null;
  const setIframeHeight = Math.max(
    Number((container as HTMLElement).dataset.height ?? 0),
    Number((container as HTMLElement).offsetHeight)
  );

  window.iframePort.postMessage({
    type: ACTION_TYPES.SET_IFRAME_HEIGHT,
    data: {
      height: setIframeHeight,
    },
  } as Partial<PostMessageEventData>);
};

const sendRoutePathname = (pathname: string) => {
  if (!window.iframePort) {
    return;
  }

  window.iframePort.postMessage({
    type: ACTION_TYPES.ROUTE,
    data: { pathname },
  } as Partial<PostMessageEventData>);
};

const sendReplacePathname = (pathname: string) => {
  if (!window.iframePort) {
    return;
  }
  window.iframePort.postMessage({
    type: ACTION_TYPES.REPLACE,
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
    case ACTION_TYPES.GET_IFRAME_HEIGHT:
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
  [ACTION_TYPES.GET_IFRAME_HEIGHT]: {
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

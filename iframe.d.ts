declare const sendIframeHeight: () => void;
declare const sendRoutePathname: (pathname: string) => void;
declare const sendReplacePathname: (pathname: string) => void;
declare function onMessage(event: MessageEvent): void;
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
//# sourceMappingURL=iframe.d.ts.map
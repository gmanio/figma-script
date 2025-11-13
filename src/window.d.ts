declare global {
  interface Window {
    iframePort: MessagePort | null;
  }
}

export {};

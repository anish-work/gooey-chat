const MAX_INDEX = "9999";
const IFRAME_URL = "http://localhost:5173";
const IFRAME_ID = "gooey-chat-iframe";

class GooeyChat {
  init() {
    this.initFrame();
    this.mountUpIframe();
  }

  initFrame(client_id) {
    if (!document.getElementById(IFRAME_ID)) {
      const iframe = document.createElement("iframe");
      iframe.onload = () => {
        console.log("Widget loaded successfully");
      };
      iframe.src = IFRAME_URL;
      iframe.id = IFRAME_ID;
      iframe.setAttribute(
        "style",
        "background:transparent; position: absolute; bottom: 0; right: 0; z-index:10000; border: none;width: 100%; height: 100%;"
      );
      this.iframe = iframe;
    }
  }
  receiveMessage = (event) => {
    if (!!event && !!event.data && !!event.data.type) {
      switch (event.data.type) {
        case EventTypes.SET_COOKIE:
          document.cookie = event.data.value;
          break;
        case EventTypes.CANCEL_FLOW:
          this.onCancelFlow();
          break;
        case EventTypes.FINISH_FLOW:
          this.onFlowFinish();
          break;
        case EventTypes.CHANGE_CONTAINER_CLASS:
          this.onChangeContainerClass(event.data.value);
          break;
        case EventTypes.FETCH_CURRENT_USER_FAILED:
          const err =
            typeof event.data.value === "string"
              ? new ResponseError("Internal error")
              : new ResponseError(
                  event.data.value.error_message,
                  event.data.value
                );
          this.onFailedCurrentUserFetch && this.onFailedCurrentUserFetch(err);
        case EventTypes.FETCH_CURRENT_USER_SUCCESS:
          this.onSuccessfulCurrentUserFetch &&
            this.onSuccessfulCurrentUserFetch(event.data.value);
          if (this.onSuccessfulFlow) this.onSuccessfulFlow(event.data.value);
          break;
        case EventTypes.VERIFY_EMAIL_TOKEN_SUCCESS:
          this.onMagiclinkSuccessFunc.call(window.weasl, window.weasl);
          break;
        case EventTypes.DOMAIN_NOT_ALLOWED:
          this.handleDomainNotAllowed();
          break;
        case EventTypes.BOOTSTRAP_DONE:
          this.handleBootstrapDone();
          break;
      }
    }
  };

  mountUpIframe() {
    this.initFrame();
    if (!document.getElementById(IFRAME_ID)) {
      window.addEventListener("message", this.receiveMessage, false);
      const wrapper = document.createElement("div");
      wrapper.setAttribute(
        "style",
        `
      display: initial !important;
      position: fixed !important;
      z-index: ${MAX_INDEX} !important;
      min-height: 96px !important;
      min-width: 100px !important;
      width: 100px !important;
      right: 0 !important;
      bottom: 0 !important;
      background: none transparent !important;
      `
      );
      wrapper.appendChild(this.iframe);
      document.body.appendChild(wrapper);
    }
  }
}

function main(window) {
  const gooeyChat = window.gooeyChat;
  const stubSdk = window.gooeyChat;
  const shim = new GooeyChat();
  const initCall = gooeyChat._c.filter((call) => call[0] === "init");
  stubSdk.init = shim.init;
  initCall && shim.init(initCall[1]);
}

main(window);

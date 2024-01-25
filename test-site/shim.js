const MAX_INDEX = "9999";
// const IFRAME_URL = "http://192.168.1.75:5173/";
// const IFRAME_URL = "http://192.168.1.9:5173/";
const IFRAME_URL = "https://gooeychat-beta.netlify.app";
const IFRAME_ID = "gooey-chat-iframe";
const WRAPPER_ID = "gooey-chat-wrapper";

const WRAPPER_BASE_STYLES = `
  display: initial !important;
  position: fixed !important;
  z-index: ${MAX_INDEX} !important;
  min-height: 96px !important;
  min-width: 100px !important;
  border-radius: 16px;
`;

const WRAPPER_STYLES_MOBILE =
  WRAPPER_BASE_STYLES + " height:100%; width:100%; top:0; left:0";
const WRAPPER_STYLES_DESKTOP =
  WRAPPER_BASE_STYLES +
  "width: 100px !important; right: 0 !important; bottom: 0 !important; background: none transparent !important;";

const checkWrapper = (wrp) => {
  if (wrp) return undefined;
  throw new Error("Gooey Chat - Wrapper element not found");
};

const markEventDone = (eventType) => eventType + "_DONE";

const DomEventTypes = {
  DOM_MAXIMIZE_WIDGET: function (isMobile) {
    if (!document) throw new Error("DOM not found");
    const wrapper = document.getElementById(WRAPPER_ID);
    checkWrapper(wrapper);
    if (isMobile) return wrapper.setAttribute("style", WRAPPER_STYLES_MOBILE);
    // Set desktop expanded dims
    wrapper.style.height = "min(704px, 100% - 114px)";
    wrapper.style.width = "460px";
  },
  DOM_MINIMIZE_WIDGET: function () {
    if (!document) throw new Error("DOM not found");
    const wrapper = document.getElementById(WRAPPER_ID);
    wrapper.setAttribute("style", WRAPPER_STYLES_DESKTOP);
  },
};

const StoreEventTypes = {
  STORE_SAVE: function (payload) {
    if (!document) throw new Error("DOM not found");
    window.localStorage.setItem(payload.key, payload.value);
  },
};

function switchView(toMobile = false, wrapper) {
  checkWrapper(wrapper);
  if (!this.isExpanded) return; // change only when expanded
  if (!toMobile) {
    this.wrapper.setAttribute("style", WRAPPER_STYLES_MOBILE);
    console.log("switched to mobile");
  }
}

var VIEW_PORTS = {
  xs: 0,
  sm: 640,
  md: 1100,
  lg: 1440,
};

class GooeyChat {
  init() {
    this.initFrame();
    this.initWrapper();
    this.checkClientWidth();
    this.mountUpIframe();
  }

  adaptViewport(mq) {
    if (mq.matches) {
      this.isMobile = false;
      // Desktop View - //  Do nothing as it loads for the desktop view initially
      if (!this.isInitialized) return;
      // Changed to Desktop View - do a switch if expanded
      switchView();
    } else {
      // Switch to mobile
      this.isMobile = true;
      switchView(true, this.wrapper);
    }
  }

  checkClientWidth() {
    const mq = window.matchMedia("(min-width: 640px)");
    if (!mq.matches) this.adaptViewport(mq);
    mq.addEventListener("change", this.adaptViewport);
  }

  initWrapper() {
    if (!document.getElementById(IFRAME_ID)) {
      window.addEventListener("message", this.receiveMessage, false);
      const wrapper = document.createElement("div");
      wrapper.setAttribute("style", WRAPPER_STYLES_DESKTOP);
      wrapper.id = WRAPPER_ID;
      this.wrapper = wrapper;
    }
  }

  mountUpIframe() {
    // Main Injection happens here...
    if (!document.getElementById(IFRAME_ID)) {
      window.addEventListener("message", this.receiveMessage, false);
      this.wrapper.appendChild(this.iframe);
      document.body.appendChild(this.wrapper);
      this.isInitialized = true;
    }
  }

  initFrame(client_id) {
    if (!document.getElementById(IFRAME_ID)) {
      const iframe = document.createElement("iframe");
      iframe.onload = () => {
        console.log("Widget loaded successfully");
      };
      iframe.src = IFRAME_URL;
      iframe.id = IFRAME_ID;
      iframe.allowFullscreen = true;
      iframe.role = "dialog";
      iframe.title = "Gooey Chat Widget";
      iframe.setAttribute("style", "width: 100%; height: 100%; border:none;");
      this.iframe = iframe;
    }
  }

  onDomManipulation = (eventType, payload) => {
    const fn = DomEventTypes[eventType];
    if (eventType === "DOM_MAXIMIZE_WIDGET") {
      this.isExpanded = true;
    }
    if (eventType === "DOM_MINIMIZE_WIDGET") {
      if (payload) window.localStorage.setItem("gooeyChatPlugin", payload); // Also save payload if there
      this.isExpanded = false;
    }
    fn && fn(this.isMobile);
    const store = window.localStorage.getItem("gooeyChatPlugin");
    this.iframe.contentWindow.postMessage(
      {
        type: markEventDone(eventType),
        payload: eventType === "DOM_MAXIMIZE_WIDGET" ? store : null,
      },
      "*"
    );
  };

  onStoreManipulation = (eventType, payload) => {
    const fn = StoreEventTypes[eventType];
    fn(payload);
    this.iframe.contentWindow.postMessage(
      {
        type: markEventDone(eventType),
      },
      "*"
    );
  };

  receiveMessage = (event) => {
    if (!!event && !!event.data && !!event.data.type) {
      const eventType = event.data.type || "";
      const payload = event.data.payload;
      // Manipulate DOM
      if (eventType && eventType.includes("DOM")) {
        this.onDomManipulation(eventType, payload);
      }

      if (eventType && eventType.includes("STORE")) {
        this.onStoreManipulation(eventType, payload);
      }
    }
  };
}

function main(window){
  const gooeyChat = window.gooeyChat;
  const stubSdk = window.gooeyChat;
  const shim = new GooeyChat();
  const initCall = gooeyChat._c.filter(call => call[0] === 'init');
  stubSdk.init = shim.init;
  initCall && shim.init(initCall[1]);
};


main(window)
import * as React from "react";

import { addProtocolToUrl, getWidgetFetchedConfig } from "./helpers";

import App from "./app/App";
import ReactDOM from "react-dom/client";
import { createTemplate } from "./template";
import { setupPosition } from "./setup";

const WC_TAG_NAME = "dent-in-widget";

export default async function createComponent(config: any) {

  const widgetConfig = await getWidgetFetchedConfig(
    config?.webTippsConfigurationId
  );
  // console.log(
  //   widgetConfig,
  //   "<<<<<<<<<<<<<<<",
  //   config?.stickedToElementId,
  //   "<<<"
  // );

// 






// 


  // const widgetConfig = {
  //   isActive: true,
  //   button: {
  //     isGlowing: false,
  //     borderRadius: "20px",
  //     backgroundColor: "#9b4fe9ff",
  //     text: "TIPP OSS",
  //     color: "#ffffff",
  //     redirectTo: "google.com",
  //     size: "sm",
  //   },
  //   additionalText: "Have some video?",
  //   widgetType: "LINK",
  //   position: "bottom-left",
  // };
  const template = createTemplate(widgetConfig);
  class DentInWidgetElement extends HTMLElement {
    constructor() {
      super();

// +++---
const targetElement = document.getElementById(config.stickedToElementId);

const observer = new MutationObserver((mutationsList) => {
  // console.log('observer started')
  for (const mutation of mutationsList) {
    // console.log(mutation,'mutation')
    if (mutation.type === 'childList') {
      // console.log(mutation.addedNodes,'mutation.addedNodes')

      if (Array.from(mutation.addedNodes).some(node => {
        console.log(node)
        // console.log(node,'node',targetElement,'targetElement')
       return  node === targetElement})) {
          // call your function here
          createTemplate(widgetConfig);

        
      }
      if (Array.from(mutation.removedNodes).some(node => node === targetElement)) {
          // call your function here
          // createTemplate(widgetConfig);
          targetElement?.remove();
          console.log('removed')
        }
      
    }
  }
});
console.log(observer)

observer.observe(document.documentElement, { childList: true, subtree: true });


// +++---
      
      const shadowDOM = this.attachShadow({ mode: "open" });
      shadowDOM.appendChild(template.content.cloneNode(true));
      const widget = shadowDOM.querySelector(".dent-in-widget") as HTMLElement;

      const button = shadowDOM.querySelector(
        ".dent-in__button"
      ) as HTMLButtonElement;
      // set button onclick function
      button?.addEventListener("click", () => {
        if (widgetConfig?.widgetType === "LINK") {
          const editedLink = addProtocolToUrl(widgetConfig?.button?.redirectTo);
          if (editedLink) window.open(editedLink);
        }
      });
      // set button styles
      if (button) {
        // add glowing effect to button
        if (widgetConfig?.button?.isGlowing) {
          button.classList.add("glowing-effect");
          button.style.setProperty(
            "--glowingColor",
            widgetConfig?.button?.backgroundColor
          );
          const color = button.style.getPropertyValue("--glowingColor");
          button.style.setProperty(
            "--glowingColor-fused",
            `${color.substr(0, 7)}${Math.floor(
              parseInt(color.substr(7), 16) * 0.8
            ).toString(16)}`
          );
        }
        // add class to button based on size value
        if (widgetConfig.button?.size) {
          button.classList.add(`button-${widgetConfig?.button?.size}`);
        }
      }
      if (config?.stickedToElementId) {
        const stickedElement = document.getElementById(
          config?.stickedToElementId
        );
        console.log(stickedElement);
        if (stickedElement && widget) {
          stickedElement.insertAdjacentElement("afterend", this);
          this.style.display = "inline-flex";
          widget.style.position = "initial";
        }
      }
      setupPosition(widgetConfig, this);
    }
  }

  const componentInstance = document.createElement(WC_TAG_NAME, {
    is: WC_TAG_NAME,
  });

  if (!customElements.get(WC_TAG_NAME)) {
    customElements.define(WC_TAG_NAME, DentInWidgetElement);
  }

  const container = document.body;
  if (widgetConfig?.isActive) container.appendChild(componentInstance);

  const linkNode = document.createElement("link");
  linkNode.type = "text/css";
  linkNode.rel = "stylesheet";
  linkNode.href =
    "//fonts.googleapis.com/css2?family=MuseoModerno:wght@400;600&family=Open+Sans:wght@400;600&display=swap";
  document.head.appendChild(linkNode);

  return componentInstance;
}

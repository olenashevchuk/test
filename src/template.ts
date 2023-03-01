import styles from './styles/index.css';

// export function createTemplate() {
//   const template = document.createElement('template');

//   template.innerHTML = `
//     <style>${styles.toString()}</style>
//     <div class="dent-in-widget">
//       <button class="dent-in__button">Online booking</button>
//     </div>
//   `;

//   return template;
// }


export function createTemplate(config:any) {
  const template = document.createElement('template');
  const buttonLabel = config?.button?.text || '+';
  const additionalText= config?.additionalText || '';
  // const buttonImage = config?.['button-image'];

  template.innerHTML = `
    <style>${styles.toString()}</style>
    <style>
    .dent-in__button {
      background-color: ${config?.button?.backgroundColor || "#9b4fe9ff"};
      border-radius: ${config?.button?.borderRadius || "20px"};
      color: ${config?.button?.color || "#fff"};
    }
    </style>
    <div class="dent-in-widget">
      <button class="dent-in__button">
      <span className="widget-hide-button" onClick={this.collapseButton}>&#x25B6;</span>
      ${buttonLabel}</button>
      <span class='tipps__additionalText'>${additionalText}</span>
    </div>
  `;


  return template;
}